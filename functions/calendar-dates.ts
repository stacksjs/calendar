import type { Ref } from 'vue'
import type { CalendarStore } from './types'

const dt = new Date()

const datesOfThePastMonth: Ref<Number[]> = ref([])
const datesOfTheMonth: Ref<Number[]> = ref([])
const datesOfNextMonth: Ref<Number[]> = ref([])

const totalNumberOfDates = 42
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const day = ref(dt.getDate())
const month = ref(dt.getMonth())
const year = ref(dt.getFullYear())

const currentMonthYear = ref(dt.toLocaleString('default', { month: 'long', year: 'numeric' }))

const lastDayOfLastMonth = new Date(year.value, month.value, 0)
const firstDayOfMonth = new Date(year.value, month.value, 1)
const daysInMonth = new Date(year.value, month.value + 1, 0).getDate()

const firstDayOfNextMonth = new Date(year.value, month.value + 1, 1)

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

function toggleToday() {
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
let weekDates: Array<Number[]> = [allDates.slice(0, 7), allDates.slice(7, 14), allDates.slice(14, 21), allDates.slice(21, 28), allDates.slice(28, 35), allDates.slice(35, 42)]

const todayWeek = weekDates.filter((week) => {
  return week.includes(day.value)
})

const currentWeekView = ref(todayWeek[todayWeek.length - 1])

let indexWeek = indexOfArray(weekDates, currentWeekView.value)

function nextWeek() {
  indexWeek = indexWeek += 1

  if (indexWeek > 5) {
    currentWeekView.value = weekDates[0]

    nextMonth()
    indexWeek = 0

    console.log(currentWeekView.value)
    return
  }

  console.log(weekDates)

  currentWeekView.value = weekDates[indexWeek]

  // console.log(weekDates)

  // currentMonth = currentMonth + 1

  // if (currentMonth > 12) {
  //   currentYear = currentYear += 1
  //   currentMonth = 1
  // }

  // let currentDateString = `${currentMonth}-${day.value}-${currentYear}`
  // currentDateString = useDateFormat(currentDateString, 'MM-DD-YYYY').value
  // const dt = new Date(currentDateString)
  // initiateDates(dt)
}

function previousWeek() {
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

function initiateDates(dt: Date) {
  day.value = dt.getDate()
  month.value = dt.getMonth()
  year.value = dt.getFullYear()

  const lastDayOfLastMonth = new Date(year.value, month.value, 0)
  const firstDayOfMonth = new Date(year.value, month.value, 1)
  const daysInMonth = new Date(year.value, month.value + 1, 0).getDate()
  const firstDayOfNextMonth = new Date(year.value, month.value + 1, 1)

  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
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

  // todayWeek = weekDates.filter((week) => {
  //   return week.includes(day.value)
  // })

  // currentWeekView = ref(todayWeek[todayWeek.length - 1])

  // indexWeek = indexOfArray(weekDates, currentWeekView.value)

  if (!paddingDays)
    datesOfThePastMonth.value = []
}

function indexOfArray(array: Array<Number[]>, item: Number[]) {
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
    currentMonthYear,
    datesOfThePastMonth,
    datesOfTheMonth,
    datesOfNextMonth,
    nextMonth,
    nextWeek,
    previousMonth,
    previousWeek,
    toggleToday,
    month,
    year,
    currentWeekView,
  }
}
