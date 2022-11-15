<script setup lang="ts">
interface Props {
  calendarTypes: string[]
}

const {
  calendarTypes,
} = defineProps<Props>()

function isCalendarIncluded(type: string) {
  return calendarTypes.includes(type.toLowerCase())
}
</script>

<template>
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
      <Ics v-if="isCalendarIncluded('ics') || isCalendarIncluded('apple')" />
      <Google v-if="isCalendarIncluded('google')" />
      <Outlook v-if="isCalendarIncluded('outlook')" />
      <Office v-if="isCalendarIncluded('office')" />
      <OutlookOnline v-if="isCalendarIncluded('outlook')" />
      <Yahoo v-if="isCalendarIncluded('yahoo')" />
    </div>
  </div>
</template>
