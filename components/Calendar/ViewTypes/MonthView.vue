<script setup lang="ts">
import type { Events } from '../../../functions/types'

interface Props {
  type: string
  events: Array<Events>
}

const {
  type,
  events,
} = defineProps<Props>()

const { isToday, currentMonthYear, datesOfThePastMonth, datesOfTheMonth, datesOfNextMonth, month, year } = useCalendar()

function getEvents({ month, day, year }: { month: number; day: any; year: number }) {
  const currentDate = `${month}-${day}-${year}`

  const filteredEvents: Array<Events> = events.filter((event) => {
    return event.date === currentDate
  })

  return filteredEvents
}
</script>

<template>
  <div>
    <div class="lg:flex lg:h-full lg:flex-col">
      <header class="flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
        <h1 class="text-lg font-semibold text-gray-900">
          <time datetime="2022-01">{{ currentMonthYear }}</time>
        </h1>

        <CalendarNav :type="type" />
      </header>
      <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div class="flex justify-center bg-white py-2">
            <span>S</span>
            <span class="sr-only sm:not-sr-only">un</span>
          </div>
          <div class="flex justify-center bg-white py-2">
            <span>M</span>
            <span class="sr-only sm:not-sr-only">on</span>
          </div>
          <div class="flex justify-center bg-white py-2">
            <span>T</span>
            <span class="sr-only sm:not-sr-only">ue</span>
          </div>
          <div class="flex justify-center bg-white py-2">
            <span>W</span>
            <span class="sr-only sm:not-sr-only">ed</span>
          </div>
          <div class="flex justify-center bg-white py-2">
            <span>T</span>
            <span class="sr-only sm:not-sr-only">hu</span>
          </div>
          <div class="flex justify-center bg-white py-2">
            <span>F</span>
            <span class="sr-only sm:not-sr-only">ri</span>
          </div>
          <div class="flex justify-center bg-white py-2">
            <span>S</span>
            <span class="sr-only sm:not-sr-only">at</span>
          </div>
        </div>
        <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div
            class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px"
            style="min-height: 40rem;"
          >
            <!--
          Always include: "relative py-2 px-3"
          Is current month, include: "bg-white"
          Is not current month, include: "bg-gray-50 text-gray-500"
        -->
            <div
              v-for="pastDate in datesOfThePastMonth"
              :key="pastDate"
              class="relative bg-gray-50 py-2 px-3 text-gray-500"
            >
              <!--
            Is today, include: "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
          -->
              <time :datetime="`${year}-${month}-${pastDate}`">{{ pastDate }}</time>

              <ol
                v-if="getEvents({ month, day: pastDate, year }).length"
                class="mt-2"
              >
                <li
                  v-for="(event, index) in getEvents({ month, day: pastDate, year })"
                  :key="index"
                >
                  <a
                    href="#"
                    class="group flex"
                  >
                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">{{ event.title }}</p>
                    <time
                      datetime="2022-01-03T10:00"
                      class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                    >{{ event.time.from }}</time>
                  </a>
                </li>
              </ol>
            </div>

            <div
              v-for="date in datesOfTheMonth"
              :key="date"
              class="relative bg-white py-2 px-3"
            >
              <time
                :class="{ 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white': isToday(`${month + 1}-${date}-${year}`) }"
                :datetime="`${year}-${month}-${date}`"
              >{{ date }}</time>

              <ol
                v-if="getEvents({ month: month + 1, day: date, year }).length"
                class="mt-2"
              >
                <li
                  v-for="(event, index) in getEvents({ month: month + 1, day: date, year })"
                  :key="index"
                >
                  <a
                    href="#"
                    class="group flex"
                  >
                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">{{ event.title }}</p>
                    <time
                      datetime="2022-01-03T10:00"
                      class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                    >{{ event.time.from }}</time>
                  </a>
                </li>
              </ol>
            </div>

            <div
              v-for="nextDate in datesOfNextMonth"
              :key="nextDate"
              class="relative bg-gray-50 py-2 px-3 text-gray-500"
            >
              <time :datetime="`${year}-${month}-${nextDate}`">{{ nextDate }}</time>

              <ol
                v-if="getEvents({ month: month + 2, day: nextDate, year }).length"
                class="mt-2"
              >
                <li
                  v-for="(event, index) in getEvents({ month: month + 2, day: nextDate, year })"
                  :key="index"
                >
                  <a
                    href="#"
                    class="group flex"
                  >
                    <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">{{ event.title }}</p>
                    <time
                      datetime="2022-01-03T10:00"
                      class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                    >{{ event.time.from }}</time>
                  </a>
                </li>
              </ol>
            </div>
          </div>
          <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            <!--
          Always include: "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
          Is current month, include: "bg-white"
          Is not current month, include: "bg-gray-50"
          Is selected or is today, include: "font-semibold"
          Is selected, include: "text-white"
          Is not selected and is today, include: "text-indigo-600"
          Is not selected and is current month, and is not today, include: "text-gray-900"
          Is not selected, is not current month, and is not today: "text-gray-500"
        -->
            <button
              type="button"
              class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
              <!--
            Always include: "ml-auto"
            Is selected, include: "flex h-6 w-6 items-center justify-center rounded-full"
            Is selected and is today, include: "bg-indigo-600"
            Is selected and is not today, include: "bg-gray-900"
          -->
              <time
                v-for="pastDate in datesOfThePastMonth"
                :key="pastDate"
                datetime="2021-12-27"
                class="ml-auto"
              >{{ pastDate }}</time>
              <span class="sr-only">0 events</span>
            </button>

            <button
              v-for="date in datesOfTheMonth"
              :key="date"
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-01"
                class="ml-auto"
              >{{ date }}</time>
              <span class="sr-only">0 events</span>
            </button>

            <button
              v-for="nextDate in datesOfNextMonth"
              :key="nextDate"
              type="button"
              class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-02-01"
                class="ml-auto"
              >{{ nextDate }}</time>
              <span class="sr-only">0 events</span>
            </button>
          </div>
        </div>
      </div>
      <div class="py-10 px-4 sm:px-6 lg:hidden">
        <ol class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
          <li class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
            <div class="flex-auto">
              <p class="font-semibold text-gray-900">
                Maple syrup museum
              </p>
              <time
                datetime="2022-01-15T09:00"
                class="mt-2 flex items-center text-gray-700"
              >
                <!-- Heroicon name: mini/clock -->
                <svg
                  class="mr-2 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                    clip-rule="evenodd"
                  />
                </svg>
                3PM
              </time>
            </div>
            <a
              href="#"
              class="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
            >Edit<span class="sr-only">, Maple syrup museum</span></a>
          </li>

          <li class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
            <div class="flex-auto">
              <p class="font-semibold text-gray-900">
                Hockey game
              </p>
              <time
                datetime="2022-01-22T19:00"
                class="mt-2 flex items-center text-gray-700"
              >
                <!-- Heroicon name: mini/clock -->
                <svg
                  class="mr-2 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                    clip-rule="evenodd"
                  />
                </svg>
                7PM
              </time>
            </div>
            <a
              href="#"
              class="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
            >Edit<span class="sr-only">, Hockey game</span></a>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
