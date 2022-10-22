<script setup lang="ts">
const url = computed(() => exportCalendarIcs())
</script>

<template>
  <div>
    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
    <a
      id="menu-item-0"
      :href="url"
      class="text-gray-700 no-underline font-sans hover:bg-gray-100 group flex items-center px-4 py-2 text-sm"
      role="menuitem"
      tabindex="-1"
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
  </div>
</template>
