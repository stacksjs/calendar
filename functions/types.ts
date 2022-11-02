import type { Ref } from 'vue'

export interface CalendarStore {
  day: number // the Meilisearch index you would like to use for this table
  month: Ref<number> // the Meilisearch index you would like to use for this table
  year: Ref<number> // the Meilisearch index you would like to use for this table
  currentMonthYear: Ref<string> // used as table heads/column titles
  currentMonthDayYear: Ref<string> // used as table heads/column titles
  datesOfThePastMonth: Ref<number[]> // used as table heads/column titles
  datesOfTheMonth: Ref<number[]> // used as table heads/column titles
  datesOfNextMonth: Ref<number[]> // used as table heads/column titles
  currentWeekView: Ref<number[]> // used as table heads/column titles
  currentWeekViewToday: Ref<number[]> // used as table heads/column titles
}
