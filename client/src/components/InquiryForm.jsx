import React, { useState } from 'react';

function InquiryForm() {
  // 📦 State variables to track user input fields
  const [itemQuery, setItemQuery] = useState('');
  const [details, setDetails] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('pcs');
  
  // 🔔 User notification feedback states
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: '', text: '' });

    const inquiryData = { itemQuery, details, quantity: Number(quantity), unit };

    try {
      // 🚀 Send the RFQ payload directly to your running Express API Server
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage({ 
          type: 'success', 
          text: '🎉 Request submitted successfully! Suppliers will contact you shortly.' 
        });
        // Clear out the form fields after successful save
        setItemQuery('');
        setDetails('');
        setQuantity('');
        setUnit('pcs');
      } else {
        throw new Error(data.message || 'Failed to submit request.');
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatusMessage({ 
        type: 'error', 
        text: '❌ Could not connect to the server. Please check your backend.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 my-8">
      {/* Container Banner box with a deep blue professional style */}
      <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-[#2C7ABC] to-[#0D6EFD] p-6 md:p-10 flex flex-col lg:flex-row justify-between gap-8 shadow-md">
        
        {/* Left Side: Call to Action Text */}
        <div className="text-white max-w-md flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
            An easy way to send requests to all suppliers
          </h2>
          <p className="text-blue-100 text-sm md:text-base">
            Type out your wholesale needs once, and let verified global distribution factories calculate custom bulk shipping metrics directly for your team.
          </p>
        </div>

        {/* Right Side: Interactive RFQ Submission Form Card */}
        <div className="bg-white rounded-lg p-6 shadow-xl w-full lg:w-[500px]">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Send a quote request</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Field: What item do you need? */}
            <div>
              <input
                type="text"
                placeholder="What item do you need? (e.g. Smart Watches)"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#0D6EFD] transition-colors"
                value={itemQuery}
                onChange={(e) => setItemQuery(e.target.value)}
                required
              />
            </div>

            {/* Textarea Field: Detailed specs */}
            <div>
              <textarea
                placeholder="Type more details about specifications, materials, or custom packaging options..."
                rows="3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#0D6EFD] transition-colors resize-none"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>

            {/* Row Layout: Quantity and Measurement Units Selector */}
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Quantity"
                  min="1"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#0D6EFD] transition-colors"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="w-32">
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0D6EFD] transition-colors"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                >
                  <option value="pcs">Pcs</option>
                  <option value="lots">Lots</option>
                  <option value="tons">Tons</option>
                  <option value="liters">Liters</option>
                </select>
              </div>
            </div>

            {/* Dynamic Status Notification Alert Banner */}
            {statusMessage.text && (
              <div className={`p-3 rounded-md text-sm font-medium ${
                statusMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {statusMessage.text}
              </div>
            )}

            {/* Submit Button Action Trigger */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0D6EFD] hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-sm shadow-sm disabled:bg-blue-300 cursor-pointer"
            >
              {loading ? 'Processing RFQ...' : 'Send Inquiry Request'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default InquiryForm;