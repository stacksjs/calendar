# @stacksjs/calendar

Dependency-free add-to-calendar links and RFC 5545 event generation for Google Calendar, Outlook, Office 365, Yahoo Calendar, Apple Calendar, and any application that imports ICS files.

## Install

```bash
bun add @stacksjs/calendar
```

## Create every calendar link

```ts
import { createCalendarLinks } from '@stacksjs/calendar'

const links = createCalendarLinks({
  title: 'Stacks Launch',
  start: '2026-07-21T17:00:00-07:00',
  end: '2026-07-21T18:30:00-07:00',
  description: 'Launch notes, demos, and questions',
  location: 'Playa Vista, CA',
  timezone: 'America/Los_Angeles',
  url: 'https://stacksjs.org/launch',
})

links.google
links.outlook
links.office365
links.yahoo
links.ics
links.icsDataUrl
```

Provider-specific functions are also exported:

```ts
import {
  createIcs,
  createIcsDataUrl,
  googleCalendarUrl,
  office365CalendarUrl,
  outlookCalendarUrl,
  yahooCalendarUrl,
} from '@stacksjs/calendar'
```

## All-day events

An omitted all-day end date means one day. Explicit all-day end dates are exclusive, matching Google Calendar and RFC 5545 semantics.

```ts
const conference = createCalendarLinks({
  title: 'Stacks Conference',
  start: '2026-09-14',
  end: '2026-09-17',
  allDay: true,
})
```

This event covers September 14, 15, and 16.

## ICS files

`createIcs` returns standards-compatible calendar text with CRLF line endings, escaped text, deterministic event UIDs, exclusive all-day end dates, and UTF-8-aware 75-octet line folding.

```ts
const ics = createIcs(event, {
  productId: '-//Acme//Events//EN',
})
```

`createIcsDataUrl` returns an encoded URL suitable for a download link. It uses percent encoding instead of `btoa`, so Unicode titles and descriptions remain valid.

## Date behavior

- Timed events are emitted as UTC instants.
- A timed event without `end` lasts 60 minutes by default.
- Use `durationMinutes` to select another default duration.
- Invalid dates, empty titles, non-positive durations, and end times before start throw descriptive errors.
- `timezone` is forwarded to providers that support an explicit display timezone.

## Development

```bash
bun install
bun test
bun run test:types
bun run lint
bun run build
```

## License

MIT
