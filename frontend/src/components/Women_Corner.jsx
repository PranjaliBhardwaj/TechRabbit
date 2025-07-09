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
        {
          title: "Women in STEM Grant",
          description: "Financial support for women in science, technology, engineering, and math.",
          image:
            "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        },
        {
          title: "Diversity in Tech Award",
          description: "Award for outstanding contributions to diversity in technology.",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        },
        {
          title: "Future Leaders Scholarship",
          description: "Supporting the next generation of women tech leaders.",
          image:
            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        },
        {
          title: "Global Women Tech Fund",
          description: "International fund for women in technology.",
          image:
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
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
        {
          title: "Women in AI Internship",
          description: "Internship for women interested in artificial intelligence research.",
          image:
            "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80",
        },
        {
          title: "Web Dev Bootcamp",
          description: "Hands-on web development internship for women.",
          image:
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        },
        {
          title: "Cloud Computing Internship",
          description: "Cloud technology internship for women in tech.",
          image:
            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        },
        {
          title: "Data Science Fellowship",
          description: "Fellowship for women in data science fields.",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
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
        {
          title: "Women in Tech Mentors",
          description: "Mentorship for women by leading tech professionals.",
          image:
            "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        },
        {
          title: "Leadership Coaching",
          description: "Coaching for women aspiring to leadership roles in tech.",
          image:
            "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80",
        },
        {
          title: "Peer Mentoring",
          description: "Peer-to-peer mentoring for women in technology.",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        },
        {
          title: "Global Tech Sisterhood",
          description: "International mentorship network for women in tech.",
          image:
            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#1f141b] text-white font-['Space_Grotesk','Noto_Sans',sans-serif]">
      <Header />
      <main className="px-40 py-5 flex flex-1 justify-center">
        <div className="flex flex-col max-w-[960px] w-full">
          <div className="p-4">
            <h1 className="text-[32px] font-bold">Women's Corner</h1>
            <p className="text-[#be9db3] text-sm mt-1">Empowering women in tech with resources and opportunities.</p>
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-white text-[22px] font-bold px-4 pt-5 pb-3">{section.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
                {section.items.map((item) => (
                  <div key={item.title} className="flex flex-col gap-3 pb-3 min-w-[158px] max-w-[220px]">
                    <div
                      className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-xl"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div>
                      <p className="text-white text-base font-medium">{item.title}</p>
                      <p className="text-[#be9db3] text-sm">{item.description}</p>
                    </div>
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
