import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          // Store token and admin privileges locally
          localStorage.setItem('token', data.token);
          localStorage.setItem('isAdmin', data.user.isAdmin);
          navigate('/');
          window.location.reload(); // Refresh header states
        } else {
          setMessage('🎉 Account created! Please log in.');
          setIsLogin(true);
        }
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage('❌ Connection to auth server failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        {isLogin ? 'Sign In to Your Account' : 'Register New Account'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {message && <p className="text-sm text-center font-medium text-blue-600">{message}</p>}
        <button type="submit" className="w-full bg-[#0D6EFD] text-white py-2 rounded-md font-medium text-sm hover:bg-blue-700 transition-colors">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <p className="text-sm text-center text-gray-500 mt-4">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)} className="text-[#0D6EFD] font-semibold hover:underline">
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
}

export default Auth;