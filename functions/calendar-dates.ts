import type { Ref } from 'vue'

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

let currentMonth = month.value
let currentYear = year.value

function nextMonth() {
  currentMonth = currentMonth += 1

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
  currentMonth = currentMonth -= 1

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

  if (!paddingDays)
    datesOfThePastMonth.value = []
}

export function useCalendar(): object {
  return {
    isToday,
    currentMonthYear,
    datesOfThePastMonth,
    datesOfTheMonth,
    datesOfNextMonth,
    nextMonth,
    previousMonth,
    toggleToday,
    month,
    year,
  }
}
