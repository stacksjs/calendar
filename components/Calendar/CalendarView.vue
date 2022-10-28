<script setup lang="ts">
import '@unocss/reset/tailwind.css'

interface Props {
  type: string
}

const {
  type,
} = defineProps<Props>()
</script>

<template>
  <MonthView
    v-if="type === 'month'"
    :type="type"
  />

  <WeekView
    v-if="type === 'week'"
    :type="type"
  />

  <DayView v-if="type === 'day'" />
</template>
