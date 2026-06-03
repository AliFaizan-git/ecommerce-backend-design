// client/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your architecture components directly from the components folder
import Header from "./components/Header";
import CategorySection from "./components/CategorySection";
import Hero from "./components/Hero";
import Deals from "./components/Deals";
import ProductListing from "./components/ProductListing";
import InquiryForm from "./components/InquiryForm";
import Services from "./components/Services";
import RegionSuppliers from "./components/RegionSuppliers";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import Auth from './components/Auth';
import AddProduct from './components/AddProduct';

const homeInteriors = [
  { name: "Soft chairs", price: "10", image: "🪑" },
  { name: "Sofa beds", price: "15", image: "🛋️" },
  { name: "Kitchen mixers", price: "100", image: "🥣" },
  { name: "Blenders", price: "39", image: "🥤" },
  { name: "Home plant pots", price: "12", image: "🪴" },
  { name: "Laundry baskets", price: "9", image: "🧺" },
  { name: "Smart thermostats", price: "89", image: "🌡️" },
  { name: "Table lamps", price: "22", image: "💡" },
];

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F7FAFC]">
        {/* Persistent B2B Top Navbar */}
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route
              path="/"
              element={
                <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-8">
                  {/* Category Layout Grid Block */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 grid md:grid-cols-4 gap-4 shadow-sm">
                    <div className="md:col-span-1 border-r border-gray-100 pr-2">
                      <CategorySection
                        title="Home interiors"
                        bannerBg="#FFE5B4" // Soft peach background accent
                        items={homeInteriors}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <Hero />
                    </div>
                  </div>

                  {/* Operational Feature Blocks */}
                  <Deals />
                  <ProductListing />
                  <InquiryForm />
                  <Services />
                  <RegionSuppliers />
                  <Newsletter />
                </div>
              }
            />

            {/* 📦 Isolated Dynamic Product Detail Route */}
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </main>

        {/* Corporate Legal & Links Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
