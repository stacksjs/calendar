<script setup lang="ts">
import { isString } from '@vueuse/core'

interface Props {
  types: string | string[]
}

const {
  types,
} = defineProps<Props>()

const calendarTypes = computed((): string[] => {
  if (isString(types))
    return types.split(',').map(type => type.trim()).map(type => type.toLowerCase())
  return types
})
</script>

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

      <Dropdown :calendar-types="calendarTypes" />
    </div>
  </div>
</template>
