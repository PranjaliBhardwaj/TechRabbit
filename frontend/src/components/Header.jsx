import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hoverClass = location.pathname === "/women-corner" ? "hover:text-pink-400" : "hover:text-blue-400";

  return (
    <header 
      className={`flex items-center justify-between px-10 py-3 transition-all duration-300 sticky top-0 z-50 ${
        isScrolled 
          ? 'bg-[#1a1a2e]/95 backdrop-blur-md border-b border-[#2b3240]/50 shadow-lg' 
          : 'bg-transparent border-b border-[#2b3240]'
      }`}
    >
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-white">
          <a href="/" className="group">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-32 h-8 cursor-pointer transition-transform duration-300 group-hover:scale-105" 
            />
          </a>
        </div>
        <nav className="flex items-center gap-9 text-sm font-medium text-white">
          <a href="/explore" className={`${hoverClass} transition-colors`}>Home</a>
          <a href="/women-corner" className={`${hoverClass} transition-colors`}>Women Corner</a>
          <a href="/courses-hub" className={`${hoverClass} transition-colors`}>Courses</a>
          <a href="/freelancing" className={`${hoverClass} transition-colors`}>Get Project</a>
          <a href="/showcase" className={`${hoverClass} transition-colors`}>Showcase</a>
          <a href="/admin/nested-cards" className={`${hoverClass} transition-colors`}>Admin</a>
          {[
            { href: "/explore", label: "Home" },
            { href: "/women-corner", label: "Women Corner" },
            { href: "/courses-hub", label: "Courses" },
            { href: "/freelancing", label: "Get Project" }
          ].map((item, index) => (
            <a 
              key={item.href}
              href={item.href} 
              className={`${hoverClass} transition-all duration-300 relative group py-2`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <label className="flex flex-col min-w-40 h-10 max-w-64 group">
          <div className="flex w-full h-full items-stretch rounded-xl transition-all duration-300 group-focus-within:ring-2 group-focus-within:ring-blue-400/50">
            <div className="text-[#9da8be] flex items-center justify-center pl-4 bg-[#2b3240] rounded-l-xl transition-colors duration-300 group-hover:bg-[#3a4250]">
              🔍
            </div>
            <input
              placeholder="Search"
              className="form-input flex w-full text-white bg-[#2b3240] h-full px-4 placeholder:text-[#9da8be] border-none rounded-xl rounded-l-none focus:outline-0 transition-colors duration-300 hover:bg-[#3a4250]"
            />
          </div>
        </label>
        <button className="flex items-center justify-center h-10 px-2.5 gap-2 text-sm font-bold text-white bg-[#2b3240] rounded-xl transition-all duration-300 hover:bg-[#3a4250] hover:scale-105 active:scale-95">
          <span className="animate-pulse">🔔</span>
        </button>
        <a 
          href="/profile" 
          className="rounded-full size-10 overflow-hidden border-2 border-[#c1b2e5] transition-all duration-300 hover:border-blue-400 hover:scale-110 hover:shadow-lg hover:shadow-blue-400/25 group"
        >
          <img
            src="/default_bunny.jpg"
            alt="Profile"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;