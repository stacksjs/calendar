import type { Ref } from 'vue'

export interface CalendarStore {
  day: Number // the Meilisearch index you would like to use for this table
  month: Ref<Number> // the Meilisearch index you would like to use for this table
  year: Ref<Number> // the Meilisearch index you would like to use for this table
  currentMonthYear: Ref<string> // used as table heads/column titles
  datesOfThePastMonth: Ref<Number[]> // used as table heads/column titles
  datesOfTheMonth: Ref<Number[]> // used as table heads/column titles
  datesOfNextMonth: Ref<Number[]> // used as table heads/column titles
  currentWeekView: Ref<Number[]> // used as table heads/column titles
}
