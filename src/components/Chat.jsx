import React from "react";
import "../../tailwind.css";

const Chat = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#17141f] dark group/design-root overflow-x-hidden"
      style={{
        fontFamily: '"Space Grotesk", "Noto Sans", sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-[#312b40] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <img src="/logo.png" alt="Logo" className="w-6 h-6" />
            <h2 className="text-white text-lg font-bold tracking-[-0.015em]">&nbsp;</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a href="/courses-hub" className="text-white text-sm font-medium">Courses</a>
              <a href="/women-corner" className="text-white text-sm font-medium">Women Corner</a>
            </div>
            <button className="flex h-10 min-w-[84px] px-4 items-center justify-center rounded-full bg-[#c1b2e5] text-[#17141f] text-sm font-bold">
              <span className="truncate">Get Started</span>
            </button>
          </div>
        </header>

        {/* Chat Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 className="text-white text-[28px] font-bold leading-tight text-center pb-3 pt-5 px-4">
              Chat with our AI assistant
            </h2>

            {/* Messages and Input */}
            {/* [Same as previous code...] */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
