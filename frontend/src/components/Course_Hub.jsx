import "../../tailwind.css";
import React, { useEffect, useRef } from "react";
import Header from "./Header";

const CourseHub = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const courses = [
    {
      title: "Introduction to Python Programming",
      desc: "Learn the basics of Python programming with hands-on exercises.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGsiaVyzTXBsk2thb2YVpD-86oDF-HvvKOoSi84jx8REGkWfqafrNGHOEmsWQaWcxZDAbn2_K7SlDLzrQnWkk-L8Z2Im3UQW3ngGuX2uJWZ2Wp__VbGWjbE6x2CjlcZSNiZMmktDpvDYLWiib4L-USrwzb_pa4GH5sbJ5XdOOltXrrokDJgzL3TmFVt_F8wTqPrzbHrGVjflTl_NHco0Arxszd_NCJ9gYrTiFUAkhpZilB5qZinrf1QMJ9IKwSaOt4LyJTO1A__Ei8",
      level: "Beginner",
      duration: "6 weeks",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Advanced Data Structures and Algorithms",
      desc: "Master advanced data structures and algorithms for efficient problem-solving.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnP3h3R4DuQmfiPjEhiToyBqTV8AMNjeNYnHM9JPU7csYWViNsXV9MURvD9DS1_6T38IHtkxTVh6O-ALtaT4QDjT5y0ebpjb6ziZPa-BEPXSrDdMYdlwwZ9SCPSIn-dgKMzRkFPytFSD9zmj-nEIyUKg9GsKD3YUjXKLbveOByiL3NdPqjhjmRcK9101NPlMpi6tqmg_4-rCsmhDAzap7Oc9bf7XKWY4d7eYQ3S_OoWxCbFOOtmWYdC6usirUOts4FWNVeGfY04oX-",
      level: "Advanced",
      duration: "10 weeks",
      color: "from-red-500/20 to-orange-500/20"
    },
    {
      title: "Machine Learning Fundamentals",
      desc: "Explore the fundamentals of machine learning and build your first models.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyuGCQX00fNgOWGnKL4WfW3TpGihWpVAL-hhQbUi7syUI2B6mbVZeRxccn6NWFKIv1YsOmzD3n_4xCVsJ_oYKcCbhsXyPxnF5mnURdL-7gqmFzyOWe1bIr-Kghj0WXi8LvVGiMXta6aRKSYIjUQ8m3l0UViXvFiSKtwDa9lP_I1dnYwcvlv9zv2yD3k92c3tnNimR2jtQkt9SZMmJqUgsltS1WBDRudQOi9vaEk-PDIs9Es5aOujLa6dtUUNtIuuK93939fFPO-TlV",
      level: "Intermediate",
      duration: "8 weeks",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Web Development with React",
      desc: "Build modern web applications using React and other essential tools.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBHoxiijcDwk6Z5mdH9qyVzIdqhGGgrUp9uaRcoJvJ4cJJx5IQzE324RRV6Z38i8uvoGuyQdOEb7m75Sp9tZEmafA2RsQs9M5P-HcAG6RhDSminA9nBLGelxSI02a2ofkMT9ofWnKgz62ExwD1u6f9AHBSDWAMbOdh3UjCRbQOlr8k_wz3M5LKyfWhVrCL6QTj6dbkldtA_q4ZfjDCpxUadMLVo0zEzftDrLoPe2Hk5bomPolpK5wJhIptGrUrnH4Gj9RNKTjUup0B",
      level: "Intermediate",
      duration: "12 weeks",
      color: "from-blue-500/20 to-cyan-500/20"
    }
  ];

  const filters = ["Paid", "Unpaid", "One-shot", "Detailed"];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-green-400 bg-green-400/10';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'Advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-blue-400 bg-blue-400/10';
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#161122] via-[#1a1a2e] to-[#161122] overflow-x-hidden font-space-grotesk page-transition"
      style={{
        "--checkbox-tick-svg": `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgb(23,20,31)' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`
      }}
    >
      <Header />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Main */}
      <main className="flex flex-1 py-5 px-6 relative z-10">
        {/* Filters */}
        <aside className="w-80 flex-shrink-0 animate-slide-in-left">
          <div className="sticky top-24">
            <h2 className="text-white text-[22px] font-bold px-4 pb-3 flex items-center">
              Filters
              <span className="ml-2 text-blue-400">⚙️</span>
            </h2>
            <div className="bg-gradient-to-br from-[#2a2a3e] to-[#1f1f2e] rounded-2xl border border-white/10 p-4">
              {filters.map((label, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-all duration-300 cursor-pointer group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-2 border-white/20 bg-transparent text-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                  />
                  <p className="text-white text-base group-hover:text-blue-300 transition-colors duration-300">{label}</p>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Course Cards */}
        <section className="flex-1 pl-6">
          <div className="flex justify-between flex-wrap gap-3 mb-6 animate-fade-in-up">
            <div className="min-w-36">
              <h1 className="text-white text-[32px] font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Course Hub
              </h1>
              <p className="text-white text-sm mt-2 opacity-80">
                Explore our courses and resources to enhance your technical skills.
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <div 
                key={i} 
                ref={el => cardsRef.current[i] = el}
                className="card-reveal group cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a2a3e] to-[#1f1f2e] border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Image container */}
                  <div className="relative overflow-hidden">
                    <div
                      className="w-full aspect-video bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${course.img})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Level badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)} backdrop-blur-sm`}>
                      {course.level}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 relative z-10">
                    <h3 className="text-white text-lg font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4 group-hover:text-white/90 transition-colors duration-300 line-clamp-3">
                      {course.desc}
                    </p>
                    
                    {/* Course info */}
                    <div className="flex items-center justify-between text-xs text-white/60 mb-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Course
                      </span>
                    </div>
                    
                    {/* Enroll button */}
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:from-blue-600 hover:to-purple-600">
                      Enroll Now
                    </button>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <style jsx>{`
        .card-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CourseHub;