export interface CalendarEvent {
  title: string
  start: Date | string
  end?: Date | string
  durationMinutes?: number
  allDay?: boolean
  description?: string
  location?: string
  timezone?: string
  url?: string
  uid?: string
  organizer?: {
    name?: string
    email: string
  }
}

export interface NormalizedCalendarEvent extends Omit<CalendarEvent, 'start' | 'end' | 'durationMinutes'> {
  start: Date
  end: Date
  allDay: boolean
}

export interface IcsOptions {
  productId?: string
  timestamp?: Date | string
}

export interface CalendarLinks {
  google: string
  outlook: string
  office365: string
  yahoo: string
  ics: string
  icsDataUrl: string
}
