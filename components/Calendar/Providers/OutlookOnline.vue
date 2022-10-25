<script setup lang="ts">
const url = computed(() => exportCalendarOutlook())
</script>

<template>
  <div>
    <a
      id="menu-item-0"
      :href="url"
      class="text-gray-700 no-underline font-sans hover:bg-gray-100 group flex items-center px-4 py-2 text-sm"
      role="menuitem"
      tabindex="-1"
      target="_blank"
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
  </div>
</template>
