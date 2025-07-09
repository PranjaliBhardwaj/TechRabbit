import "../../tailwind.css";
import React from "react";
import Header from "./Header";

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
      <Header />
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
