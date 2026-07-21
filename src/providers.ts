import { formatIsoDate, formatUtcDate, formatUtcDateTime, normalizeEvent } from './dates'
import type { CalendarEvent, NormalizedCalendarEvent } from './types'

const GOOGLE_URL = 'https://calendar.google.com/calendar/render'
const OUTLOOK_URL = 'https://outlook.live.com/calendar/0/deeplink/compose'
const OFFICE_365_URL = 'https://outlook.office.com/calendar/0/deeplink/compose'
const YAHOO_URL = 'https://calendar.yahoo.com/'

function appendCommon(params: URLSearchParams, event: NormalizedCalendarEvent, names: {
  title: string
  description: string
  location: string
}): void {
  params.set(names.title, event.title)
  if (event.description)
    params.set(names.description, event.description)
  if (event.location)
    params.set(names.location, event.location)
}

export function googleCalendarUrl(input: CalendarEvent): string {
  const event = normalizeEvent(input)
  const params = new URLSearchParams({ action: 'TEMPLATE' })
  params.set('dates', event.allDay
    ? `${formatUtcDate(event.start)}/${formatUtcDate(event.end)}`
    : `${formatUtcDateTime(event.start)}/${formatUtcDateTime(event.end)}`)
  if (event.timezone)
    params.set('ctz', event.timezone)
  if (event.url)
    params.set('sprop', event.url)
  appendCommon(params, event, { title: 'text', description: 'details', location: 'location' })
  return `${GOOGLE_URL}?${params}`
}

function outlookUrl(input: CalendarEvent, baseUrl: string): string {
  const event = normalizeEvent(input)
  const params = new URLSearchParams({ path: '/calendar/action/compose', rru: 'addevent' })
  params.set('startdt', event.allDay ? formatIsoDate(event.start) : event.start.toISOString())
  params.set('enddt', event.allDay ? formatIsoDate(event.end) : event.end.toISOString())
  if (event.allDay)
    params.set('allday', 'true')
  appendCommon(params, event, { title: 'subject', description: 'body', location: 'location' })
  return `${baseUrl}?${params}`
}

export function outlookCalendarUrl(input: CalendarEvent): string {
  return outlookUrl(input, OUTLOOK_URL)
}

export function office365CalendarUrl(input: CalendarEvent): string {
  return outlookUrl(input, OFFICE_365_URL)
}

export function yahooCalendarUrl(input: CalendarEvent): string {
  const event = normalizeEvent(input)
  const params = new URLSearchParams({ v: '60', view: 'd', type: '20' })
  params.set('st', event.allDay ? formatUtcDate(event.start) : formatUtcDateTime(event.start))
  params.set('et', event.allDay ? formatUtcDate(event.end) : formatUtcDateTime(event.end))
  if (event.allDay)
    params.set('dur', 'allday')
  appendCommon(params, event, { title: 'title', description: 'desc', location: 'in_loc' })
  return `${YAHOO_URL}?${params}`
}
