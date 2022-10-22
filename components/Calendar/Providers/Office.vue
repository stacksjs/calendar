<script setup lang="ts">
const url = computed(() => exportCalendarIcs())
</script>

<template>
  <div>
    <a
      id="menu-item-0"
      :href="url"
      class="text-gray-700 no-underline font-sans hover:bg-gray-100 group flex items-center px-4 py-2 text-sm"
      role="menuitem"
      tabindex="-1"
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
  </div>
</template>
