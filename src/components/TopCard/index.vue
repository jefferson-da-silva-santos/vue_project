<script setup lang="ts">
import Card from 'primevue/card'

defineProps<{
  title: string
  value: string
}>()
</script>

<template>
  <Card class="top-card">
    <template #title>
      {{ title }}
    </template>

    <template #content>
      {{ value }}
    </template>
  </Card>
</template>
