// the TableStore interface is primarily used with regards to how to persist the data to localStorage
export interface CalendarStore {
  day: Number // the Meilisearch index you would like to use for this table
  currentMonthYear: string // used as table heads/column titles
  datesOfThePastMonth: number[] // used as table heads/column titles
  datesOfTheMonth: number[] // used as table heads/column titles
  datesOfNextMonth: number[] // used as table heads/column titles
}
