import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  // Use a pink hover color for Women's Corner, blue for others
  const hoverClass = location.pathname === "/women-corner" ? "hover:text-pink-400" : "hover:text-blue-400";

  return (
    <header className="flex items-center justify-between border-b border-[#2b3240] px-10 py-3">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-white">
          <a href="/">
            <img src="/logo.png" alt="Logo" className="w-32 h-8 cursor-pointer" />
          </a>
        </div>
        <nav className="flex items-center gap-9 text-sm font-medium text-white">
          <a href="/explore" className={`${hoverClass} transition-colors`}>Home</a>
          <a href="/women-corner" className={`${hoverClass} transition-colors`}>Women Corner</a>
          <a href="/courses-hub" className={`${hoverClass} transition-colors`}>Courses</a>
          <a href="/freelancing" className={`${hoverClass} transition-colors`}>Get Project</a>
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <label className="flex flex-col min-w-40 h-10 max-w-64">
          <div className="flex w-full h-full items-stretch rounded-xl">
            <div className="text-[#9da8be] flex items-center justify-center pl-4 bg-[#2b3240] rounded-l-xl">
              🔍
            </div>
            <input
              placeholder="Search"
              className="form-input flex w-full text-white bg-[#2b3240] h-full px-4 placeholder:text-[#9da8be] border-none rounded-xl rounded-l-none focus:outline-0"
            />
          </div>
        </label>
        <button className="flex items-center justify-center h-10 px-2.5 gap-2 text-sm font-bold text-white bg-[#2b3240] rounded-xl">
          🔔
        </button>
        <a href="/profile" className="rounded-full size-10 overflow-hidden border-2 border-[#c1b2e5] hover:border-blue-400 transition-colors">
          <img
            src="/default_bunny.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
