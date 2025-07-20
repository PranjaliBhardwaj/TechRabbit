import React, { useEffect, useRef } from "react";
import "../../tailwind.css";
import Header from "./Header";

const Explore = () => {
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

  const cardData = [
    {
      title: "Scholarships",
      description: "Explore financial aid options to support your educational journey.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3C1URVE-C9ryo0ftOv4cXxJh1Xtjd9miCPYUwMOXTiBm4jfGBuZNrfkDtdTitsnMeBtJv8gY5CobY_UOfs29-Z4fKyj5scjaFVTVz-ZhAZyWG8yuLZXHKQDXVJgeR5VYIi9FESQDrbzDaSpFoXSF4XF2Xi3CO4tIaRqVg9jtd0G0Ts47dXw65_CdYd4XQOI9l6nSkexNmCg4h40R_7Mae0bIBbbWTisvUicQMMzxU3DOcYi4mMgxubiA6ZntHfi2PFYWVOQdSOd91",
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "Courses",
      description: "Browse a wide range of courses to enhance your skills and knowledge.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEWOy7mzWKN7a9b08vKNJX-yuMsXbbl3GteW61bpYEd_8Yng5W2DrY_Ig_UDyii1kyduqeCX2isTRAwF_IEu4kfg8Oh7j_-p668aGWYe4SYW7x6lE9Bvn4hFdNRiSw8vxmeiAljRuYtLIGQ12jVFSK86tI_PYcNOhnYYNkhJ2dV5JorSN1-PduL3dP7UYtWij1h3hf66_FwjMpisdCnEYkPoSimR3bNT0yUD5c6Tezc4fPktUFXGcKmZ0_DdQCvOJq5nstC6HubQZd",
      gradient: "from-green-500/20 to-teal-500/20"
    },
    {
      title: "Internships",
      description: "Discover internship opportunities to gain practical experience in your field.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD65kIkBX0Lzgaje2JKU-iMykPRRgbfP2cdejWDswe9MhiaEaW2uZwkhZeIKPajIboCV2X67k6Fs2him-JtWszGkW6PQRW6EN7Ig9Vl3W7j_i2qp0jXPf9W4I3sVfopYWEzI6HpGiRUWbht-MRpP7eEg77QhoTYDxE-MDpNLE_dDlf8id_-tbwTMUFaJpo8qdQTnxnkAkSxhUUKNtfteLWuByB0c2FKRVXr_NCoUknV05BkC--pafdiLbnZu-9b6rG22WITMXKMcRY",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Open Source Programs",
      description: "Contribute to open source projects and collaborate with developers worldwide.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz508rmEe6lTfCTIJEaZ31uuX2Zzu5YKeGxiu4sdASJuHdNg8s2VK65usO4CcStc6rM2HrVRcSzG8NEJQBTSKohl8FEHSANOhImpKqTdX3GSGl-OeFF56Xk-ckZ7p0UDhJE2j7RaoaUccxHQmwCn6PZr1R9DDlot7TMSOpMonOzj3lGkCnzHkLQ9jFSn3dQS6RipA2Kjx1A7qbZJ8_sHukQZj2n1aW5q3qsVgkBHtxNDa52C4L2Hn-5jB5GDaDS4CaS-QQW_-a9NlK",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Extracurricular Activities",
      description: "Engage in extracurricular activities to broaden your horizons and network.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABMaH5LYDAImulpIsFgtv75uQF8HJSPuEInSSGZF4wHfAEaI5gTJwuoYmBh45StnCy-3_4vMLUs_1okx993h-7CQbgn32hHzMd8Md6_ONCgtvzplsqLJ4hqGjRVH6ZGKthKSRSdBbw5_S9gGNHKnDEArbsVdnmpF_1npu0QFUNM7V0C3fa9Ad9xsJ27oVMP29molmMBMZiA5LB1yuXH4U50x02VLIpIf0-OpcRSVlMhIFJEPhDWfngdZUUnO97u2hiQ3PobaDW6q5B",
      gradient: "from-indigo-500/20 to-blue-500/20"
    },
  ];

  return (
    <div
      className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#14181f] via-[#1a1a2e] to-[#16213e] overflow-x-hidden page-transition"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <Header />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main */}
      <main className="px-40 py-5 flex flex-1 justify-center relative z-10">
        <div className="flex flex-col max-w-[960px] w-full">
          <div className="p-4 animate-fade-in-up">
            <h1 className="text-white text-[32px] font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Explore
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 animate-pulse"></div>
          </div>

          <h2 className="text-white text-[22px] font-bold px-4 pb-3 pt-5 animate-slide-in-left">
            Opportunities
            <span className="ml-2 text-blue-400">✨</span>
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-4">
            {cardData.map((card, index) => (
              <div 
                key={index} 
                ref={el => cardsRef.current[index] = el}
                className="card-reveal group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a2a3e] to-[#1f1f2e] border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Image container */}
                  <div className="relative overflow-hidden">
                    <div
                      className="w-full aspect-square bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url("${card.image}")` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 relative z-10">
                    <h3 className="text-white text-lg font-semibold mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-[#9da8be] text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      {card.description}
                    </p>
                    
                    {/* Hover arrow */}
                    <div className="mt-4 flex items-center text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      <span className="text-sm font-medium">Explore</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
      `}</style>
    </div>
  );
};

export default Explore;