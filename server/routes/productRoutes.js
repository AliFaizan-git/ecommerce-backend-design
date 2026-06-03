import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaginatedProducts = async () => {
      setLoading(true);
      try {
        // 🚀 Fetch specific page ranges dynamically from your updated API
        const response = await fetch(`http://localhost:5000/api/products?page=${page}&limit=6`);
        const data = await response.json();
        
        // Handle both standard arrays and paginated object shapes safely
        if (data.products) {
          setProducts(data.products);
          setTotalPages(data.totalPages);
        } else {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaginatedProducts();
  }, [page]); // 💡 Re-run whenever page state shifts

  if (loading) return <div className="text-center my-12 font-bold text-blue-600 animate-pulse">Loading Catalog Grid...</div>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 my-6">
      {/* Product Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col justify-between">
            <img src={product.image} alt={product.name} className="w-full h-48 object-contain mb-4" />
            <div>
              <h3 className="text-gray-900 font-semibold mb-1 truncate">{product.name}</h3>
              <p className="text-blue-600 font-bold">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* 📊 PAGINATION CONTROLS BAR */}
      <div className="flex justify-center items-center gap-4 mt-10 border-t border-gray-200 pt-6">
        <button 
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>
        
        <span className="text-sm font-semibold text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button 
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList;