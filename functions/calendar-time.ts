import type { Events, TimeTableStyle } from '../functions/types'

const timeTable: TimeTableStyle[] = [
  { time: '12 AM', gridRow: '2' },
  { time: '1 AM', gridRow: '14' },
  { time: '2 AM', gridRow: '26' },
  { time: '3 AM', gridRow: '38' },
  { time: '4 AM', gridRow: '50' },
  { time: '5 AM', gridRow: '62' },
  { time: '6 AM', gridRow: '74' },
  { time: '7 AM', gridRow: '86' },
  { time: '8 AM', gridRow: '98' },
  { time: '9 AM', gridRow: '110' },
  { time: '10 AM', gridRow: '122' },
  { time: '11 AM', gridRow: '134' },
  { time: '12 PM', gridRow: '146' },
  { time: '1 PM', gridRow: '158' },
  { time: '2 PM', gridRow: '170' },
  { time: '3 PM', gridRow: '182' },
  { time: '4 PM', gridRow: '194' },
  { time: '5 PM', gridRow: '206' },
  { time: '6 PM', gridRow: '218' },
  { time: '7 PM', gridRow: '230' },
  { time: '8 PM', gridRow: '242' },
  { time: '9 PM', gridRow: '254' },
  { time: '10 PM', gridRow: '266' },
  { time: '11 PM', gridRow: '278' },
]

function getStyle(event: Events): string {
  const fromMinute = floatToInt(event.time.from.split(':')[1].split(' ')[0])

  const grid: TimeTableStyle | undefined = timeTable.find((time) => {
    const eventHour = event.time.from.split(':')[0]
    const eventHourMeridian = event.time.from.split(':')[1].slice(-2)
    const eventTimeString = eventHourMeridian === 'AM' ? `${eventHour} AM` : `${eventHour} PM`

    return time.time === eventTimeString
  })

  const diffMinutes = getDifferenceBetweenTwoDates(event.time.from, event.time.to)

  let gridRow: string | number = grid ? grid.gridRow : '2'

  const gridSpan = Math.floor((diffMinutes / 60) * 12)

  if (fromMinute !== 0)
    gridRow = parseInt(gridRow) + Math.ceil((fromMinute / 60) * 12)

  return `grid-row: ${gridRow} / span ${gridSpan}`
}

function getDifferenceBetweenTwoDates(from: string, to: string): number {
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
