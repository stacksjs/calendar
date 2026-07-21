import { createIcs, createIcsDataUrl } from './ics'
import { googleCalendarUrl, office365CalendarUrl, outlookCalendarUrl, yahooCalendarUrl } from './providers'
import type { CalendarEvent, CalendarLinks, IcsOptions } from './types'

export * from './dates'
export * from './ics'
export * from './providers'
export * from './types'

export function createCalendarLinks(event: CalendarEvent, options?: IcsOptions): CalendarLinks {
  const ics = createIcs(event, options)
  return {
    google: googleCalendarUrl(event),
    outlook: outlookCalendarUrl(event),
    office365: office365CalendarUrl(event),
    yahoo: yahooCalendarUrl(event),
    ics,
    icsDataUrl: `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`,
  }
}

export const calendarLink = createCalendarLinks
export { createIcsDataUrl }
