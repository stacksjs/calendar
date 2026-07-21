import type { CalendarEvent, NormalizedCalendarEvent } from './types'

function asDate(value: Date | string, field: string): Date {
  const date = value instanceof Date ? new Date(value) : new Date(value)
  if (Number.isNaN(date.getTime()))
    throw new TypeError(`Calendar event ${field} must be a valid date`)
  return date
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60_000)
}

export function addUtcDays(date: Date, days: number): Date {
  const copy = new Date(date)
  copy.setUTCDate(copy.getUTCDate() + days)
  return copy
}

export function normalizeEvent(event: CalendarEvent): NormalizedCalendarEvent {
  if (!event.title.trim())
    throw new TypeError('Calendar event title is required')

  const start = asDate(event.start, 'start')
  const allDay = event.allDay ?? false
  const durationMinutes = event.durationMinutes ?? 60
  if (!Number.isFinite(durationMinutes) || durationMinutes <= 0)
    throw new TypeError('Calendar event durationMinutes must be greater than zero')

  const end = event.end
    ? asDate(event.end, 'end')
    : allDay
      ? addUtcDays(start, 1)
      : addMinutes(start, durationMinutes)

  if (end.getTime() <= start.getTime())
    throw new RangeError('Calendar event end must be after start')

  return {
    ...event,
    title: event.title.trim(),
    start,
    end,
    allDay,
  }
}

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

export function formatUtcDate(date: Date): string {
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}`
}

export function formatUtcDateTime(date: Date): string {
  return `${formatUtcDate(date)}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
}

export function formatIsoDate(date: Date): string {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`
}
