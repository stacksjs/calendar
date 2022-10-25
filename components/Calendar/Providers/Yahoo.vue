<script setup lang="ts">
const url = computed(() => exportCalendarYahoo())
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
</template>
