<template>
  <div class="calendar-columns">
    <div class="header">
      <span v-for="(day, index) in weekDays" :key="index">{{day}}</span>
    </div>
    <div class="body">
      <div 
        v-for="(day, index) in monthlyDays" 
        :key="index" 
        class="contentGrid"
        :style="(day.monthDay === 1) ? {'grid-column-start': day.weekDay + 1} : ''"
        @click="scheduleDay(day.monthDay)"
      >
        {{day.monthDay}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonthlyCalendar',
  data() {
    return { 
      weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      monthlyDays: [],
      firstWeekDay: null,
      firstMonthDay: null,
      openSchedule: false
    }
  },
  props: {
    date: Date
  },
  beforeMount() {
    this.mountMonth();
  },
  methods: {
    mountMonth() {
      const dateToCalculateDays = new Date(this.date.getFullYear(), this.date.getMonth(), 32);
      const daysInCurrentMonth = 32 - dateToCalculateDays.getDate();

      this.firstMonthDay = new Date(this.date.getFullYear(), this.date.getMonth());
      let monthDay = this.firstMonthDay.getDate();
      let weekDay = this.firstMonthDay.getDay();
      this.firstWeekDay = weekDay;

      for (let i = 0; i < daysInCurrentMonth; i++) {
        this.monthlyDays[i] = {monthDay, weekDay};
        monthDay++;
        weekDay = (weekDay === 6) ? 0 : weekDay++;
      }
    },
    scheduleDay(day) {
      console.log('cliquei no dia', day)
    }
  }
}
</script>

<style scoped lang="scss">
.header, .body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 0.5px solid black;
}

.header > span {
  background-color: cornflowerblue;
}

.body {
  background-color: #262d354d;

  .contentGrid {
    background-color: white;
  }
}
</style>
