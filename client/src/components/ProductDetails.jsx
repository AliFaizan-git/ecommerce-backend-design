import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams(); // Automatically captures the MongoDB _id from the browser URL path
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // 🚀 Fetch specific item from your API using its MongoDB ID
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div className="max-w-[1200px] mx-auto px-4 py-20 text-center text-xl font-bold text-[#0D6EFD] animate-pulse">Loading Specifications...</div>;
  }

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
        <p className="text-xl font-bold text-gray-600">⚠️ Oops! Product details could not be found.</p>
        <Link to="/" className="text-[#0D6EFD] hover:underline mt-4 inline-block">Return to Home Catalog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      <Link to="/" className="text-sm font-medium text-[#0D6EFD] hover:underline flex items-center gap-1 mb-6">
        ← Back to recommended catalog
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-10 grid md:grid-cols-2 gap-10 shadow-sm">
        
        {/* Dynamic Live Icon/Image */}
        <div className="w-full h-80 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-8xl shadow-inner">
          {product.icon}
        </div>

        {/* Dynamic DB Attribute Content Fields */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#0D6EFD] tracking-wider uppercase bg-blue-50 px-2.5 py-1 rounded">
              Verified ID: #{product._id.slice(-6)}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-4 mb-2">
              {product.name}
            </h2>
            <div className="flex items-center gap-3 mb-6">
              <p className="text-2xl font-black text-gray-900">${product.price}</p>
              {product.discount !== '0%' && (
                <span className="bg-[#EB001B] text-white text-xs font-bold px-2 py-0.5 rounded">
                  {product.discount} OFF
                </span>
              )}
            </div>
            
            <div className="border-t border-gray-100 pt-4 space-y-3 text-sm text-gray-600">
              <p>• <span className="font-semibold text-gray-800">Category:</span> {product.category}</p>
              <p>• <span className="font-semibold text-gray-800">Protection:</span> Trade Assurance coverage security layer active.</p>
              <p>• <span className="font-semibold text-gray-800">Shipping:</span> Supports Express, Ocean Freight, and Air cargo pathways.</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-[#0D6EFD] hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors shadow-sm">
              Send Inquiry Quote
            </button>
            <button className="flex-1 bg-white hover:bg-gray-50 text-[#0D6EFD] font-medium py-3 rounded-md border border-gray-200 transition-colors">
              Add to Wishlist
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;