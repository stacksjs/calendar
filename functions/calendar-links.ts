/* eslint-disable @typescript-eslint/no-unused-vars */
const dateFormat = 'YYYYMMDD'
const timeFormat = 'YYYYMMDDThhmmss'

// functions that mutate state and trigger updates
function exportCalendarApple(link: any) {
  return generateIcs(link)
}

// functions that mutate state and trigger updates
function exportCalendarGoogle() {
  const link = {
    from: new Date('2022-12-12 01:05:05'),
    to: new Date('2022-12-12 05:05:05'),
    allDay: false,
    title: 'test appointment',
    description: 'test description',
  }

  return generateGoogle(link)
}

function generateIcs(link: any) {
  const uid = `UID:${generateEventUid(link)}`
  const summary = `SUMMARY:${link.title}`

  const url = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0', // @see https://datatracker.ietf.org/doc/html/rfc5545#section-3.7.4
    'PRODID:Spatie calendar-links', // @see https://datatracker.ietf.org/doc/html/rfc5545#section-3.7.3
    'BEGIN:VEVENT',
    uid,
    summary,
  ]

  const dateTimeFormat = link.allDay ? dateFormat : timeFormat

  if (link.allDay) {
    url.push(`DTSTAMP;TZID=${link.from}`)
    url.push(`DTSTART:${link.from}`)
    url.push(`DURATION:P${(max(1, link.from.diff(link.to).days))}D`)
  }
  else {
    url.push(`DTSTAMP;TZID=${link.from}`)
    url.push(`DTSTART;TZID=${link.from}`)
    url.push(`DTEND;TZID=${link.to}`)
  }

  if (link.description)
    url.push(`X-ALT-DESC;FMTTYPE=text/html:${link.description}`)

  if (link.address)
    url.push(`LOCATION:${link.address}`)

  // if (isset($this->options['URL'])) {
  //     $url[] = 'URL;VALUE=URI:'.$this->options['URL'];
  // }

  url.push('END:VEVENT')
  url.push('END:VCALENDAR')

  return buildLink(url)
}

function generateGoogle(link: any) {
  // 20221020T170000Z/20221020T173000Z

  let url = 'https://calendar.google.com/calendar/render?action=TEMPLATE'

  const utcStartDateTime = convertTZ(link.from, 'UTC') // set timezone to UTC
  const utcEndDateTime = convertTZ(link.to, 'UTC') // set timezone to UTC
  const dateTimeFormat = link.allDay ? dateFormat : timeFormat

  url = `${url}&dates=${useDateFormat(utcStartDateTime, dateTimeFormat).value}/${useDateFormat(utcEndDateTime, dateTimeFormat).value}`

  // Add timezone name if it is specified in both from and to dates and is the same for both
  //    if (
  //     $link->from->getTimezone() && $link->to->getTimezone()
  //     && $link->from->getTimezone()->getName() === $link->to->getTimezone()->getName()
  // ) {
  url = `${url}&ctz=EST`
  // }

  url = `${url}&text=${encodeURIComponent(link.title)}`

  if (link.description)
    url = `${url}&details=${encodeURIComponent(link.description)}`

  if (link.address)
    url = `${url}&location=${encodeURIComponent(link.address)}`

  console.log(url)
  return url
}

function convertTZ(date: string, tzString: string): Date {
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }))
}

function buildLink(propertiesAndComponents: any) {
  return `data:text/calendar;charset=utf8;base64,${base64(propertiesAndComponents)}`
}

async function generateEventUid(link: any): Promise<string> {
  // return await md5(`${link.from}${link.to}${link.title}${link.address}`)
}

export { exportCalendarApple, exportCalendarGoogle }
