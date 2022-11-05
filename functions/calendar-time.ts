import type { Events } from '../functions/types'

const timeTable: Array<any> = [
  { 'time': '12 AM', 'grid-row': '2' },
  { 'time': '1 AM', 'grid-row': '14' },
  { 'time': '2 AM', 'grid-row': '26' },
  { 'time': '3 AM', 'grid-row': '38' },
  { 'time': '4 AM', 'grid-row': '50' },
  { 'time': '5 AM', 'grid-row': '62' },
  { 'time': '6 AM', 'grid-row': '74' },
  { 'time': '7 AM', 'grid-row': '86' },
  { 'time': '8 AM', 'grid-row': '98' },
  { 'time': '9 AM', 'grid-row': '110' },
  { 'time': '10 AM', 'grid-row': '122' },
  { 'time': '11 AM', 'grid-row': '134' },
  { 'time': '12 PM', 'grid-row': '146' },
  { 'time': '1 PM', 'grid-row': '158' },
  { 'time': '2 PM', 'grid-row': '170' },
  { 'time': '3 PM', 'grid-row': '182' },
  { 'time': '4 PM', 'grid-row': '194' },
  { 'time': '5 PM', 'grid-row': '206' },
  { 'time': '6 PM', 'grid-row': '218' },
  { 'time': '7 PM', 'grid-row': '230' },
  { 'time': '8 PM', 'grid-row': '242' },
  { 'time': '9 PM', 'grid-row': '254' },
  { 'time': '10 PM', 'grid-row': '266' },
  { 'time': '11 PM', 'grid-row': '278' },
]

function getStyle(event: Events) {
  const fromMinute = floatToInt(event.time.from.split(':')[1].split(' ')[0])

  const grid = timeTable.find((time) => {
    const eventHour = event.time.from.split(':')[0]
    const eventHourMeridian = event.time.from.split(':')[1].slice(-2)
    const eventTimeString = eventHourMeridian === 'AM' ? `${eventHour} AM` : `${eventHour} PM`

    return time.time === eventTimeString
  })

  const diffMinutes = getDifferenceBetweenTwoDates(event.time.from, event.time.to)

  let gridRow: any = grid ? grid['grid-row'] : '2'

  const gridSpan = Math.floor((diffMinutes / 60) * 12)

  if (fromMinute !== 0)
    gridRow = parseInt(gridRow) + Math.ceil((fromMinute / 60) * 12)

  return `grid-row: ${gridRow} / span ${gridSpan}`
}

function getDifferenceBetweenTwoDates(from: string, to: string) {
  const fromTime = convertTime12to24(from)
  const toTime = convertTime12to24(to)

  const fromDate: any = new Date(`2022/01/01 ${fromTime}`)
  const toDate: any = new Date(`2022/01/01 ${toTime}`)

  const diff = Math.abs(fromDate - toDate)

  const minutes = Math.floor((diff / 1000) / 60)
  return minutes
}

function convertTime12to24(time12h: string): string {
  const [time, modifier] = time12h.split(' ')

  let hours: number | string = time.split(':')[0]
  const minutes: string = time.split(':')[1]

  if (hours === '12')
    hours = '00'

  if (modifier === 'PM')
    hours = parseInt(hours, 10) + 12

  return `${hours}:${minutes}`
}

function floatToInt(value: any): number {
  return value | 0
}

export function useCalendarTime(): any {
  return {
    getStyle,
  }
}
