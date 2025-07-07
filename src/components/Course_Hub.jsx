import React from "react";

const Courses_Hub = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-primary overflow-x-hidden font-space-grotesk"
      style={{
        "--checkbox-tick-svg": `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgb(23,20,31)' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`
      }}
    >
      <header className="flex items-center justify-between border-b border-primary-light px-10 py-3">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-white">
            <div className="size-8">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
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
          <label className="flex min-w-40 max-w-64">
            <div className="flex w-full rounded-xl bg-primary-light items-center focus-within:ring-2 focus-within:ring-accent transition-all">
              <div className="text-accent-light pl-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </div>
              <input
                className="w-full text-white px-4 py-2 bg-primary-light focus:outline-none placeholder-accent-light"
                placeholder="Search"
              />
            </div>
          </label>
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent/90 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="text-primary">
                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.47,166.78,40,185.66,24.77,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.38-52s70.54,19.44,89.38,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-1 py-5 px-6">
        <aside className="w-80 flex-shrink-0">
          <h2 className="text-white text-[22px] font-bold px-4 pb-3">Filters</h2>
          {[
            { label: "Paid" },
            { label: "Unpaid" },
            { label: "Beginner" },
            { label: "Expert" },
            { label: "One-shot" },
            { label: "Detailed" },
          ].map(({ label }, idx) => (
            <label key={idx} className="flex items-center gap-3 px-4 py-3 hover:bg-primary-light/50 rounded-lg transition-colors cursor-pointer">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-2 border-primary-dark bg-transparent text-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary focus:outline-none"
              />
              <p className="text-white text-base">{label}</p>
            </label>
          ))}
        </aside>

        <section className="flex-1 pl-6">
          <div className="flex justify-between flex-wrap gap-3">
            <div className="min-w-72">
              <p className="text-white text-[32px] font-bold">Courses</p>
              <p className="text-accent-light text-sm">Explore our courses and resources to enhance your technical skills.</p>
            </div>
          </div>
          <div className="flex gap-3 py-3 flex-wrap">
            <span className="rounded-full bg-primary-light px-4 py-1 text-white text-sm hover:bg-primary-dark transition-colors cursor-pointer">Beginner-friendly</span>
            <span className="rounded-full bg-primary-light px-4 py-1 text-white text-sm hover:bg-primary-dark transition-colors cursor-pointer">Paid</span>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {[{
              title: "Introduction to Python Programming",
              desc: "Learn the basics of Python programming with hands-on exercises.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGsiaVyzTXBsk2thb2YVpD-86oDF-HvvKOoSi84jx8REGkWfqafrNGHOEmsWQaWcxZDAbn2_K7SlDLzrQnWkk-L8Z2Im3UQW3ngGuX2uJWZ2Wp__VbGWjbE6x2CjlcZSNiZMmktDpvDYLWiib4L-USrwzb_pa4GH5sbJ5XdOOltXrrokDJgzL3TmFVt_F8wTqPrzbHrGVjflTl_NHco0Arxszd_NCJ9gYrTiFUAkhpZilB5qZinrf1QMJ9IKwSaOt4LyJTO1A__Ei8"
            }, {
              title: "Advanced Data Structures and Algorithms",
              desc: "Master advanced data structures and algorithms for efficient problem-solving.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnP3h3R4DuQmfiPjEhiToyBqTV8AMNjeNYnHM9JPU7csYWViNsXV9MURvD9DS1_6T38IHtkxTVh6O-ALtaT4QDjT5y0ebpjb6ziZPa-BEPXSrDdMYdlwwZ9SCPSIn-dgKMzRkFPytFSD9zmj-nEIyUKg9GsKD3YUjXKLbveOByiL3NdPqjhjmRcK9101NPlMpi6tqmg_4-rCsmhDAzap7Oc9bf7XKWY4d7eYQ3S_OoWxCbFOOtmWYdC6usirUOts4FWNVeGfY04oX-"
            }, {
              title: "Machine Learning Fundamentals",
              desc: "Explore the fundamentals of machine learning and build your first models.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyuGCQX00fNgOWGnKL4WfW3TpGihWpVAL-hhQbUi7syUI2B6mbVZeRxccn6NWFKIv1YsOmzD3n_4xCVsJ_oYKcCbhsXyPxnF5mnURdL-7gqmFzyOWe1bIr-Kghj0WXi8LvVGiMXta6aRKSYIjUQ8m3l0UViXvFiSKtwDa9lP_I1dnYwcvlv9zv2yD3k92c3tnNimR2jtQkt9SZMmJqUgsltS1WBDRudQOi9vaEk-PDIs9Es5aOujLa6dtUUNtIuuK93939fFPO-TlV"
            }, {
              title: "Web Development with React",
              desc: "Build modern web applications using React and other essential tools.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBHoxiijcDwk6Z5mdH9qyVzIdqhGGgrUp9uaRcoJvJ4cJJx5IQzE324RRV6Z38i8uvoGuyQdOEb7m75Sp9tZEmafA2RsQs9M5P-HcAG6RhDSminA9nBLGelxSI02a2ofkMT9ofWnKgz62ExwD1u6f9AHBSDWAMbOdh3UjCRbQOlr8k_wz3M5LKyfWhVrCL6QTj6dbkldtA_q4ZfjDCpxUadMLVo0zEzftDrLoPe2Hk5bomPolpK5wJhIptGrUrnH4Gj9RNKTjUup0B"
            }].map((course, i) => (
              <div key={i} className="flex flex-col gap-3 pb-3 group cursor-pointer">
                <div
                  className="w-full aspect-square bg-cover bg-center rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg"
                  style={{ backgroundImage: `url(${course.img})` }}
                ></div>
                <div>
                  <p className="text-white font-medium group-hover:text-accent transition-colors">{course.title}</p>
                  <p className="text-accent-light text-sm">{course.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Courses_Hub; 