const dateFormat = 'Ymd'
const timeFormat = 'e:Ymd\THis'

// functions that mutate state and trigger updates
function exportCalendarApple(link: any) {
  return generateIcs(link)
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

function buildLink(propertiesAndComponents: any) {
  return `data:text/calendar;charset=utf8;base64,${base64(propertiesAndComponents)}`
}

async function generateEventUid(link: any): Promise<string> {
  // return await md5(`${link.from}${link.to}${link.title}${link.address}`)
}

export { exportCalendarApple }
