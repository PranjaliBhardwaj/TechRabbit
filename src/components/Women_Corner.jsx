<html>
  <head>
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="" />
    <link
      rel="stylesheet"
      as="style"
      onload="this.rel='stylesheet'"
      href="https://fonts.googleapis.com/css2?display=swap&amp;family=Noto+Sans%3Awght%40400%3B500%3B700%3B900&amp;family=Space+Grotesk%3Awght%40400%3B500%3B700"
    />

    <title>Stitch Design</title>
    <link rel="icon" type="image/x-icon" href="data:image/x-icon;base64," />

    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  </head>
  <body>
    <div class="relative flex size-full min-h-screen flex-col bg-[#1f141b] dark group/design-root overflow-x-hidden" style='font-family: "Space Grotesk", "Noto Sans", sans-serif;'>
      <div class="layout-container flex h-full grow flex-col">
        <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#402b39] px-10 py-3">
          <div class="flex items-center gap-8">
            <div class="flex items-center gap-4 text-white">
              <div class="size-4">
                <img src="/logo.png" alt="Logo" class="w-6 h-6" />
              </div>
              <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">&nbsp;</h2>
            </div>
            <nav class="flex items-center gap-9 text-sm font-medium text-white">
              <a href="/" className="hover:text-accent transition-colors">Home</a>
              <a href="/chatbot" className="hover:text-accent transition-colors">ChatBot</a>
              <a href="/women-corner" className="hover:text-accent transition-colors">Women Corner</a>
              <a href="/courses-hub" className="hover:text-accent transition-colors">Courses</a>
            </nav>
          </div>
          <div class="flex flex-1 justify-end gap-8">
            <label class="flex flex-col min-w-40 !h-10 max-w-64">
              <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div
                  class="text-[#be9db3] flex border-none bg-[#402b39] items-center justify-center pl-4 rounded-l-xl border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                    ></path>
                  </svg>
                </div>
                <input
                  placeholder="Search"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#402b39] focus:border-none h-full placeholder:text-[#be9db3] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  value=""
                />
              </div>
            </label>
            <div
              class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBrAQ8LR-x1F4LgeeS1AF82Z85PUi3CaGU5fx5lxCcPpWosNss9IAr2BBHidj4M9L_v2U_xUw3gwwD-sNi9Gtu9ZZdIwRgC4Hx8xBsnn3jYtifxUFtrQg1UJCj7bY6wubwjkxkELoeE2tnYz2wXMAFOs873DhOkH1-iA2zPVXFl0UC60cPZdhPD2grYLzIBwvgDpmw8V5cUYabtPPZmDYzQkXw8fJYfBfBW0EaFKWspP61838l8E4Tk44a3MmjcmXCRj2dBsVdApQLC");'
            ></div>
          </div>
        </header>
        <div class="px-40 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div class="flex flex-wrap justify-between gap-3 p-4">
              <div class="flex min-w-72 flex-col gap-3">
                <p class="text-white tracking-light text-[32px] font-bold leading-tight">Women's Corner</p>
                <p class="text-[#be9db3] text-sm font-normal leading-normal">Empowering women in tech with resources and opportunities.</p>
              </div>
            </div>
            <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Scholarships</h2>
            <div class="p-4">
              <div class="flex items-stretch justify-between gap-4 rounded-xl">
                <div class="flex flex-col gap-1 flex-[2_2_0px]">
                  <p class="text-white text-base font-bold leading-tight">TechRabbit Women in Tech Scholarship</p>
                  <p class="text-[#be9db3] text-sm font-normal leading-normal">A scholarship program aimed at supporting women pursuing careers in technology.</p>
                </div>
                <div
                  class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTpI9G1MiggYA9BKvKwddLeywtpXu-JNmHcrSSjt_qbTeXQp0Ze9QU7cxe_ZSFdfMYx5PFlmUjNhwylARJJPPADxeOi9zSEKeB78p7CQ0m9JYId9shhvcZjPTJDi1_6hvXf8FCWZpMO4YGAwion74Osr0pAW9-g7yi5o8DFcdpcxldGXTDloNIov2gUSUO-eN36Lfeh0wVCqq7S7RD515cq7jyhGuAm1I1GGzPy3T4QJTsjMvTEwL9XBMXG7OGYfXcGdocHVGpNe96");'
                ></div>
              </div>
            </div>
            <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Internships</h2>
            <div class="p-4">
              <div class="flex items-stretch justify-between gap-4 rounded-xl">
                <div class="flex flex-col gap-1 flex-[2_2_0px]">
                  <p class="text-white text-base font-bold leading-tight">TechRabbit Internship Program</p>
                  <p class="text-[#be9db3] text-sm font-normal leading-normal">An internship program designed to provide hands-on experience in various tech fields.</p>
                </div>
                <div
                  class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBNzWWOlHNagIGwQnAzV_Lca5dMv0K-uIGrFQKVmzADZDHF1J8K3-e2nNoeBqX6EFGcZ2To5elNR1oZS3ioTkERFpWw0Jp05mYD7WQG4fn7llblXEMlVfycq87esyCdbWdwPoAZgPNwfNve0X_ey7YqaVrKtSK5MVGzsVGat64T_ckyQ_2WpJAPTc91LgPrqSrUbJ99-Jdvkxz1AZuxx-uP5Y0gvHSIAqezGVBNZ2EU6IGBt6auce7pwzRux0Kz54LQeggkhXMJQRUw");'
                ></div>
              </div>
            </div>
            <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Mentorship</h2>
            <div class="p-4">
              <div class="flex items-stretch justify-between gap-4 rounded-xl">
                <div class="flex flex-col gap-1 flex-[2_2_0px]">
                  <p class="text-white text-base font-bold leading-tight">TechRabbit Mentorship Program</p>
                  <p class="text-[#be9db3] text-sm font-normal leading-normal">A mentorship program connecting experienced professionals with women entering the tech industry.</p>
                </div>
                <div
                  class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6teJzZJMJET47gveQhqS5AEbrsKCfx8Y8NA6X3MGso0IkafBANpbqviGMQWJewGaeCiAbPCTXLL6k_-7adFx4Jte-87ae491MwFi4TYZ-fDTaJfcR2Uw0iNQBg0cDY6cR6EueqqV8Vpp6qMyNIe3ErFzqq-2z44GRCDWfT3GgKbMPInsH6K5oRKwDpdycOYs9Q8P8Wmsc7dU41rs2f-cl34bWnabs_-4Q2PNW1fHl7yR1U5jRZw3Rn5OG-_Q4v7JEk7FrWdfmnOUT");'
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
