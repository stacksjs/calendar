<script setup lang="ts">
import type { Events } from '../functions/types'

const events: Array<Events> = [
  {
    date: '5-16-2022',
    title: 'test title',
    description: 'test description',
    month: 5,
    day: 16,
    year: 2022,
    time: {
      from: '1:00 AM',
      to: '1:00 PM',
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
      from: '8:15 AM',
      to: '10:00 AM',
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
      from: '7:05 PM',
      to: '9:00 PM',
    },
  },
  {
    date: '11-16-2022',
    title: 'test title',
    description: 'test description',
    month: 11,
    day: 16,
    year: 2022,
    time: {
      from: '1:15 PM',
      to: '6:00 PM',
    },
  },
  {
    date: '12-5-2022',
    title: 'test title',
    description: 'test description',
    month: 12,
    day: 5,
    year: 2022,
    time: {
      from: '12:12 PM',
      to: '2:00 PM',
    },
  },

]
</script>

<template>
  <CalendarView
    type="month"
    :events="events"
  />
</template>
