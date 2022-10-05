<!--
  This file is used for demo purposes of your component library only.
  All of your components & functions are automatically imported.
  It is rendered when you run `pnpm artisan dev:components`.
-->
<template>
  <div class="flex justify-center">
    <div class="relative inline-block text-left">
      <div>
        <button
          id="menu-button"
          type="button"
          class="flex items-center w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Add to Calendar
          <!-- Heroicon name: mini/chevron-down -->
          <svg
            class="w-6 h-6 pl-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          /></svg>
        </button>
      </div>

      <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
      <div
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div
          class="py-1"
          role="none"
        >
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <a
            id="menu-item-0"
            href="#"
            class="text-gray-700 no-underline font-sans hover:bg-gray-100 group flex items-center px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            @click="exportCalendarApple"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496.255 608.728"
              class="w-5 h-5 mr-4"
            ><path
              d="M273.81 52.973C313.806.257 369.41 0 369.41 0s8.271 49.562-31.463 97.306c-42.426 50.98-90.649 42.638-90.649 42.638s-9.055-40.094 26.512-86.971zM252.385 174.662c20.576 0 58.764-28.284 108.471-28.284 85.562 0 119.222 60.883 119.222 60.883s-65.833 33.659-65.833 115.331c0 92.133 82.01 123.885 82.01 123.885s-57.328 161.357-134.762 161.357c-35.565 0-63.215-23.967-100.688-23.967-38.188 0-76.084 24.861-100.766 24.861C89.33 608.73 0 455.666 0 332.628c0-121.052 75.612-184.554 146.533-184.554 46.105 0 81.883 26.588 105.852 26.588z"
              fill="#999"
            /></svg>
            Apple
          </a>

          <a
            id="menu-item-0"
            href="#"
            class="text-gray-700 no-underline font-sans hover:bg-gray-100 group flex items-center px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            @click="demo"
          >
            <svg
              viewBox="0 0 256 262"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              class="w-5 h-5 mr-4"
            ><path
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              fill="#4285F4"
            /> <path
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              fill="#34A853"
            /> <path
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              fill="#FBBC05"
            /> <path
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              fill="#EB4335"
            /></svg>
            Google
            <span class="text-xs pl-2 text-gray-400 font-italic">(Online)</span>
          </a>
          <a
            id="menu-item-0"
            href="#"
            class="text-gray-700 no-underline font-sans hover:bg-gray-100 group flex items-center px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            @click="demo"
          >
            <svg
              enable-background="new 0 0 2075 2499.8"
              viewBox="0 0 2075 2499.8"
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-4"
            ><path
              d="m0 2016.6v-1519.8l1344.4-496.8 730.6 233.7v2045.9l-730.6 220.3-1344.4-483.3 1344.4 161.8v-1769.2l-876.8 204.6v1198.3z"
              fill="#eb3c00"
            /></svg>
            Office 365
          </a>
          <a
            id="menu-item-0"
            href="#"
            class="text-gray-700 no-underline font-sans hover:bg-gray-100 group flex items-center px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            @click="demo"
          >
            <svg
              id="Layer_1"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 1024 1024"
              xml:space="preserve"
              class="w-5 h-5 mr-4"
            ><g><title>Layer 1</title> <path
              fill="#DAA603"
              d="M644.9,764.4V492.7c19.3,13.3,37.4,25.6,55.4,38c16.2,11.1,18.9,11,35.6-0.1c92.5-61.5,185-122.9,277.5-184.4   c2.8-1.9,5.7-3.6,9.8-6.1c0.3,4.2,0.8,7.4,0.8,10.5c0,118.2,0.1,236.4,0,354.7c0,39.3-19.9,59.1-59,59.1c-102.8,0-205.6,0-308.4,0   C652.9,764.4,649.2,764.4,644.9,764.4L644.9,764.4z"
            /> <path
              fill="#DAA603"
              d="M645.6,216.9h10.5c108.6,0,217.1,0,325.7,0c19.4,0,34.4,11.9,40.5,30.5c2.7,8.2,0,12.2-6.7,16.6   c-84.1,56.3-168,112.9-252,169.4c-12,8.1-24.1,15.9-35.9,24.3c-6.4,4.6-12.2,4.8-18.8,0.5c-19.2-12.4-38.7-24.2-57.8-36.7   c-3.2-2.1-6.5-6.9-6.5-10.4c-0.3-63.5-0.2-127-0.1-190.5C644.5,219.8,644.9,219.1,645.6,216.9L645.6,216.9z"
            /> <path
              fill="#DAA603"
              d="M596.7,1024C397.6,982.3,199.3,940.8,0.3,899.2v-13.1c0-252.5,0.1-505-0.3-757.5c0-10.5,2.8-14.1,13-16   c159.1-30.4,318.2-61.2,477.3-92C525.4,13.7,560.5,7,596.7,0L596.7,1024L596.7,1024z M438,511c-0.4-41.6-6.1-80-26.7-114.9   c-16.6-28.1-39-49.4-71.3-58.6c-62.8-17.9-122.8,11.5-152.4,75c-18.9,40.7-23,83.9-19.3,128.1c3.2,38.3,14.3,73.7,39,104   c49.1,60.2,138.4,60.6,188.2,0.8C428.4,605.8,437.4,558.7,438,511L438,511z"
            /> <path
              fill="#DAA603"
              d="M232.9,511.9c-0.1-29.7,3.9-58.4,20.7-83.8c15.5-23.5,39-33.1,64.9-26.6c20.1,5,32.3,19.3,40.4,37.2   c13.8,30.7,16.2,63.3,12.1,95.9c-2.3,18.1-7.5,36.5-14.8,53.2c-9.5,21.6-27.8,34-52.2,34.5c-24.6,0.5-41.7-12.2-53.6-32.6   C236.3,565.8,232.9,539.2,232.9,511.9L232.9,511.9z"
            /></g></svg>
            Outlook
          </a>

          <a
            id="menu-item-0"
            href="#"
            class="text-gray-700 no-underline font-sans hover:bg-gray-100 group flex items-center px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            @click="demo"
          >
            <svg
              clip-rule="evenodd"
              fill-rule="evenodd"
              image-rendering="optimizeQuality"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              viewBox="0 0 6876 6994"
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-4"
            ><path
              d="M0 779L4033 0l-14 6994L0 6160zm1430 3632c-305-357-390-918-244-1384 203-648 718-867 1149-717 246 86 465 293 582 610 56 152 86 326 88 503 4 318-106 692-324 953-335 400-903 441-1250 35zm314-339c-150-223-191-573-120-864 99-404 352-541 563-447 121 54 228 183 285 381 27 95 42 203 43 314 2 198-52 432-159 595-164 250-442 275-612 22zm2552-2598h2341c131 0 238 107 238 238v86L5035 3039c-24 16-83 62-132 93-72 47-77 38-153-5-117-65-319-203-455-297V1474zm2580 875v2504c0 200-164 365-365 365H4296V3366c133 88 310 204 419 271 88 54 104 79 202 22 45-26 89-60 119-80l1840-1229z"
              fill="#0072c6"
            /></svg>
            Outlook.com
            <span class="text-xs pl-2 text-gray-400 font-italic">(Online)</span>
          </a>

          <a
            id="menu-item-0"
            href="#"
            class="text-gray-700 no-underline font-sans hover:bg-gray-100 group flex items-center px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            @click="demo"
          >
            <svg
              id="Layer_1"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 1792 1792"
              xml:space="preserve"
              class="w-5 h-5 mr-4 text-purple"
            ><g><title>Layer 1</title> <path
              d="M987,957l13,707c-41.3-7.3-76.3-11-105-11c-27.3,0-62.3,3.7-105,11l13-707c-26.7-46-82.8-144.5-168.5-295.5   S476.7,385.7,418,287S299,92.7,237,0c38.7,10,74.7,15,108,15c28.7,0,65.7-5,111-15c42,74,86.5,150.5,133.5,229.5   s102.7,171.2,167,276.5S867,687,895,733c24.7-40.7,61.2-99.8,109.5-177.5c48.3-77.7,87.5-141,117.5-190s65-107.7,105-176   S1302.7,58,1334,0c36,9.3,71.7,14,107,14c37.3,0,75.3-4.7,114-14c-18.7,26-38.7,55.5-60,88.5s-37.8,59.2-49.5,78.5   s-30.5,51.3-56.5,96s-42.3,72.7-49,84C1242.7,512.3,1125,715.7,987,957z"
              fill="currentColor"
              class="st1"
            /></g></svg>
            Yahoo
            <span class="text-xs pl-2 text-gray-400 font-italic">(Online)</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
