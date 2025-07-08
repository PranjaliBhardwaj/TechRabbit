import React from "react";
import "../../tailwind.css";

const Explore = () => {
  const cardData = [
    {
      title: "Scholarships",
      description: "Explore financial aid options to support your educational journey.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA3C1URVE-C9ryo0ftOv4cXxJh1Xtjd9miCPYUwMOXTiBm4jfGBuZNrfkDtdTitsnMeBtJv8gY5CobY_UOfs29-Z4fKyj5scjaFVTVz-ZhAZyWG8yuLZXHKQDXVJgeR5VYIi9FESQDrbzDaSpFoXSF4XF2Xi3CO4tIaRqVg9jtd0G0Ts47dXw65_CdYd4XQOI9l6nSkexNmCg4h40R_7Mae0bIBbbWTisvUicQMMzxU3DOcYi4mMgxubiA6ZntHfi2PFYWVOQdSOd91",
    },
    {
      title: "Courses",
      description: "Browse a wide range of courses to enhance your skills and knowledge.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAEWOy7mzWKN7a9b08vKNJX-yuMsXbbl3GteW61bpYEd_8Yng5W2DrY_Ig_UDyii1kyduqeCX2isTRAwF_IEu4kfg8Oh7j_-p668aGWYe4SYW7x6lE9Bvn4hFdNRiSw8vxmeiAljRuYtLIGQ12jVFSK86tI_PYcNOhnYYNkhJ2dV5JorSN1-PduL3dP7UYtWij1h3hf66_FwjMpisdCnEYkPoSimR3bNT0yUD5c6Tezc4fPktUFXGcKmZ0_DdQCvOJq5nstC6HubQZd",
    },
    {
      title: "Internships",
      description: "Discover internship opportunities to gain practical experience in your field.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAD65kIkBX0Lzgaje2JKU-iMykPRRgbfP2cdejWDswe9MhiaEaW2uZwkhZeIKPajIboCV2X67k6Fs2him-JtWszGkW6PQRW6EN7Ig9Vl3W7j_i2qp0jXPf9W4I3sVfopYWEzI6HpGiRUWbht-MRpP7eEg77QhoTYDxE-MDpNLE_dDlf8id_-tbwTMUFaJpo8qdQTnxnkAkSxhUUKNtfteLWuByB0c2FKRVXr_NCoUknV05BkC--pafdiLbnZu-9b6rG22WITMXKMcRY",
    },
    {
      title: "Open Source Programs",
      description: "Contribute to open source projects and collaborate with developers worldwide.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDz508rmEe6lTfCTIJEaZ31uuX2Zzu5YKeGxiu4sdASJuHdNg8s2VK65usO4CcStc6rM2HrVRcSzG8NEJQBTSKohl8FEHSANOhImpKqTdX3GSGl-OeFF56Xk-ckZ7p0UDhJE2j7RaoaUccxHQmwCn6PZr1R9DDlot7TMSOpMonOzj3lGkCnzHkLQ9jFSn3dQS6RipA2Kjx1A7qbZJ8_sHukQZj2n1aW5q3qsVgkBHtxNDa52C4L2Hn-5jB5GDaDS4CaS-QQW_-a9NlK",
    },
    {
      title: "Extracurricular Activities",
      description: "Engage in extracurricular activities to broaden your horizons and network.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuABMaH5LYDAImulpIsFgtv75uQF8HJSPuEInSSGZF4wHfAEaI5gTJwuoYmBh45StnCy-3_4vMLUs_1okx993h-7CQbgn32hHzMd8Md6_ONCgtvzplsqLJ4hqGjRVH6ZGKthKSRSdBbw5_S9gGNHKnDEArbsVdnmpF_1npu0QFUNM7V0C3fa9Ad9xsJ27oVMP29molmMBMZiA5LB1yuXH4U50x02VLIpIf0-OpcRSVlMhIFJEPhDWfngdZUUnO97u2hiQ3PobaDW6q5B",
    },
  ];

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#14181f] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#2b3240] px-10 py-3">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-white">
            <img src="/logo.png" alt="Logo" className="w-6 h-6" />
          </div>
          <nav className="flex items-center gap-9 text-sm font-medium text-white">
            <a href="/" className="hover:text-accent transition-colors">Home</a>
            <a href="/chatbot" className="hover:text-accent transition-colors">ChatBot</a>
            <a href="/women-corner" className="hover:text-accent transition-colors">Women Corner</a>
            <a href="/courses-hub" className="hover:text-accent transition-colors">Courses</a>
          </nav>
        </div>

        <div className="flex flex-1 justify-end gap-8">
          <label className="flex flex-col min-w-40 h-10 max-w-64">
            <div className="flex w-full h-full items-stretch rounded-xl">
              <div className="text-[#9da8be] flex items-center justify-center pl-4 bg-[#2b3240] rounded-l-xl">
                🔍
              </div>
              <input
                placeholder="Search"
                className="form-input flex w-full text-white bg-[#2b3240] h-full px-4 placeholder:text-[#9da8be] border-none rounded-xl rounded-l-none focus:outline-0"
              />
            </div>
          </label>
          <button className="flex items-center justify-center h-10 px-2.5 gap-2 text-sm font-bold text-white bg-[#2b3240] rounded-xl">
            🔔
          </button>
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBeTObt_P5ZmjLH5FpIwr3ScKVKuOc31pULLVk4SHYnkcQy5TQALOtWdWwHC6DOwIUR9_BbW9rjlA8ERrhpT5pdKtmeFEMhDi402EQTwAyUha5cv3R-06gZF43xyhJi34mJpmVGeB03Thrr_qlRTiE4N15JAadISGizd00HVanoKtFjg5Hhq64uLsTqVliboI-Ao43KwX5endKuZRvD4XwEzMNGUMMgD0_7fCZvW7i8BuG5ly1n_2tR7rJ3joFCU_CUpQ-utSiW6KA")',
            }}
          ></div>
        </div>
      </header>

      {/* Main */}
      <main className="px-40 py-5 flex flex-1 justify-center">
        <div className="flex flex-col max-w-[960px] w-full">
          <div className="p-4">
            <p className="text-white text-[32px] font-bold">Explore</p>
          </div>

          <h2 className="text-white text-[22px] font-bold px-4 pb-3 pt-5">Opportunities</h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
            {cardData.map((card, index) => (
              <div key={index} className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-xl"
                  style={{ backgroundImage: `url("${card.image}")` }}
                ></div>
                <div>
                  <p className="text-white text-base font-medium">{card.title}</p>
                  <p className="text-[#9da8be] text-sm">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Explore;
