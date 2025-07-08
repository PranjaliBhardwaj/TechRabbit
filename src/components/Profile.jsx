import "../../tailwind.css";
import React from "react";

const ProfilePage = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#151122] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-80">
            <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#151122] p-4">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxP5Gf7Dc6iylpsZ8V_sYm74w0nRrSuOrfmtxEGbCWA17JXYnfksQwf0_BgLBXhyuJec-iffbuaNLgALsuaavvGsNn9ia1jK4ypInk3Z9k8YTyl07gGGM4qnYmKuZDTmsAK_Dauw-LeeOA6c6LTk4eXWRt6hczhrdVXYB5BQjynHGrLgB2_DkLWx5gEY-dDIqJdqLAKXMNFy92IafjUh4sKpfO77x9GQ3-agRIEhDaDXyQid6Am1MqCfQ4ZVaenxK6nB9eIBNOLBkz')" }}
                  ></div>
                  <img src="/logo.png" alt="Logo" className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { icon: "House", label: "Home" },
                    { icon: "Video", label: "Courses" },
                    { icon: "Bookmark", label: "Resources" },
                    { icon: "Users", label: "ChatBot" },
                    { icon: "User", label: "Profile", active: true },
                  ].map(({ label, active }, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 px-3 py-2 ${
                        active ? "rounded-full bg-[#2c2447]" : ""
                      }`}
                    >
                      <div className="text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="..." />
                        </svg>
                      </div>
                      <p className="text-white text-sm font-medium leading-normal">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                My Profile
              </p>
            </div>

            <div className="flex p-4">
              <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between md:items-center">
                <div className="flex gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7OHgMG2ZXqjBFTKvKq-BiWQS-WJ6aVjAatGoOzLSkbV2auUH1UWe80d7uJKAp0qZo--uuTayRxJuUWj06dfFxzrN_RLNhLOI-rncgVcO1TNt4kDsgpBzXusvPD1G8FCdl7YKHD5DamzFoDcNFW6YvuiCghGMjdhpDcOaesoYLt8DI6vZbo-cvYKkYlaiEgzUdG84f--C98V6alj5S2RX6NiElX3FQXet8IVB_8HGhB8LmudI-CM3A5tqyncm3jos5KH1Qm4b1TlzL')" }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white text-[22px] font-bold">Ethan Carter</p>
                    <p className="text-[#9f93c8] text-base">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-white text-[22px] font-bold px-4 pb-3 pt-5">Enrolled Courses</h2>
            <div className="flex overflow-x-auto gap-3 p-4">
              {["Advanced Software Development", "Data Science Fundamentals", "Cloud Computing Essentials"].map(
                (title, idx) => (
                  <div
                    key={idx}
                    className="flex h-full flex-col gap-4 rounded-lg min-w-40"
                  >
                    <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                      style={{ backgroundImage: `url('https://via.placeholder.com/150?text=Course+${idx + 1}')` }}
                    ></div>
                    <div>
                      <p className="text-white text-base font-medium leading-normal">{title}</p>
                      <p className="text-[#9f93c8] text-sm">Description for {title.toLowerCase()}</p>
                    </div>
                  </div>
                )
              )}
            </div>

            <h2 className="text-white text-[22px] font-bold px-4 pb-3 pt-5">Settings</h2>
            {[
              { title: "Account Settings", subtitle: "Manage your account details" },
              { title: "Notifications", subtitle: "Customize your notification preferences" },
              { title: "Security", subtitle: "Change your password" },
            ].map(({ title, subtitle }, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-[#151122] px-4 min-h-[72px] py-2 justify-between"
              >
                <div className="flex flex-col justify-center">
                  <p className="text-white text-base font-medium leading-normal line-clamp-1">{title}</p>
                  <p className="text-[#9f93c8] text-sm line-clamp-2">{subtitle}</p>
                </div>
                <div className="shrink-0 text-white size-7 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                  </svg>
                </div>
              </div>
            ))}

            <div className="flex px-4 py-3 justify-start">
              <button className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-full h-10 px-4 bg-[#2c2447] text-white text-sm font-bold">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;