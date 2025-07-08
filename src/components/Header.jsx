import React from "react";

const Header = () => (
  <header className="flex items-center justify-between border-b border-[#2b3240] px-10 py-3">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-4 text-white">
        <img src="/logo.png" alt="Logo" className="w-6 h-6" />
      </div>
      <nav className="flex items-center gap-9 text-sm font-medium text-white">
        <a href="/" className="hover:text-accent transition-colors">Home</a>
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
        className="bg-center bg-no-repeat bg-cover rounded-full size-10"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBeTObt_P5ZmjLH5FpIwr3ScKVKuOc31pULLVk4SHYnkcQy5TQALOtWdWwHC6DOwIUR9_BbW9rjlA8ERrhpT5pdKtmeFEMhDi402EQTwAyUha5cv3R-06gZF43xyhJi34mJpmVGeB03Thrr_qlRTiE4N15JAadISGizd00HVanoKtFjg5Hhq64uLsTqVliboI-Ao43KwX5endKuZRvD4XwEzMNGUMMgD0_7fCZvW7i8BuG5ly1n_2tR7rJ3joFCU_CUpQ-utSiW6KA")',
        }}
      ></div>
    </div>
  </header>
);

export default Header;
