import "../../tailwind.css";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

const CourseHub = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/cards?section=course`);
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        setCourses([]);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

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

          {loading ? (
            <div className="text-center text-lg py-10 text-white">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div
                    key={course._id}
                    className="flex flex-col gap-3 pb-3 min-w-[158px] max-w-[220px] cursor-pointer"
                    onClick={() => navigate('/course')}
                  >
                    <div
                      className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-xl"
                      style={{ backgroundImage: `url(${course.image ? `${API_URL}/uploads/${course.image}` : ''})` }}
                    ></div>
                    <div>
                      <p className="text-white text-base font-medium">{course.title}</p>
                      <p className="text-[#9da8be] text-sm">{course.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-accent-light text-white">No courses available yet.</div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CourseHub;
