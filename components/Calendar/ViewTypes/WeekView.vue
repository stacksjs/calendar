<script setup lang="ts">
import type { Events } from '../../../functions/types'

interface Props {
  type: string
  events: Events[]
}

const {
  type,
  events,
} = defineProps<Props>()

const { currentWeekView, year, isToday, currentMonthYear, isCurrentWeekViewToday } = useCalendar()
const { getStyle } = useCalendarTime()

const filteredEvents = computed(() => {
  const currentEvents = currentWeekView.value.map((week: any) => {
    // console.log(week.date)
    return events.filter((event: Events) => {
      return event.day === week.date && event.month === week.month && event.year === year.value
    })
  }).filter((event: any) => event.length > 0)
    .map((event: Event[]) => event[0])

  return currentEvents
})

function weekPosition(day: number): number {
  const currentVal = currentWeekView.value.find((week: any) => week.date === day)

  return currentWeekView.value.indexOf(currentVal)
}

function getClass(event: Events): string {
  const position = weekPosition(event.day)

  return `col-start-${position + 1}`
}
</script>

<template>
  <div>
    <div class="flex h-full flex-col">
      <header class="flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
        <h1 class="text-lg font-semibold text-gray-900">
          <time datetime="2022-01">{{ currentMonthYear }}</time>
        </h1>

        <CalendarNav :type="type" />
      </header>

      <div class="isolate flex flex-auto flex-col overflow-auto bg-white">
        <div
          style="width: 165%"
          class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5">
            <div class="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              <button
                type="button"
                class="flex flex-col items-center pt-2 pb-3"
              >
                S <span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">16</span>
              </button>
              <button
                type="button"
                class="flex flex-col items-center pt-2 pb-3"
              >
                M <span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">10</span>
              </button>
              <button
                type="button"
                class="flex flex-col items-center pt-2 pb-3"
              >
                T <span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">11</span>
              </button>
              <button
                type="button"
                class="flex flex-col items-center pt-2 pb-3"
              >
                W <span class="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">12</span>
              </button>
              <button
                type="button"
                class="flex flex-col items-center pt-2 pb-3"
              >
                T <span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">13</span>
              </button>
              <button
                type="button"
                class="flex flex-col items-center pt-2 pb-3"
              >
                F <span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">14</span>
              </button>
              <button
                type="button"
                class="flex flex-col items-center pt-2 pb-3"
              >
                S <span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">15</span>
              </button>
            </div>

            <div class="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div class="col-end-1 w-14" />
              <div class="flex items-center justify-center py-3">
                <div class="flex items-center justify-center py-3">
                  <span :class="{ 'flex items-baseline': isToday(`${currentWeekView[0].month}-${currentWeekView[0].date}-${year}`) && isCurrentWeekViewToday }">
                    Sun
                    <span
                      class="items-center justify-center font-semibold text-gray-900"
                      :class="{ 'rounded-full bg-indigo-600 font-semibold text-white flex h-8 w-8 ml-1.5': isToday(`${currentWeekView[0].month}-${currentWeekView[0].date}-${year}`) && isCurrentWeekViewToday }"
                    >
                      {{ currentWeekView[0].date }}
                    </span>
                  </span>
                </div>
              </div>
              <div class="flex items-center justify-center py-3">
                <div class="flex items-center justify-center py-3">
                  <span :class="{ 'flex items-baseline': isToday(`${currentWeekView[1].month}-${currentWeekView[1].date}-${year}`) && isCurrentWeekViewToday }">
                    Mon
                    <span
                      class="items-center justify-center font-semibold text-gray-900"
                      :class="{ 'rounded-full bg-indigo-600 font-semibold text-white flex h-8 w-8 ml-1.5': isToday(`${currentWeekView[1].month}-${currentWeekView[1].date}-${year}`) && isCurrentWeekViewToday }"
                    >
                      {{ currentWeekView[1].date }}
                    </span>
                  </span>
                </div>
              </div>
              <div class="flex items-center justify-center py-3">
                <span :class="{ 'flex items-baseline': isToday(`${currentWeekView[2].month}-${currentWeekView[2].date}-${year}`) && isCurrentWeekViewToday }">
                  Tue
                  <span
                    class="items-center justify-center font-semibold text-gray-900"
                    :class="{ 'rounded-full bg-indigo-600 font-semibold text-white flex h-8 w-8 ml-1.5': isToday(`${currentWeekView[2].month}-${currentWeekView[2].date}-${year}`) && isCurrentWeekViewToday }"
                  >
                    {{ currentWeekView[2].date }}
                  </span>
                </span>
              </div>
              <div class="flex items-center justify-center py-3">
                <div class="flex items-center justify-center py-3">
                  <span :class="{ 'flex items-baseline': isToday(`${currentWeekView[3].month}-${currentWeekView[3].date}-${year}`) && isCurrentWeekViewToday }">
                    Wed
                    <span
                      class="items-center justify-center font-semibold text-gray-900"
                      :class="{ 'rounded-full bg-indigo-600 font-semibold text-white flex h-8 w-8 ml-1.5': isToday(`${currentWeekView[3].month}-${currentWeekView[3].date}-${year}`) && isCurrentWeekViewToday }"
                    >
                      {{ currentWeekView[3].date }}
                    </span>
                  </span>
                </div>
              </div>
              <div class="flex items-center justify-center py-3">
                <span :class="{ 'flex items-baseline': isToday(`${currentWeekView[4].month}-${currentWeekView[4].date}-${year}`) && isCurrentWeekViewToday }">
                  Thu
                  <span
                    class="items-center justify-center font-semibold text-gray-900"
                    :class="{ 'rounded-full bg-indigo-600 font-semibold text-white ml-1.5 flex h-8 w-8': isToday(`${currentWeekView[4].month}-${currentWeekView[4].date}-${year}`) && isCurrentWeekViewToday }"
                  >
                    {{ currentWeekView[4].date }}
                  </span>
                </span>
              </div>
              <div class="flex items-center justify-center py-3">
                <span :class="{ 'flex items-baseline': isToday(`${currentWeekView[5].month}-${currentWeekView[5].date}-${year}`) && isCurrentWeekViewToday }">
                  Fri
                  <span
                    class="items-center justify-center font-semibold text-gray-900"
                    :class="{ 'rounded-full bg-indigo-600 font-semibold text-white flex h-8 w-8 ml-1.5': isToday(`${currentWeekView[5].month}-${currentWeekView[5].date}-${year}`) && isCurrentWeekViewToday }"
                  >
                    {{ currentWeekView[5].date }}
                  </span>
                </span>
              </div>
              <div class="flex items-center justify-center py-3">
                <span :class="{ 'flex items-baseline': isToday(`${currentWeekView[6].month}-${currentWeekView[6].date}-${year}`) && isCurrentWeekViewToday }">
                  Sat
                  <span
                    class="items-center justify-center font-semibold text-gray-900"
                    :class="{ 'rounded-full bg-indigo-600 font-semibold text-white flex h-8 w-8 ml-1.5': isToday(`${currentWeekView[6].month}-${currentWeekView[6].date}-${year}`) && isCurrentWeekViewToday }"
                  >
                    {{ currentWeekView[6].date }}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-auto">
            <div class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div class="grid flex-auto grid-cols-1 grid-rows-1">
              <!-- Horizontal lines -->
              <div
                class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))"
              >
                <div class="row-end-1 h-7" />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11PM
                  </div>
                </div>
                <div />
              </div>

              <!-- Vertical lines -->
              <div class="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                <div class="col-start-1 row-span-full" />
                <div class="col-start-2 row-span-full" />
                <div class="col-start-3 row-span-full" />
                <div class="col-start-4 row-span-full" />
                <div class="col-start-5 row-span-full" />
                <div class="col-start-6 row-span-full" />
                <div class="col-start-7 row-span-full" />
              </div>

              <!-- Events -->
              <ol
                v-if="filteredEvents.length"
                class="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-12"
                style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto; padding: 0"
              >
                <li
                  v-for="(event, index) in filteredEvents"
                  :key="index"
                  class="relative mt-px flex"
                  :class="getClass(event)"
                  :style="getStyle(event)"
                >
                  <a
                    href="#"
                    class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                  >
                    <p class="order-1 font-semibold text-blue-700">{{ event.title }}</p>
                    <p class="text-blue-500 group-hover:text-blue-700"><time datetime="2022-01-12T06:00">{{ event.time.from }}</time></p>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
