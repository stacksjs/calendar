<script setup>
const datesOfThePastMonth = ref([])
const datesOfTheMonth = ref([])
const datesOfNextMonth = ref([])

const totalNumberOfDates = 42
const nav = 0
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const dt = new Date()

const day = dt.getDate()
const month = dt.getMonth()
const year = dt.getFullYear()

const currentMonthYear = dt.toLocaleString('default', { month: 'long', year: 'numeric' })

const lastDayOfLastMonth = new Date(year, month, 0)

const firstDayOfMonth = new Date(year, month, 1)
const daysInMonth = new Date(year, month + 1, 0).getDate()

const firstDayOfNextMonth = new Date(year, month + 1, 1)

const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
})
const paddingDays = weekdays.indexOf(dateString.split(', ')[0])

const remainingDays = totalNumberOfDates - (paddingDays + daysInMonth)

// Last days of the last month
for (let i = paddingDays - 1; i >= 0; i--) {
  const lastDaysOfLastMonth = lastDayOfLastMonth.getDate() - i

  datesOfThePastMonth.value.push(lastDaysOfLastMonth)
  // datesOfThePastMonth.pu
}

// Current days of current month
for (let i = 1; i <= paddingDays + daysInMonth; i++) {
  const daySquare = document.createElement('div')
  daySquare.classList.add('day')

  const dayString = `${month + 1}/${i - paddingDays}/${year}`
  const dayInt = i - paddingDays

  if (dayInt > 0) {
    // const eventForDay = events.find(e => e.date === dayString)

    if (i - paddingDays === day && nav === 0)
      daySquare.id = 'currentDay'

    // if (eventForDay) {
    // const eventDiv = document.createElement('div')
    // eventDiv.classList.add('event')
    // eventDiv.innerText = eventForDay.title
    // daySquare.appendChild(eventDiv)
    // }

    // daySquare.addEventListener('click', () => openModal(dayString))

    datesOfTheMonth.value.push(dayInt)
  }

  // calendar.appendChild(daySquare)
}

// Days of the next month
for (let i = 0; i < remainingDays; i++) {
  const firstDaysOfNextMonth = firstDayOfNextMonth.getDate() + i

  datesOfNextMonth.value.push(firstDaysOfNextMonth)
}

function isToday(date) {
  return day === date
}
</script>

<template>
  <div>
    <div class="lg:flex lg:h-full lg:flex-col">
      <header class="flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
        <h1 class="text-lg font-semibold text-gray-900">
          <time datetime="2022-01">{{ currentMonthYear }}</time>
        </h1>
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
              <time datetime="2021-12-27">{{ pastDate }}</time>
            </div>

            <div
              v-for="date in datesOfTheMonth"
              :key="date"
              class="relative bg-white py-2 px-3"
            >
              <time
                :class="{ 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white': isToday(date) }"
                datetime="2022-01-01"
              >{{ date }}</time>
            </div>

            <div
              v-for="date in datesOfNextMonth"
              :key="date"
              class="relative bg-gray-50 py-2 px-3 text-gray-500"
            >
              <time datetime="2022-02-01">{{ date }}</time>
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
                datetime="2021-12-27"
                class="ml-auto"
              >27</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2021-12-28"
                class="ml-auto"
              >28</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2021-12-29"
                class="ml-auto"
              >29</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2021-12-30"
                class="ml-auto"
              >30</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2021-12-31"
                class="ml-auto"
              >31</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-01"
                class="ml-auto"
              >1</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-02"
                class="ml-auto"
              >2</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-03"
                class="ml-auto"
              >3</time>
              <span class="sr-only">2 events</span>
              <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
              </span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-04"
                class="ml-auto"
              >4</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-05"
                class="ml-auto"
              >5</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-06"
                class="ml-auto"
              >6</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-07"
                class="ml-auto"
              >7</time>
              <span class="sr-only">1 event</span>
              <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
              </span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-08"
                class="ml-auto"
              >8</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-09"
                class="ml-auto"
              >9</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-10"
                class="ml-auto"
              >10</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-11"
                class="ml-auto"
              >11</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 font-semibold text-indigo-600 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-12"
                class="ml-auto"
              >12</time>
              <span class="sr-only">1 event</span>
              <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
              </span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-13"
                class="ml-auto"
              >13</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-14"
                class="ml-auto"
              >14</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-15"
                class="ml-auto"
              >15</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-16"
                class="ml-auto"
              >16</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-17"
                class="ml-auto"
              >17</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-18"
                class="ml-auto"
              >18</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-19"
                class="ml-auto"
              >19</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-20"
                class="ml-auto"
              >20</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-21"
                class="ml-auto"
              >21</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 font-semibold text-white hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-22"
                class="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gray-900"
              >22</time>
              <span class="sr-only">2 events</span>
              <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
              </span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-23"
                class="ml-auto"
              >23</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-24"
                class="ml-auto"
              >24</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-25"
                class="ml-auto"
              >25</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-26"
                class="ml-auto"
              >26</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-27"
                class="ml-auto"
              >27</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-28"
                class="ml-auto"
              >28</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-29"
                class="ml-auto"
              >29</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-30"
                class="ml-auto"
              >30</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-white py-2 px-3 text-gray-900 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-01-31"
                class="ml-auto"
              >31</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-02-01"
                class="ml-auto"
              >1</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-02-02"
                class="ml-auto"
              >2</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-02-03"
                class="ml-auto"
              >3</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-02-04"
                class="ml-auto"
              >4</time>
              <span class="sr-only">1 event</span>
              <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
              </span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-02-05"
                class="ml-auto"
              >5</time>
              <span class="sr-only">0 events</span>
            </button>
            <button
              type="button"
              class="flex h-14 flex-col bg-gray-50 py-2 px-3 text-gray-500 hover:bg-gray-100 focus:z-10"
            >
              <time
                datetime="2022-02-06"
                class="ml-auto"
              >6</time>
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
