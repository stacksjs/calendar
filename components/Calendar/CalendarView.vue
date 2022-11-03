<script setup lang="ts">
import '@unocss/reset/tailwind.css'
import type { Events } from '../../functions/types'

interface Props {
  type: string
  events: Array<Events>
}

const {
  type,
  events,
} = defineProps<Props>()
</script>

<template>
  <MonthView
    v-if="type === 'month'"
    :type="type"
    :events="events"
  />

  <WeekView
    v-if="type === 'week'"
    :type="type"
    :events="events"
  />

  <DayView
    v-if="type === 'day'"
    :type="type"
    :events="events"
  />
</template>
