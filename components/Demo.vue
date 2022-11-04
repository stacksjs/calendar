<script setup lang="ts">
import type { Events } from '../functions/types'

const events: Array<Events> = [
  {
    date: '10-30-2022',
    title: 'test title',
    description: 'test description',
    month: 10,
    day: 30,
    year: 2022,
    time: {
      from: '2:00PM',
      to: '3:00PM',
    },
  },

  {
    date: '10-31-2022',
    title: 'test title',
    description: 'test description',
    month: 10,
    day: 31,
    year: 2022,
    time: {
      from: '8:00AM',
      to: '9:00AM',
    },
  },

  {
    date: '11-1-2022',
    title: 'test title',
    description: 'test description',
    month: 11,
    day: 1,
    year: 2022,
    time: {
      from: '5:00PM',
      to: '6:00PM',
    },
  },
  {
    date: '11-2-2022',
    title: 'test title',
    description: 'test description',
    month: 11,
    day: 2,
    year: 2022,
    time: {
      from: '5:00PM',
      to: '6:00PM',
    },
  },
  {
    date: '11-4-2022',
    title: 'test title',
    description: 'test description',
    month: 11,
    day: 4,
    year: 2022,
    time: {
      from: '12:00PM',
      to: '01:00PM',
    },
  },
]
</script>

<template>
  <CalendarView
    type="day"
    :events="events"
  />
</template>
