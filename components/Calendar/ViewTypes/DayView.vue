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

const { isCurrentDay, currentMonthYear, previousMonth, nextMonth, goToDay, currentMonthDayYear, datesOfThePastMonth, datesOfTheMonth, datesOfNextMonth, dayName, month, day, year } = useCalendar()
const { getStyle } = useCalendarTime()

const filteredEvents = computed(() => {
  const currentEvents = events.filter((event: Events) => {
    return event.day === day.value
  })

  return currentEvents
})
</script>

<template>
  <div>
    <div class="flex h-full flex-col">
      <header class="flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
        <div>
          <h1 class="text-lg font-semibold leading-6 text-gray-900">
            <time
              :datetime="`${year}-${month + 1}-${day}`"
              class="sm:hidden"
            >{{ currentMonthDayYear }}</time>
            <time
              :datetime="`${year}-${month + 1}-${day}`"
              class="hidden sm:inline"
            >{{ currentMonthDayYear }}</time>
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            {{ dayName }}
          </p>
        </div>

        <CalendarNav :type="type" />
      </header>
      <div class="isolate flex flex-auto overflow-hidden bg-white">
        <div class="flex flex-auto flex-col overflow-auto">
          <div class="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden">
            <button
              type="button"
              class="flex flex-col items-center pt-3 pb-1.5"
            >
              <span>W</span>
              <!-- Default: "text-gray-900", Selected: "bg-gray-900 text-white", Today (Not Selected): "text-indigo-600", Today (Selected): "bg-indigo-600 text-white" -->
              <span class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">19</span>
            </button>
            <button
              type="button"
              class="flex flex-col items-center pt-3 pb-1.5"
            >
              <span>T</span>
              <span class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-indigo-600">20</span>
            </button>
            <button
              type="button"
              class="flex flex-col items-center pt-3 pb-1.5"
            >
              <span>F</span>
              <span class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">21</span>
            </button>
            <button
              type="button"
              class="flex flex-col items-center pt-3 pb-1.5"
            >
              <span>S</span>
              <span class="mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-base font-semibold text-white">22</span>
            </button>
            <button
              type="button"
              class="flex flex-col items-center pt-3 pb-1.5"
            >
              <span>S</span>
              <span class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">23</span>
            </button>
            <button
              type="button"
              class="flex flex-col items-center pt-3 pb-1.5"
            >
              <span>M</span>
              <span class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">24</span>
            </button>
            <button
              type="button"
              class="flex flex-col items-center pt-3 pb-1.5"
            >
              <span>T</span>
              <span class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">25</span>
            </button>
          </div>
          <div class="flex w-full flex-auto">
            <div class="w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div class="grid flex-auto grid-cols-1 grid-rows-1">
              <!-- Horizontal lines -->
              <div
                class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))"
              >
                <div class="row-end-1 h-7" />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11AM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10PM
                  </div>
                </div>
                <div />
                <div>
                  <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11PM
                  </div>
                </div>
                <div />
              </div>

              <!-- Events -->
              <ol
                class="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto; padding: 0"
              >
                <li
                  v-for="(event, index) in filteredEvents"
                  :key="index"
                  class="relative mt-px flex"
                  :style="getStyle(event)"
                >
                  <a
                    href="#"
                    class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                  >
                    <p class="order-1 font-semibold text-blue-700">{{ event.title }}</p>
                    <p class="text-blue-500 group-hover:text-blue-700"><time datetime="2022-01-22T06:00">{{ event.time.from }}</time></p>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div class="hidden w-1/2 max-w-md flex-none border-l border-gray-100 py-10 px-8 md:block">
          <div class="flex items-center text-center text-gray-900">
            <button
              type="button"
              class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              @click="previousMonth"
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
            <div class="flex-auto font-semibold">
              {{ currentMonthYear }}
            </div>
            <button
              type="button"
              class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              @click="nextMonth"
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
          <div class="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            <!--
          Always include: "py-1.5 hover:bg-gray-100 focus:z-10"
          Is current month, include: "bg-white"
          Is not current month, include: "bg-gray-50"
          Is selected or is today, include: "font-semibold"
          Is selected, include: "text-white"
          Is not selected, is not today, and is current month, include: "text-gray-900"
          Is not selected, is not today, and is not current month, include: "text-gray-400"
          Is today and is not selected, include: "text-indigo-600"

          Top left day, include: "rounded-tl-lg"
          Top right day, include: "rounded-tr-lg"
          Bottom left day, include: "rounded-bl-lg"
          Bottom right day, include: "rounded-br-lg"
        -->
            <button
              v-for="pastDate in datesOfThePastMonth"
              :key="pastDate"
              type="button"
              class="bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10"
              @click="goToDay(pastDate, (month + 1) - 1)"
            >
              <!--
            Always include: "mx-auto flex h-7 w-7 items-center justify-center rounded-full"
            Is selected and is today, include: "bg-indigo-600"
            Is selected and is not today, include: "bg-gray-900"
          -->
              <time
                :datetime="`${year}-${month + 1}-${pastDate}`"
                class="mx-auto flex h-7 w-7 items-center justify-center rounded-full"
              >{{ pastDate }}</time>
            </button>

            <button
              v-for="date in datesOfTheMonth"
              :key="date"
              type="button"
              class="bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10"
              @click="goToDay(date, month + 1)"
            >
              <time
                :datetime="`${year}-${month + 1}-${date}`"
                class="mx-auto flex h-7 w-7 items-center justify-center rounded-full"
                :class="{ ' bg-gray-900 font-semibold text-white': isCurrentDay(`${month + 1}-${date}-${year}`) }"
              >{{ date }}</time>
            </button>

            <button
              v-for="nextDate in datesOfNextMonth"
              :key="nextDate"
              type="button"
              class="bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10"
              @click="goToDay(nextDate, (month + 1) + 1)"
            >
              <time
                :datetime="`${year}-${month + 1}-${nextDate}`"
                class="mx-auto flex h-7 w-7 items-center justify-center rounded-full"
              >{{ nextDate }}</time>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
