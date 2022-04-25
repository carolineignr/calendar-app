<template>
  <header>
    <CalendarHeader :month="currentMonthName"/>
  </header>
  <section>
    <MonthlyCalendar :date="currentDate"/>
    <ScheduleReminder v-show="showScheduleReminder"/>
  </section>
</template>

<script>
import MonthlyCalendar from './components/MonthlyCalendar.vue';
import CalendarHeader from './components/CalendarHeader.vue';
import ScheduleReminder from './components/ScheduleReminder.vue';

export default {
  name: 'App',
  data() {
    return {
      currentDate: null,
      currentMonthName: null,
      showScheduleReminder: true
    }
  },
  beforeMount() {
    this.currentDate = new Date();
  },
  watch: {
    currentDate() {
      if (this.currentDate) {
        this.currentMonthName = this.currentDate
          .toLocaleString('default', { month: 'long'});
      }
    }
  },
  components: {
    CalendarHeader,
    MonthlyCalendar,
    ScheduleReminder
  }
}
</script>

<style>
html, body {
  margin: 0 auto;
  padding: 0;
  color: #262d35;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

section {
  display: flex;
}
</style>
