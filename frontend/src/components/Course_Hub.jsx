import "../../tailwind.css";
import React from "react";
import Header from "./Header";

const CourseHub = () => {
  const courses = [
    {
      title: "Introduction to Python Programming",
      desc: "Learn the basics of Python programming with hands-on exercises.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGsiaVyzTXBsk2thb2YVpD-86oDF-HvvKOoSi84jx8REGkWfqafrNGHOEmsWQaWcxZDAbn2_K7SlDLzrQnWkk-L8Z2Im3UQW3ngGuX2uJWZ2Wp__VbGWjbE6x2CjlcZSNiZMmktDpvDYLWiib4L-USrwzb_pa4GH5sbJ5XdOOltXrrokDJgzL3TmFVt_F8wTqPrzbHrGVjflTl_NHco0Arxszd_NCJ9gYrTiFUAkhpZilB5qZinrf1QMJ9IKwSaOt4LyJTO1A__Ei8"
    },
    {
      title: "Advanced Data Structures and Algorithms",
      desc: "Master advanced data structures and algorithms for efficient problem-solving.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnP3h3R4DuQmfiPjEhiToyBqTV8AMNjeNYnHM9JPU7csYWViNsXV9MURvD9DS1_6T38IHtkxTVh6O-ALtaT4QDjT5y0ebpjb6ziZPa-BEPXSrDdMYdlwwZ9SCPSIn-dgKMzRkFPytFSD9zmj-nEIyUKg9GsKD3YUjXKLbveOByiL3NdPqjhjmRcK9101NPlMpi6tqmg_4-rCsmhDAzap7Oc9bf7XKWY4d7eYQ3S_OoWxCbFOOtmWYdC6usirUOts4FWNVeGfY04oX-"
    },
    {
      title: "Machine Learning Fundamentals",
      desc: "Explore the fundamentals of machine learning and build your first models.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyuGCQX00fNgOWGnKL4WfW3TpGihWpVAL-hhQbUi7syUI2B6mbVZeRxccn6NWFKIv1YsOmzD3n_4xCVsJ_oYKcCbhsXyPxnF5mnURdL-7gqmFzyOWe1bIr-Kghj0WXi8LvVGiMXta6aRKSYIjUQ8m3l0UViXvFiSKtwDa9lP_I1dnYwcvlv9zv2yD3k92c3tnNimR2jtQkt9SZMmJqUgsltS1WBDRudQOi9vaEk-PDIs9Es5aOujLa6dtUUNtIuuK93939fFPO-TlV"
    },
    {
      title: "Web Development with React",
      desc: "Build modern web applications using React and other essential tools.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBHoxiijcDwk6Z5mdH9qyVzIdqhGGgrUp9uaRcoJvJ4cJJx5IQzE324RRV6Z38i8uvoGuyQdOEb7m75Sp9tZEmafA2RsQs9M5P-HcAG6RhDSminA9nBLGelxSI02a2ofkMT9ofWnKgz62ExwD1u6f9AHBSDWAMbOdh3UjCRbQOlr8k_wz3M5LKyfWhVrCL6QTj6dbkldtA_q4ZfjDCpxUadMLVo0zEzftDrLoPe2Hk5bomPolpK5wJhIptGrUrnH4Gj9RNKTjUup0B"
    }
  ];

  const filters = ["Paid", "Unpaid", "One-shot", "Detailed"];

  return (
    <div
      className="relative flex min-h-screen flex-col bg-primary overflow-x-hidden font-space-grotesk bg-[#161122]"
      style={{
        "--checkbox-tick-svg": `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgb(23,20,31)' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`
      }}
    >
      <Header />

      {/* Main */}
      <main className="flex flex-1 py-5 px-6">
        {/* Filters */}
        <aside className="w-80 flex-shrink-0">
          <h2 className="text-white text-[22px] font-bold px-4 pb-3">Filters</h2>
          {filters.map((label, idx) => (
            <label
              key={idx}
              className="flex items-center gap-3 px-4 py-3 hover:bg-primary-light/50 rounded-lg transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-2 border-primary-dark bg-transparent text-accent focus:ring-2"
              />
              <p className="text-white text-base">{label}</p>
            </label>
          ))}
        </aside>

        {/* Course Cards */}
        <section className="flex-1 pl-6">
          <div className="flex justify-between flex-wrap gap-3">
            <div className="min-w-36">
              <p className="text-white text-[16px] font-bold">Courses</p>
              <p className="text-accent-light text-white text-xs">Explore our courses and resources to enhance your technical skills.</p>
            </div>
          </div>
          <br />

          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,0.5fr))] gap-3">
            {courses.map((course, i) => (
              <div key={i} className="flex flex-col gap-1.5 pb-1.5 group cursor-pointer text-xs relative">
                <div
                  className="w-full aspect-square bg-cover bg-center rounded-lg group-hover:scale-105 transition-transform duration-300 shadow"
                  style={{ backgroundImage: `url(${course.img})` }}
                ></div>
                <div>
                  <p className="text-white font-bold text-lg group-hover:text-accent transition-colors">{course.title}</p>
                  <p className="text-accent-light text-white text-sm">{course.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CourseHub;
