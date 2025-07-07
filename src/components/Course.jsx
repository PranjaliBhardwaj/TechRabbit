import React from "react";
import "tailwindcss/tailwind.css";

const App = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#161122] overflow-x-hidden group/design-root"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-b-[#2f2447] px-10 py-3">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              {/* SVG Logo */}
              <img src="/logo.png" alt="Logo" className="w-6 h-6" />
            </div>
          </div>
          <nav className="flex items-center gap-9 text-sm font-medium text-white">
            <a href="/" className="hover:text-accent transition-colors">Home</a>
            <a href="/chatbot" className="hover:text-accent transition-colors">ChatBot</a>
            <a href="/women-corner" className="hover:text-accent transition-colors">Women Corner</a>
            <a href="/courses-hub" className="hover:text-accent transition-colors">Courses</a>
          </nav>
        </div>

        <div className="flex flex-1 justify-end gap-8">
          <label className="flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full items-stretch rounded-xl h-full">
              <div className="text-[#a393c8] flex items-center justify-center pl-4 rounded-l-xl bg-[#2f2447]">
                {/* Search Icon */}
              </div>
              <input
                placeholder="Search"
                className="form-input w-full flex-1 text-white bg-[#2f2447] h-full px-4 placeholder:text-[#a393c8] rounded-xl rounded-l-none border-none focus:outline-0"
              />
            </div>
          </label>
          <button className="flex h-10 items-center gap-2 rounded-full bg-[#2f2447] px-2.5 text-sm font-bold text-white">
            {/* Bell Icon */}
          </button>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAzuuTDy0wwNJDONb3w5v_GrNIRiwQtgKGRxWmJu4UkLulXywBj9Fy2aedRxo4A7LLi261UmcejyUAp-NvSLzmRbgxDTdvb_L69Xyu2zHggm1K2ZSgskwt2giS3nwf_7ovqfxhgrimokiQjnEx-2GYCElfqvAXBJdtg-EPY0IgPPwO-70eyd46ia0kb7l8zHC5sOazmKA1Hs8-cIXXRcpJ4pv-de_7v05wVVG7ic4aWlLIN-BU0qe33cntTc-ZxMf-zFTGaKZyOdqop")',
            }}
          ></div>
        </div>
      </header>

      {/* Body Content */}
      <main className="px-40 py-5 flex flex-1 justify-center">
        <div className="flex flex-col max-w-[960px] w-full">
          {/* Breadcrumb */}
          <div className="flex gap-2 p-4 text-[#a393c8]">
            <a href="#" className="text-base font-medium">Courses</a>
            <span className="text-base font-medium">/</span>
            <span className="text-white text-base font-medium">Advanced Python</span>
          </div>

          {/* Course Info */}
          <div className="flex justify-between gap-3 p-4">
            <div className="flex flex-col gap-3 min-w-72">
              <p className="text-white text-[32px] font-bold">Advanced Python Programming</p>
              <p className="text-[#a393c8] text-sm">
                Master advanced Python concepts and techniques to build robust and scalable applications.
              </p>
            </div>
          </div>

          {/* Video and Description */}
          <div className="p-4">
            <div className="flex flex-col @xl:flex-row rounded-xl">
              <div
                className="w-full aspect-video bg-center bg-cover rounded-xl"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANh6JebIOZJGkf8IVQfPK0DBXG3B7L89OkkrHcyax6i8ZnYShjRxGjTyjFQEebpiV7UFnmIt197zMp5pgaCbGa-OoqsOD3EDlXoC4qoCi9BVq1yJ9Te1M4tRwdiU1lfbF_GFjFExwxT6XS6Qjw6UNaT2ChigxYJtWi7i6TKX-mbIJKUqfKUUU9Xwd5g6SvzH1GH-JHfbwyMhhWRxhNoohDWtivIjhB8fS_59XJn2iiVv0dlylPYvuwGl5fL5gU1F5C5IU225FvEDTl")',
                }}
              ></div>
              <div className="flex flex-col justify-center py-4 px-4">
                <p className="text-[#a393c8] text-sm">Course</p>
                <p className="text-white text-lg font-bold">Advanced Python Programming</p>
                <div className="flex justify-between items-end gap-3">
                  <p className="text-[#a393c8] text-base">
                    Learn asynchronous programming, metaprogramming, and advanced data structures.
                  </p>
                  <button className="h-8 px-4 rounded-full bg-[#5619e5] text-white text-sm font-medium">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Continue translating Course Details, Comments, and Footer similarly... */}
        </div>
      </main>
    </div>
  );
};

export default App;
