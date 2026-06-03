import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();
  
  // 🔐 Check authentication and restriction permissions immediately
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Form input state trackers
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // 🛑 Security Check: Restrict access if not an authorized admin
  if (!token || !isAdmin) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <h3 className="text-xl font-bold text-red-700 mb-2">🛑 Access Denied</h3>
        <p className="text-sm text-red-600 mb-4">You must be logged in with an administrative email containing 'admin' to add catalog inventory.</p>
        <button onClick={() => navigate('/login')} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          Go to Login Screen
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const productPayload = { name, price, category, image, description, stock };

   // client/src/components/AddProduct.jsx -> Line ~34 inside handleSubmit
try {
  const response = await fetch('http://localhost:5000/api/products', { // 🚀 Make sure it's /api/products
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(productPayload)
  });

  const data = await response.json();
  // ... rest of your code

      if (response.ok) {
        setMessage('🎉 Product successfully committed to MongoDB inventory!');
        // Reset input fields
        setName('');
        setPrice('');
        setCategory('');
        setImage('');
        setDescription('');
        setStock('');
      } else {
        setMessage(`❌ Error: ${data.message || 'Submission failed'}`);
      }
    } catch (error) {
      setMessage('❌ Failed to establish communication with the product engine database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-2xl font-black text-gray-900 mb-2">📦 Add New Catalog Item</h2>
      <p className="text-sm text-gray-500 mb-6">Input specifications to update your dynamic live inventory grid view.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Product Title *</label>
          <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Price (USD) *</label>
            <input type="number" min="0" step="0.01" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Initial Stock Units</label>
            <input type="number" min="0" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" value={stock} onChange={(e) => setStock(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category Classification *</label>
          <input type="text" placeholder="e.g. Gadgets, Clothes, Interiors" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Image Asset URL Link</label>
          <input type="url" placeholder="https://..." className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Detailed Description Summary</label>
          <textarea rows="3" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        {message && <p className="text-sm text-center font-bold text-blue-600 bg-blue-50 p-2.5 rounded border border-blue-100">{message}</p>}

        <button type="submit" disabled={loading} className="w-full bg-[#0D6EFD] hover:bg-blue-700 text-white py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm disabled:bg-blue-300 cursor-pointer">
          {loading ? 'Committing payload to cloud...' : 'Save Product Data'}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;