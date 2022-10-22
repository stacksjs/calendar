import generateGoogle from './generators/google'
import generateIcs from './generators/ics'
import generateOutlook from './generators/weboutlook'

const link = {
  from: new Date('2022-12-12 01:00:00'),
  to: new Date('2022-12-12 05:00:00'),
  allDay: false,
  title: 'test appointment',
  description: 'test description',
}

// functions that mutate state and trigger updates
function exportCalendarGoogle() {
  return generateGoogle(link)
}

// functions that mutate state and trigger updates
function exportCalendarIcs() {
  return generateIcs(link)
}

// functions that mutate state and trigger updates
function exportOutlook() {
  return generateOutlook(link)
}

export { exportCalendarIcs, exportCalendarGoogle, exportOutlook }
