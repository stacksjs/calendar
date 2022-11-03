import type { Ref } from 'vue'

import type { CalendarStore } from './types'

const dt = new Date()

const datesOfThePastMonth: Ref<number[]> = ref([])
const datesOfTheMonth: Ref<number[]> = ref([])
const datesOfNextMonth: Ref<number[]> = ref([])

const totalNumberOfDates = 42
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const day = ref(dt.getDate())
const month = ref(dt.getMonth())
const year = ref(dt.getFullYear())

const currentMonthYear = ref(dt.toLocaleString('default', { month: 'long', year: 'numeric' }))
const currentMonthDayYear = ref(dt.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }))

const lastDayOfLastMonth = new Date(year.value, month.value, 0)
const firstDayOfMonth = new Date(year.value, month.value, 1)
const daysInMonth = new Date(year.value, month.value + 1, 0).getDate()

const firstDayOfNextMonth = new Date(year.value, month.value + 1, 1)

const dateString = firstDayOfMonth.toLocaleDateString('default', {
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
}

// Current days of current month
for (let i = 1; i <= paddingDays + daysInMonth; i++) {
  const dayInt = i - paddingDays

  if (dayInt > 0)
    datesOfTheMonth.value.push(dayInt)
}

// Days of the next month
for (let i = 0; i < remainingDays; i++) {
  const firstDaysOfNextMonth = firstDayOfNextMonth.getDate() + i

  datesOfNextMonth.value.push(firstDaysOfNextMonth)
}

function isToday(date: string) {
  const dt = new Date()

  const day = dt.getDate()
  const month = dt.getMonth()
  const year = dt.getFullYear()

  return date === `${month}-${day}-${year}`
}

let currentMonth = month.value + 1
let currentYear = year.value

const dayName = ref(new Date(`${currentMonth}-${day.value}-${currentYear}`).toLocaleString('default', { weekday: 'long' }))

function isCurrentDay(date: string) {
  // const dt = new Date()

  // const day = dt.getDate()
  // const month = dt.getMonth()
  // const year = dt.getFullYear()

  const currentDay = day.value

  const currentDateString = `${currentMonth}-${currentDay}-${currentYear}`

  return date === `${currentDateString}`
}

function nextMonth() {
  currentMonth = currentMonth + 1

  if (currentMonth > 12) {
    currentYear = currentYear += 1
    currentMonth = 1
  }

  let currentDateString = `${currentMonth}-${day.value}-${currentYear}`

  currentDateString = useDateFormat(currentDateString, 'MM-DD-YYYY').value
  const dt = new Date(currentDateString)
  initiateDates(dt)
}

function toggleTodayMonth() {
  const dt = new Date()

  currentMonth = dt.getMonth() + 1
  currentYear = dt.getFullYear()

  initiateDates(dt)
}

function previousMonth() {
  currentMonth = currentMonth - 1

  if (currentMonth < 1) {
    currentYear = currentYear -= 1
    currentMonth = 12
  }

  let currentDateString = `${currentMonth}-${day.value}-${currentYear}`
  currentDateString = useDateFormat(currentDateString, 'MM-DD-YYYY').value

  const dt = new Date(currentDateString)
  initiateDates(dt)
}

let allDates = datesOfThePastMonth.value.concat(datesOfTheMonth.value).concat(datesOfNextMonth.value)
let weekDates: Array<number[]> = [allDates.slice(0, 7), allDates.slice(7, 14), allDates.slice(14, 21), allDates.slice(21, 28), allDates.slice(28, 35), allDates.slice(35, 42)]

const todayWeek = weekDates.filter((week) => {
  return week.includes(day.value)
})

const todayWeekIndex = day.value > 20 ? todayWeek.length - 1 : 0

const currentWeekView = ref(todayWeek[todayWeekIndex])
const isCurrentWeekViewToday = ref(currentWeekView.value.length === todayWeek[todayWeekIndex].length && currentWeekView.value.every((value, index) => value === todayWeek[todayWeekIndex][index]))

let indexWeek = indexOfArray(weekDates, currentWeekView.value)

function nextWeek() {
  indexWeek = indexWeek += 1

  if (indexWeek >= 5) {
    nextMonth()

    indexWeek = 0
  }

  if (currentWeekView.value.length === weekDates[indexWeek].length && currentWeekView.value.every((value, index) => value === weekDates[indexWeek][index]))
    indexWeek = indexWeek += 1

  currentWeekView.value = weekDates[indexWeek]

  isCurrentWeekViewToday.value = currentWeekView.value.length === todayWeek[todayWeekIndex].length && currentWeekView.value.every((value, index) => value === todayWeek[todayWeekIndex][index])
}

function nextDay() {
  let currentDay = day.value

  currentDay = currentDay += 1

  const lastDayOfTheMonth = datesOfTheMonth.value[datesOfTheMonth.value.length - 1]

  if (currentDay > lastDayOfTheMonth) {
    nextMonth()
    currentDay = 1
  }

  day.value = currentDay

  let currentDateString = `${currentMonth}-${day.value}-${currentYear}`
  currentDateString = useDateFormat(currentDateString, 'MM-DD-YYYY').value

  const dt = new Date(currentDateString)

  currentMonthDayYear.value = dt.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })
  dayName.value = new Date(`${currentMonth}-${day.value}-${currentYear}`).toLocaleString('default', { weekday: 'long' })
}

function goToDay(date: number, monthDate: number) {
  if (monthDate === currentMonth + 1)
    nextMonth()

  if (monthDate === currentMonth - 1)
    previousMonth()

  day.value = date
  let currentDateString = `${monthDate}-${day.value}-${currentYear}`
  currentDateString = useDateFormat(currentDateString, 'MM-DD-YYYY').value

  const dt = new Date(currentDateString)

  currentMonthDayYear.value = dt.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })
  dayName.value = new Date(`${currentMonth}-${day.value}-${currentYear}`).toLocaleString('default', { weekday: 'long' })
}

function toggleToday() {
  const dt = new Date()

  currentMonth = dt.getMonth() + 1
  day.value = dt.getDate()
  currentYear = dt.getFullYear()

  initiateDates(dt)

  currentMonthDayYear.value = dt.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })
  dayName.value = new Date(`${currentMonth}-${day.value}-${currentYear}`).toLocaleString('default', { weekday: 'long' })
}

function previousDay() {
  let currentDay = day.value

  currentDay = currentDay -= 1
  const lastDayOfLastMonth = datesOfThePastMonth.value[datesOfThePastMonth.value.length - 1]
  const firstDayOfTheMonth = datesOfTheMonth.value[0]

  if (currentDay < firstDayOfTheMonth) {
    previousMonth()
    currentDay = lastDayOfLastMonth
  }

  day.value = currentDay

  let currentDateString = `${currentMonth}-${day.value}-${currentYear}`
  currentDateString = useDateFormat(currentDateString, 'MM-DD-YYYY').value

  const dt = new Date(currentDateString)

  currentMonthDayYear.value = dt.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })
  dayName.value = new Date(`${currentMonth}-${day.value}-${currentYear}`).toLocaleString('default', { weekday: 'long' })
}

function toggleTodayWeek() {
  toggleTodayMonth()

  currentWeekView.value = todayWeek[todayWeekIndex]

  isCurrentWeekViewToday.value = currentWeekView.value.length === todayWeek[todayWeekIndex].length && currentWeekView.value.every((value, index) => value === todayWeek[todayWeekIndex][index])
}

function previousWeek() {
  indexWeek = indexWeek -= 1

  if (indexWeek < 0) {
    previousMonth()

    indexWeek = 4
  }

  if (currentWeekView.value.length === weekDates[indexWeek].length && currentWeekView.value.every((value, index) => value === weekDates[indexWeek][index]))
    indexWeek = indexWeek -= 1

  currentWeekView.value = weekDates[indexWeek]
  isCurrentWeekViewToday.value = currentWeekView.value.length === todayWeek[todayWeekIndex].length && currentWeekView.value.every((value, index) => value === todayWeek[todayWeekIndex][index])
}

function initiateDates(dt: Date) {
  day.value = dt.getDate()
  month.value = dt.getMonth()
  year.value = dt.getFullYear()

  const lastDayOfLastMonth = new Date(year.value, month.value, 0)

  const firstDayOfMonth = new Date(year.value, month.value, 1)
  const daysInMonth = new Date(year.value, month.value + 1, 0).getDate()
  const firstDayOfNextMonth = new Date(year.value, month.value + 1, 1)

  const dateString = firstDayOfMonth.toLocaleDateString('default', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })

  const paddingDays = weekdays.indexOf(dateString.split(', ')[0])

  const remainingDays = totalNumberOfDates - (paddingDays + daysInMonth)
  currentMonthYear.value = dt.toLocaleString('default', { month: 'long', year: 'numeric' })

  const datesOfThePastMonthArray = []
  for (let i = paddingDays - 1; i >= 0; i--) {
    const lastDaysOfLastMonth = lastDayOfLastMonth.getDate() - i

    datesOfThePastMonthArray.push(lastDaysOfLastMonth)
    datesOfThePastMonth.value = datesOfThePastMonthArray
  }

  // Current days of current month
  const datesOfTheMonthArray = []
  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const dayInt = i - paddingDays

    if (dayInt > 0) {
      datesOfTheMonthArray.push(dayInt)
      datesOfTheMonth.value = datesOfTheMonthArray
    }
  }

  const datesOfNextMonthArray = []
  // Days of the next month
  for (let i = 0; i < remainingDays; i++) {
    const firstDaysOfNextMonth = firstDayOfNextMonth.getDate() + i

    datesOfNextMonthArray.push(firstDaysOfNextMonth)
    datesOfNextMonth.value = datesOfNextMonthArray
  }

  allDates = datesOfThePastMonth.value.concat(datesOfTheMonth.value).concat(datesOfNextMonth.value)
  weekDates = [allDates.slice(0, 7), allDates.slice(7, 14), allDates.slice(14, 21), allDates.slice(21, 28), allDates.slice(28, 35), allDates.slice(35, 42)]

  if (!paddingDays)
    datesOfThePastMonth.value = []
}

function indexOfArray(array: Array<number[]>, item: number[]) {
  for (let i = 0; i < array.length; i++) {
    // This if statement depends on the format of your array
    if (array[i][0] === item[0] && array[i][1] === item[1])
      return i // Found it
  }
  return -1 // Not found
}

export function useCalendar(store?: CalendarStore): any {
  return {
    store,
    isToday,
    isCurrentDay,
    currentMonthYear,
    currentMonthDayYear,
    datesOfThePastMonth,
    datesOfTheMonth,
    datesOfNextMonth,
    dayName,
    nextMonth,
    goToDay,
    nextWeek,
    nextDay,
    previousDay,
    previousMonth,
    previousWeek,
    toggleTodayMonth,
    toggleTodayWeek,
    toggleToday,
    day,
    month,
    year,
    currentWeekView,
    isCurrentWeekViewToday,
  }
}
