import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const profileImg = `${window.location.origin}/default_bunny.jpg`;
  return (
    <header className="flex items-center justify-between border-b border-[#2b3240] px-10 py-3">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-white">
          <a href="/">
            <img src="/logo.png" alt="Logo" className="w-32 h-8 cursor-pointer" />
          </a>
        </div>
        <nav className="flex items-center gap-9 text-sm font-medium text-white">
          <a href="/explore" className="hover:text-accent transition-colors">Home</a>
          <a href="/chat" className="hover:text-accent transition-colors">Chat</a>
          <a href="/women-corner" className="hover:text-accent transition-colors">Women Corner</a>
          <a href="/courses-hub" className="hover:text-accent transition-colors">Courses</a>
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
        <div
          className="bg-center bg-no-repeat bg-cover rounded-full size-10 cursor-pointer"
          style={{
            backgroundImage: `url('${profileImg}')`,
          }}
          onClick={() => navigate("/profile")}
        ></div>
      </div>
    </header>
  );
};

export default Header;
