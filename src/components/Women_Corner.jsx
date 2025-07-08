import React from "react";
import "../../tailwind.css";

const WomenCornerPage = () => {
  const sections = [
    {
      title: "Scholarships",
      items: [
        {
          title: "TechRabbit Women in Tech Scholarship",
          description: "A scholarship program aimed at supporting women pursuing careers in technology.",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBTpI9G1MiggYA9BKvKwddLeywtpXu-JNmHcrSSjt_qbTeXQp0Ze9QU7cxe_ZSFdfMYx5PFlmUjNhwylARJJPPADxeOi9zSEKeB78p7CQ0m9JYId9shhvcZjPTJDi1_6hvXf8FCWZpMO4YGAwion74Osr0pAW9-g7yi5o8DFcdpcxldGXTDloNIov2gUSUO-eN36Lfeh0wVCqq7S7RD515cq7jyhGuAm1I1GGzPy3T4QJTsjMvTEwL9XBMXG7OGYfXcGdocHVGpNe96",
        },
      ],
    },
    {
      title: "Internships",
      items: [
        {
          title: "TechRabbit Internship Program",
          description: "An internship program designed to provide hands-on experience in various tech fields.",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBNzWWOlHNagIGwQnAzV_Lca5dMv0K-uIGrFQKVmzADZDHF1J8K3-e2nNoeBqX6EFGcZ2To5elNR1oZS3ioTkERFpWw0Jp05mYD7WQG4fn7llblXEMlVfycq87esyCdbWdwPoAZgPNwfNve0X_ey7YqaVrKtSK5MVGzsVGat64T_ckyQ_2WpJAPTc91LgPrqSrUbJ99-Jdvkxz1AZuxx-uP5Y0gvHSIAqezGVBNZ2EU6IGBt6auce7pwzRux0Kz54LQeggkhXMJQRUw",
        },
      ],
    },
    {
      title: "Mentorship",
      items: [
        {
          title: "TechRabbit Mentorship Program",
          description:
            "A mentorship program connecting experienced professionals with women entering the tech industry.",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD6teJzZJMJET47gveQhqS5AEbrsKCfx8Y8NA6X3MGso0IkafBANpbqviGMQWJewGaeCiAbPCTXLL6k_-7adFx4Jte-87ae491MwFi4TYZ-fDTaJfcR2Uw0iNQBg0cDY6cR6EueqqV8Vpp6qMyNIe3ErFzqq-2z44GRCDWfT3GgKbMPInsH6K5oRKwDpdycOYs9Q8P8Wmsc7dU41rs2f-cl34bWnabs_-4Q2PNW1fHl7yR1U5jRZw3Rn5OG-_Q4v7JEk7FrWdfmnOUT",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#1f141b] text-white font-['Space_Grotesk','Noto_Sans',sans-serif]">
      <header className="flex justify-between items-center border-b border-[#402b39] px-10 py-3">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-6 h-6" />
          </div>
          <nav className="flex items-center gap-9 text-sm font-medium">
            <a href="/" className="hover:text-pink-400 transition-colors">Home</a>
            <a href="/chatbot" className="hover:text-pink-400 transition-colors">ChatBot</a>
            <a href="/women-corner" className="hover:text-pink-400 transition-colors">Women Corner</a>
            <a href="/courses-hub" className="hover:text-pink-400 transition-colors">Courses</a>
          </nav>
        </div>
        <div className="flex items-center gap-8">
          <label className="min-w-40 h-10 max-w-64">
            <div className="flex items-center rounded-xl bg-[#402b39]">
              <div className="pl-4 text-[#be9db3]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11...Z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 text-white bg-[#402b39] placeholder-[#be9db3] rounded-r-xl focus:outline-none"
              />
            </div>
          </label>
          <div
            className="w-10 h-10 rounded-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBrAQ8LR-x1F4LgeeS1AF82Z85PUi3CaGU5fx5lxCcPpWosNss9IAr2BBHidj4M9L_v2U_xUw3gwwD-sNi9Gtu9ZZdIwRgC4Hx8xBsnn3jYtifxUFtrQg1UJCj7bY6wubwjkxkELoeE2tnYz2wXMAFOs873DhOkH1-iA2zPVXFl0UC60cPZdhPD2grYLzIBwvgDpmw8V5cUYabtPPZmDYzQkXw8fJYfBfBW0EaFKWspP61838l8E4Tk44a3MmjcmXCRj2dBsVdApQLC')",
            }}
          ></div>
        </div>
      </header>
      <main className="px-40 py-5">
        <div className="max-w-[960px] mx-auto">
          <div className="p-4">
            <h1 className="text-[32px] font-bold">Women's Corner</h1>
            <p className="text-[#be9db3] text-sm mt-1">Empowering women in tech with resources and opportunities.</p>
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-[22px] font-bold px-4 pt-5 pb-3">{section.title}</h2>
              <div className="p-4">
                {section.items.map((item) => (
                  <div key={item.title} className="flex gap-4 items-stretch mb-4">
                    <div className="flex-1 flex flex-col gap-1">
                      <p className="text-base font-bold">{item.title}</p>
                      <p className="text-[#be9db3] text-sm">{item.description}</p>
                    </div>
                    <div
                      className="flex-1 aspect-video bg-cover bg-center rounded-xl"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default WomenCornerPage;
