import "../../tailwind.css";
import React, { useEffect, useState } from "react";
import Header from "./Header";

const API_URL = "http://localhost:5000";

const sectionLabels = {
  scholarship: "Scholarships",
  internship: "Internships",
  mentorship: "Mentorship",
};

const WomenCornerPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/cards`);
        const data = await res.json();
        setCards(data);
      } catch (err) {
        setCards([]);
      }
      setLoading(false);
    };
    fetchCards();
  }, []);

  // Group cards by section
  const grouped = cards.reduce((acc, card) => {
    acc[card.section] = acc[card.section] || [];
    acc[card.section].push(card);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#1f141b] text-white font-['Space_Grotesk','Noto_Sans',sans-serif]">
      <Header />
      <main className="px-40 py-5 flex flex-1 justify-center">
        <div className="flex flex-col max-w-[960px] w-full">
          <div className="p-4">
            <h1 className="text-[32px] font-bold">Women's Corner</h1>
            <p className="text-[#be9db3] text-sm mt-1">Empowering women in tech with resources and opportunities.</p>
          </div>
          {loading ? (
            <div className="text-center text-lg py-10">Loading...</div>
          ) : (
            Object.keys(sectionLabels).map(section => (
              <div key={section}>
                <h2 className="text-white text-[22px] font-bold px-4 pt-5 pb-3">{sectionLabels[section]}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
                  {grouped[section]?.length ? (
                    grouped[section].map(item => (
                      <div key={item.id} className="flex flex-col gap-3 pb-3 min-w-[158px] max-w-[220px]">
                        <div
                          className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-xl"
                          style={{ backgroundImage: `url(${item.image ? `${API_URL}/uploads/${item.image}` : ''})` }}
                        ></div>
                        <div>
                          <p className="text-white text-base font-medium">{item.title}</p>
                          <p className="text-[#be9db3] text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-[#be9db3]">No cards yet.</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default WomenCornerPage;
