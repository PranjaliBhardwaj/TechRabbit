import "../../tailwind.css";
import React from "react";
import Header from "./Header";

const Chat = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#17141f] dark group/design-root overflow-x-hidden"
      style={{
        fontFamily: '"Space Grotesk", "Noto Sans", sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />

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
