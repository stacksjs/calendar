<script setup lang="ts">
import type { Events } from '../functions/types'

const events: Array<Events> = [
  {
    date: '12-8-2022',
    title: 'test title',
    description: 'test description',
    month: 12,
    day: 8,
    year: 2022,
    time: {
      from: '2:00PM',
      to: '3:00PM',
    },
  },

  {
    date: '11-8-2022',
    title: 'test title',
    description: 'test description',
    month: 11,
    day: 8,
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
  // {
  //   date: '11-5-2022',
  //   title: 'test title',
  //   description: 'test description',
  //   month: 11,
  //   day: 5,
  //   year: 2022,
  //   time: {
  //     from: '5:00PM',
  //     to: '6:00PM',
  //   },
  // },
  {
    date: '11-12-2022',
    title: 'test title',
    description: 'test description',
    month: 11,
    day: 12,
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
    type="week"
    :events="events"
  />
</template>
