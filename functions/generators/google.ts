const dateFormat = 'YYYYMMDD'
const timeFormat = 'YYYYMMDDThhmmss'

function generateGoogle(link: any): string {
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

  return url
}

function convertTZ(date: string, tzString: string): Date {
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }))
}

export default generateGoogle
