import React from 'react';
import { Search, ShoppingCart, User, ArrowRight, Star, Menu } from 'lucide-react';

const WolTopWebsite = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F3] font-sans text-[#3D2E1E]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#C4A882]/30 px-[5%] h-16 flex items-center justify-between">
        <div className="text-2xl font-serif font-bold tracking-tighter text-[#1A1410]">
          Wol<span className="text-[#8B4513]">Top</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-widest text-[#8A7A6A]">
          <a href="#" className="hover:text-[#8B4513] transition-colors">Collections</a>
          <a href="#" className="hover:text-[#8B4513] transition-colors">Custom Prints</a>
          <a href="#" className="hover:text-[#8B4513] transition-colors">Sustainability</a>
          <a href="#" className="hover:text-[#8B4513] transition-colors">Journal</a>
        </div>

        <div className="flex items-center gap-5">
          <Search size={18} className="text-[#8A7A6A] cursor-pointer" />
          <div className="relative cursor-pointer">
            <ShoppingCart size={18} className="text-[#8A7A6A]" />
            <span className="absolute -top-2 -right-2 bg-[#8B4513] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </div>
          <button className="hidden sm:block bg-[#8B4513] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity">
            Request Swatch
          </button>
          <Menu className="md:hidden text-[#1A1410]" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <div className="bg-[#1A1410] p-[8%] flex flex-col justify-center relative">
          <div className="flex items-center gap-3 text-[#C4A882] text-[10px] tracking-[4px] uppercase mb-6">
            <div className="w-8 h-[1px] bg-[#C4A882]"></div>
            New Collection 2024
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
            Refined <span className="italic text-[#C4A882]">Walls</span> for Modern Living
          </h1>
          <p className="text-[#9A8A78] text-sm md:text-base leading-relaxed max-w-md mb-10">
            Discover our curated collection of artisanal wallpapers, where heritage craftsmanship meets contemporary design.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#C4A882] text-[#1A1410] px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#D4B892] transition-colors">
              Explore Collections
            </button>
            <button className="text-[#C4A882] flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all">
              View Lookbook <ArrowRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-[2px] bg-white">
          <div className="bg-gradient-to-br from-[#8B6914] to-[#C4972A] hover:scale-[1.02] transition-transform duration-500"></div>
          <div className="bg-gradient-to-br from-[#5A3E28] to-[#8B6040] hover:scale-[1.02] transition-transform duration-500"></div>
          <div className="bg-gradient-to-br from-[#2E5030] to-[#4A8050] hover:scale-[1.02] transition-transform duration-500"></div>
          <div className="bg-gradient-to-br from-[#8B3A3A] to-[#C45050] hover:scale-[1.02] transition-transform duration-500"></div>
        </div>
      </section>

      {/* Stats/Features Banner */}
      <div className="bg-[#8B4513] py-8 px-[5%] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          { num: "500+", label: "Original Designs" },
          { num: "24hr", label: "Swatch Shipping" },
          { num: "100%", label: "Eco-Friendly" },
          { num: "12yr", label: "Quality Warranty" }
        ].map((stat, i) => (
          <div key={i} className={`px-4 ${i !== 3 ? 'md:border-r border-white/20' : ''}`}>
            <div className="font-serif text-2xl md:text-3xl text-white font-bold">{stat.num}</div>
            <div className="text-[10px] text-white/70 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Product Categories */}
      <section className="py-20 px-[5%]">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-[#1A1410]">
            Browse by <span className="italic text-[#8B4513]">Style</span>
          </h2>
          <span className="text-[#8B4513] text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer">
            All Categories <ArrowRight size={14} />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px]">
          <CategoryCard 
            title="Botanical Series" 
            count="124 Designs" 
            span="md:col-span-2 md:row-span-2" 
            bg="bg-gradient-to-br from-[#6B8C5A] to-[#2A3D1A]"
          />
          <CategoryCard 
            title="Geometric" 
            count="86 Designs" 
            bg="bg-gradient-to-br from-[#C4A060] to-[#5A3E1A]"
          />
          <CategoryCard 
            title="Minimalist" 
            count="42 Designs" 
            bg="bg-gradient-to-br from-[#5080C4] to-[#1A305A]"
          />
          <CategoryCard 
            title="Textured" 
            count="95 Designs" 
            span="md:col-span-2"
            bg="bg-gradient-to-br from-[#8B3A3A] to-[#5A1A1A]"
          />
        </div>
      </section>
    </div>
  );
};

const CategoryCard = ({ title, count, span = "", bg }) => (
  <div className={`relative group overflow-hidden rounded-sm cursor-pointer ${span} ${bg}`}>
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
    <div className="absolute bottom-0 left-0 p-6 z-10">
      <h3 className="text-xl font-serif text-white font-bold mb-1">{title}</h3>
      <p className="text-white/70 text-[10px] uppercase tracking-[2px]">{count}</p>
    </div>
  </div>
);

export default WolTopWebsite;
