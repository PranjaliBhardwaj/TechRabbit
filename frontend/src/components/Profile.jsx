import "../../tailwind.css";
import React from "react";
import Header from "./Header";

const ProfilePage = () => {
  const profileImg = `${window.location.origin}/default_bunny.jpg`;
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#151122] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <Header />
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
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
                    style={{ backgroundImage: `url('${profileImg}')` }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white text-[22px] font-bold">Ethan Carter</p>
                    <p className="text-[#9f93c8] text-base">Software Engineer</p>
                  </div>
                </div>
              </div>
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