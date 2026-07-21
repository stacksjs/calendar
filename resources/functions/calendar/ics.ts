import { formatUtcDate, formatUtcDateTime, normalizeEvent } from './dates'
import type { CalendarEvent, IcsOptions } from './types'

function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
}

function stableHash(value: string): string {
  let hash = 2166136261
  for (const byte of new TextEncoder().encode(value)) {
    hash ^= byte
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0).toString(16).padStart(8, '0')
}

function eventUid(event: ReturnType<typeof normalizeEvent>): string {
  return event.uid ?? `${stableHash(`${event.start.toISOString()}|${event.end.toISOString()}|${event.title}`)}@calendar.stacksjs.org`
}

export function foldIcsLine(line: string): string {
  const encoder = new TextEncoder()
  const folded: string[] = []
  let current = ''

  for (const character of line) {
    if (encoder.encode(current + character).length > 75) {
      folded.push(current)
      current = ` ${character}`
    }
    else {
      current += character
    }
  }

  folded.push(current)
  return folded.join('\r\n')
}

export function createIcs(input: CalendarEvent, options: IcsOptions = {}): string {
  const event = normalizeEvent(input)
  const timestamp = options.timestamp ? new Date(options.timestamp) : new Date()
  if (Number.isNaN(timestamp.getTime()))
    throw new TypeError('ICS timestamp must be a valid date')

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${options.productId ?? '-//Stacks.js//Calendar//EN'}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${escapeText(eventUid(event))}`,
    `DTSTAMP:${formatUtcDateTime(timestamp)}`,
    event.allDay ? `DTSTART;VALUE=DATE:${formatUtcDate(event.start)}` : `DTSTART:${formatUtcDateTime(event.start)}`,
    event.allDay ? `DTEND;VALUE=DATE:${formatUtcDate(event.end)}` : `DTEND:${formatUtcDateTime(event.end)}`,
    `SUMMARY:${escapeText(event.title)}`,
  ]

  if (event.description)
    lines.push(`DESCRIPTION:${escapeText(event.description)}`)
  if (event.location)
    lines.push(`LOCATION:${escapeText(event.location)}`)
  if (event.url)
    lines.push(`URL:${event.url}`)
  if (event.organizer) {
    const name = event.organizer.name ? `;CN=${escapeText(event.organizer.name)}` : ''
    lines.push(`ORGANIZER${name}:mailto:${event.organizer.email}`)
  }

  lines.push('END:VEVENT', 'END:VCALENDAR')
  return `${lines.map(foldIcsLine).join('\r\n')}\r\n`
}

export function createIcsDataUrl(input: CalendarEvent, options?: IcsOptions): string {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(createIcs(input, options))}`
}
