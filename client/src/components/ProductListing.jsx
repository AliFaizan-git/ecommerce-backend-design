import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../apiConfig';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🚀 Fetch data directly from your fresh Express Backend!
    const fetchProducts = async () => {
      try {
        // Example inside your client components
        const response = await fetch(`${API_BASE_URL}/api/products?page=${page}&limit=6`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-10 text-center text-lg font-bold text-[#0D6EFD] animate-pulse">
        Loading Live Inventory...
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recommended items</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <Link
            to={`/products/${product._id}`}
            key={product._id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#0D6EFD] transition-all duration-300 group shadow-sm hover:shadow-md block"
          >
            <div className="h-40 bg-gray-50 flex items-center justify-center text-5xl mb-3 rounded-md overflow-hidden transition-transform group-hover:scale-105">
              {product.icon}
            </div>

            <p className="text-lg font-bold text-gray-900">${product.price}</p>
            <p className="text-sm text-gray-500 mt-1 mb-2 line-clamp-2 group-hover:text-[#0D6EFD] transition-colors">
              {product.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductListing;
