import React from "react";
import "../../tailwind.css";
import Header from "./Header";

const CoursePage = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#161122] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <Header />

      {/* Main Content */}
      <main className="px-40 py-5 flex flex-1 justify-center">
        <div className="flex flex-col max-w-[960px] w-full">
          {}
          <div className="flex gap-2 p-4 text-[#a393c8]">
            <a href="#" className="text-base font-medium">Courses</a>
            <span className="text-base font-medium">/</span>
            <span className="text-white text-base font-medium">Advanced Python</span>
          </div>

          {/* Course Header */}
          <div className="flex justify-between gap-3 p-4">
            <div className="flex flex-col gap-3 min-w-72">
              <p className="text-white text-[32px] font-bold">Advanced Python Programming</p>
              <p className="text-[#a393c8] text-sm">
                Master advanced Python concepts and techniques to build robust and scalable applications.
              </p>
            </div>
          </div>

          {/* Video + Info Card */}
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

          {/* Further sections like curriculum, reviews, etc. can be added here */}
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
