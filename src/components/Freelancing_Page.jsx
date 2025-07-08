import React from "react";
import "../../tailwind.css";

const FreelancingPage = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111722] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div className="flex h-full grow flex-col">
        <header className="flex items-center justify-between border-b border-[#243047] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <img src="/logo.png" alt="Logo" className="w-6 h-6" />
            <h2 className="text-lg font-bold tracking-[-0.015em]">&nbsp;</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <nav className="flex items-center gap-9 text-sm font-medium text-white">
              <a href="/" className="hover:text-accent transition-colors">Home</a>
              <a href="/chatbot" className="hover:text-accent transition-colors">ChatBot</a>
              <a href="/women-corner" className="hover:text-accent transition-colors">Women Corner</a>
              <a href="/courses-hub" className="hover:text-accent transition-colors">Courses</a>
            </nav>
            <button className="min-w-[84px] h-10 px-4 bg-[#195de5] text-white font-bold rounded-lg text-sm">
              Get Started
            </button>
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-10"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkLMTRnA57CMYrIRbIkOYcGma37fy7NAycaiP_Vp98LZoCDXEVXwZTCJi3pkJOyKXJu0e4jvjGJ2NXfXJDsdRGBRxHUIjNGspHSQxZFKK0vczjJH9s9soIpEQbkmoclAqqXXvTHkFxtN_rWzEDNrDRYp608oAHQBDdnpEmjt6hDni4NHsf2ZUWmDzx-kUEve-qwiixzlD4rBQ3c_pLtxauuFVUqsBcY4V1PYrG3ptupCT812fuzCq6UX--0Qu6peu4TmPLP0tIcxwp')` }}
            ></div>
          </div>
        </header>

        <main className="px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-[960px] w-full">
            <section className="p-4">
              <div className="flex flex-col min-w-72 gap-3">
                <p className="text-white text-[32px] font-bold leading-tight">Freelancing</p>
                <p className="text-[#93a5c8] text-sm">Get your project starting from just 1999</p>
              </div>
            </section>

            <h2 className="text-white text-[22px] font-bold tracking-[-0.015em] px-4 pt-5 pb-3">Services</h2>
            {services.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}

            <h2 className="text-white text-[22px] font-bold tracking-[-0.015em] px-4 pt-5 pb-3">Offers</h2>
            {offers.map((offer, i) => (
              <ServiceCard key={i} {...offer} />
            ))}

            <h2 className="text-white text-[22px] font-bold tracking-[-0.015em] px-4 pt-5 pb-3">Contact Us</h2>
            <div className="flex max-w-[480px] flex-wrap gap-4 px-4 py-3">
              <input className="form-input h-14 rounded-lg bg-[#243047] p-4 text-white placeholder-[#93a5c8] w-full" placeholder="Your Name" />
              <input className="form-input h-14 rounded-lg bg-[#243047] p-4 text-white placeholder-[#93a5c8] w-full" placeholder="Your Email" />
              <textarea className="form-input min-h-36 rounded-lg bg-[#243047] p-4 text-white placeholder-[#93a5c8] w-full" placeholder="Your Project Details"></textarea>
            </div>
            <div className="flex px-4 py-3 justify-end">
              <button className="h-10 px-4 bg-[#195de5] text-white text-sm font-bold rounded-lg">
                Submit
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const ServiceCard = ({ title, description, image }) => (
  <div className="p-4">
    <div className="flex items-stretch justify-between gap-4 rounded-lg">
      <div className="flex flex-col gap-1 flex-[2_2_0px]">
        <p className="text-white text-base font-bold leading-tight">{title}</p>
        <p className="text-[#93a5c8] text-sm font-normal leading-normal">{description}</p>
      </div>
      <div
        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
        style={{ backgroundImage: `url('${image}')` }}
      ></div>
    </div>
  </div>
);

const services = [
  {
    title: "Web Development",
    description: "Crafting responsive and dynamic websites tailored to your business needs.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQQR9xu949G7hiqqWTZRdWPGmbxRJEEmuetybouWGtO9RGsLH_025dB21Nvzxf_UxIiXmRr3BgM18Cr20H9afJbQB5_IjbPc3vRHGozm21Yu6l_tMcCSYtefbvu5M_leTkEkektRZy5SkzwODyNgIPzlp-WkfhiKW0QnxA-M9nQrlsfaKR0riLkmgABwInOuWYv8PtsrxGcin2btIAodoa4lotTyl6p3I6euPk-1AXZjU9pQ03r_JhDSiX1DiQ4LwTImol4R-qDp-s",
  },
  {
    title: "Mobile App Development",
    description: "Building native and cross-platform mobile applications for iOS and Android.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfA7gEEvz_Y_Q1VSlQnsqmuWieeeFkDkuvIvVTfJKbFM2xptdZIyvDROClK-Qj99O-kM0a2A-nsZBUL25DQCp75Ms3hrd3Vr-X20Pb3-OObRgdQNiZgPBintULglrEDmSXPWdb_fC9vhMeWC6fuAvdrxHzLPE7XOMNfOiv-AZgYZR8orZUqYHlSEFc8szSUni0k7GMaTu92psQ9WhkUzGvK4VNl04HSAZWkLcyIVyPJei5I-RDirI2bDKTxyuvxbeH_tNh7qG4NyT9",
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing user interfaces and experiences.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNtBMwC95yO56xy4Uw3RGve4Ay3KySVKlnMiK4ccO7s84fo29bY3sU0AzKsZ5zp7JQswZeKTxz2GvpMPT1hGyaJuP1w2R2If4hCFomFiwtIruH2FPZAw2CJsdF-g3gU-maTXZUBP7jnj_Zj0R4XsTR5iqkZ215F1wOcPGmdW0trTnXH1fWuLkT7aQhkcVIHDxZm0X2vv5pMFQ_jeJhaVPW6bjbqmRB_HFfGOuXhha33M83oC5AP08heA-mIZJ9gkIwEA11jfPitEfz",
  },
  {
    title: "Data Analysis",
    description: "Extracting insights from data to drive informed decision-making.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5WXvOKJa30u2yzskQvQiLbxmMTVMXTLi7cjJT2jGfeCECMcG34duON_cNiOXe_ADWLu_bMn7w0SpH_WJJ-hpHMjjcKyJHrz7P-vjez6W5qR10dCaeD1LbW1E6NHLrcv5RFX0rXpLCNVWN9xKbB_lM1T-mEQB_XIFgFUabw8-YbhKX1cpXyw_H8nsVpdLzxmN3MRtpZV-JI8YQAnc6D0J-f1VF_JvpsG4nAe4znEO9IEH8ol5uj3Qoi-XRXOrcYvQacQ7mYQXaRPoG",
  },
];

const offers = [
  {
    title: "Referral Discount",
    description: "Refer a friend and get a 10% discount on your project.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbxL0369q4g_6BuL_nqw7fsJlKzkxf3UQT0q00XWzaHxXOlqQd8BX4YEWz-pZ30AWva9-0jBk3cbElWSosfl2SLapikXArQLI75bHrOIq5CQNKK1IXR366EpHiI7hMAunLjMjcB1K3PQ5f0aqXwLUZBXOK9dM61_uV9jZT9Y7q1JRjbHtkC5H2t8TLl_CTR4qomBiYjKaTtSjFDMBwzTjRjGuN-DqMeRypSNYF_4Fj-zMgFfFsvYYcuDxkC3WqoWlMIs479Lwe6IoL",
  },
  {
    title: "Contribution Discount",
    description: "Contribute to our open-source projects and get a 5% discount.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDeyz5UoxNe1cJJ_yL0e9nN8uUv4x0cc6YoU1fRwV72NCx0H1DCz8txmFLBu0UL9bsykcZWTQ-fNyFUWuu0VV8o-2HPHxHzaE-jVLGugQF1VcpLLQM2eSsfpOGKudNdp1bF2ZfcsYCX5geJ7OL_8LuNLOdlFMusFy_cniLAT1Dv1eFcidqupnazEZRFb7QsKEVRwAW5HfN_-0tOslP0rQORJ46jfGdHKzWg2esbjb7KWipx9zhvE4nUVWVZgZNhcPqrtu63i5k-g2yc",
  },
];

export default FreelancingPage;