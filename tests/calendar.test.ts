import { describe, expect, test } from 'bun:test'
import {
  createCalendarLinks,
  createIcs,
  createIcsDataUrl,
  foldIcsLine,
  googleCalendarUrl,
  normalizeEvent,
  office365CalendarUrl,
  outlookCalendarUrl,
  yahooCalendarUrl,
} from '../resources/functions/calendar'

const timedEvent = {
  title: 'Stacks Launch',
  start: '2026-07-21T17:00:00-07:00',
  end: '2026-07-21T18:30:00-07:00',
  description: 'Launch notes, demos; and questions',
  location: 'Playa Vista, CA',
  timezone: 'America/Los_Angeles',
  url: 'https://stacksjs.org/launch',
}

describe('calendar providers', () => {
  test('generates UTC Google event dates and encoded metadata', () => {
    const url = new URL(googleCalendarUrl(timedEvent))

    expect(url.origin + url.pathname).toBe('https://calendar.google.com/calendar/render')
    expect(url.searchParams.get('dates')).toBe('20260722T000000Z/20260722T013000Z')
    expect(url.searchParams.get('text')).toBe('Stacks Launch')
    expect(url.searchParams.get('ctz')).toBe('America/Los_Angeles')
  })

  test('generates live and Office 365 Outlook links', () => {
    const live = new URL(outlookCalendarUrl(timedEvent))
    const office = new URL(office365CalendarUrl(timedEvent))

    expect(live.host).toBe('outlook.live.com')
    expect(office.host).toBe('outlook.office.com')
    expect(live.searchParams.get('startdt')).toBe('2026-07-22T00:00:00.000Z')
    expect(live.searchParams.get('subject')).toBe('Stacks Launch')
  })

  test('uses exclusive all-day end dates for every provider', () => {
    const event = { title: 'Stacks Day', start: '2026-07-21', allDay: true }
    const google = new URL(googleCalendarUrl(event))
    const outlook = new URL(outlookCalendarUrl(event))
    const yahoo = new URL(yahooCalendarUrl(event))

    expect(google.searchParams.get('dates')).toBe('20260721/20260722')
    expect(outlook.searchParams.get('startdt')).toBe('2026-07-21')
    expect(outlook.searchParams.get('enddt')).toBe('2026-07-22')
    expect(outlook.searchParams.get('allday')).toBe('true')
    expect(yahoo.searchParams.get('st')).toBe('20260721')
    expect(yahoo.searchParams.get('et')).toBe('20260722')
  })
})

describe('ICS generation', () => {
  test('creates deterministic, escaped RFC 5545 event content', () => {
    const ics = createIcs(timedEvent, { timestamp: '2026-07-20T12:00:00Z' })

    expect(ics).toContain('DTSTAMP:20260720T120000Z')
    expect(ics).toContain('DTSTART:20260722T000000Z')
    expect(ics).toContain('DTEND:20260722T013000Z')
    expect(ics).toContain('DESCRIPTION:Launch notes\\, demos\\; and questions')
    expect(ics).toContain('LOCATION:Playa Vista\\, CA')
    expect(ics).toMatch(/UID:[a-f0-9]{8}@calendar\.stacksjs\.org/)
    expect(ics.endsWith('\r\n')).toBe(true)
  })

  test('folds Unicode lines at 75 UTF-8 octets with continuation whitespace', () => {
    const folded = foldIcsLine(`DESCRIPTION:${'🚀'.repeat(30)}`)
    const lines = folded.split('\r\n')

    expect(lines.length).toBeGreaterThan(1)
    expect(lines.slice(1).every(line => line.startsWith(' '))).toBe(true)
    expect(lines.every(line => new TextEncoder().encode(line).length <= 75)).toBe(true)
  })

  test('creates a Unicode-safe data URL and complete link set', () => {
    const event = { ...timedEvent, title: 'Stacks 🚀' }
    const links = createCalendarLinks(event, { timestamp: '2026-07-20T12:00:00Z' })

    expect(decodeURIComponent(createIcsDataUrl(event).split(',', 2)[1])).toContain('SUMMARY:Stacks 🚀')
    expect(links.google).toStartWith('https://calendar.google.com/')
    expect(links.outlook).toStartWith('https://outlook.live.com/')
    expect(links.office365).toStartWith('https://outlook.office.com/')
    expect(links.yahoo).toStartWith('https://calendar.yahoo.com/')
  })
})

describe('event validation', () => {
  test('defaults timed events to one hour', () => {
    const normalized = normalizeEvent({ title: 'Demo', start: '2026-07-21T00:00:00Z' })
    expect(normalized.end.toISOString()).toBe('2026-07-21T01:00:00.000Z')
  })

  test('rejects missing titles, invalid dates, and inverted ranges', () => {
    expect(() => normalizeEvent({ title: ' ', start: new Date() })).toThrow()
    expect(() => normalizeEvent({ title: 'Demo', start: 'not-a-date' })).toThrow()
    expect(() => normalizeEvent({ title: 'Demo', start: '2026-07-22', end: '2026-07-21' })).toThrow()
  })
})
