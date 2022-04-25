<template>
  <div class="container">
    <header>
      <CalendarHeader :month="currentMonthName"/>
    </header>
    <section>
      <MonthlyCalendar :date="currentDate"/>
      <ScheduleReminder v-if="showScheduleReminder"/>
    </section>
  </div>
</template>

<script>
import MonthlyCalendar from './components/MonthlyCalendar.vue';
import CalendarHeader from './components/CalendarHeader.vue';
import ScheduleReminder from './components/ScheduleReminder.vue';

export default {
  name: 'App',
  components: {
    CalendarHeader,
    MonthlyCalendar,
    ScheduleReminder
  },
  data() {
    return {
      currentDate: null,
      currentMonthName: null,
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
  computed: {
    showScheduleReminder() {
      return this.$store.state.openScheduleWindow;
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

* {
  font-family: 'Merriweather', Arial, sans-serif;
}

html, body {
  margin: 0 auto;
  padding: 0;
  height: 100%;
  color: #262d35;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

section {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
}

@media (max-width: 1060px) {
  section {
    flex-direction: column;
    align-items: stretch;
  }
}

.container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  margin-top: 2rem ;
}
</style>
