<script setup lang="ts">
interface Props {
  type: string
}

const {
  type,
} = defineProps<Props>()

const emit = defineEmits<{
  (e: 'nextDay'): void
  (e: 'nextWeek'): void
  (e: 'nextMonth'): void
  (e: 'previousDay'): void
  (e: 'previousWeek'): void
  (e: 'previousMonth'): void
}>()

const { nextMonth, previousMonth, toggleTodayMonth, toggleToday, nextWeek, previousWeek, toggleTodayWeek, nextDay, previousDay } = useCalendar()

function next() {
  if (type === 'month') {
    nextMonth()

    emit('nextMonth')
  }

  if (type === 'week') {
    nextWeek()

    emit('nextWeek')
  }

  if (type === 'day') {
    nextDay()

    emit('nextDay')
  }
}

function previous() {
  if (type === 'month') {
    previousMonth()

    emit('previousMonth')
  }

  if (type === 'week') {
    previousWeek()

    emit('previousWeek')
  }

  if (type === 'day') {
    previousDay()

    emit('previousDay')
  }
}

function today() {
  if (type === 'month')
    toggleTodayMonth()

  if (type === 'week')
    toggleTodayWeek()

  if (type === 'day')
    toggleToday()
}
</script>

<template>
  <div>
    <div class="flex items-center">
      <div class="flex items-center rounded-md shadow-sm md:items-stretch">
        <button
          type="button"
          class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
          @click="previous"
        >
          <span class="sr-only">Previous month</span>
          <!-- Heroicon name: mini/chevron-left -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          type="button"
          class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
          @click="today"
        >
          Today
        </button>
        <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
        <button
          type="button"
          class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
          @click="next"
        >
          <span class="sr-only">Next month</span>
          <!-- Heroicon name: mini/chevron-right -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div class="hidden md:ml-4 md:flex md:items-center">
        <div class="relative">
          <button
            id="menu-button"
            type="button"
            class="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            aria-expanded="false"
            aria-haspopup="true"
          >
            Month view
            <!-- Heroicon name: mini/chevron-down -->
            <svg
              class="ml-2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

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
            class="absolute hidden right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                class="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabindex="-1"
              >Day view</a>
              <a
                id="menu-item-1"
                href="#"
                class="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabindex="-1"
              >Week view</a>
              <a
                id="menu-item-2"
                href="#"
                class="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabindex="-1"
              >Month view</a>
              <a
                id="menu-item-3"
                href="#"
                class="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabindex="-1"
              >Year view</a>
            </div>
          </div>
        </div>
        <div class="ml-6 h-6 w-px bg-gray-300" />
        <button
          type="button"
          class="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add event
        </button>
      </div>
      <div class="relative ml-6 md:hidden">
        <button
          id="menu-0-button"
          type="button"
          class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span class="sr-only">Open menu</span>
          <!-- Heroicon name: mini/ellipsis-horizontal -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
          </svg>
        </button>

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
          class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-0-button"
          tabindex="-1"
        >
          <div
            class="py-1"
            role="none"
          >
            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
            <a
              id="menu-0-item-0"
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
            >Create event</a>
          </div>
          <div
            class="py-1"
            role="none"
          >
            <a
              id="menu-0-item-1"
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
            >Go to today</a>
          </div>
          <div
            class="py-1"
            role="none"
          >
            <a
              id="menu-0-item-2"
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
            >Day view</a>
            <a
              id="menu-0-item-3"
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
            >Week view</a>
            <a
              id="menu-0-item-4"
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
            >Month view</a>
            <a
              id="menu-0-item-5"
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
            >Year view</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
