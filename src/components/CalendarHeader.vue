<template>
  <p class="name">
    {{formattedMonthName()}}
  </p>
  <button @click="openScheduleReminder">New reminder</button>
</template>

<script>
export default {
  name: 'CalendarHeader',
  props: {
    month: String
  },
  methods: {
    formattedMonthName() {
      return this.month.charAt(0).toUpperCase() + this.month.slice(1);
    },
    openScheduleReminder() {
      this.$store.dispatch('setScheduleWindowState', true);
    }
  }
}
</script>

<style scoped>
.name {
  font-size: 1.5rem;
}
</style>
