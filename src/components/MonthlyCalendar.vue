<template>
  <div class="calendar">
    <div class="header">
      <span v-for="(day, index) in WEEKDAYS" :key="index">{{day}}</span>
    </div>
    <div class="body">
      <div 
        v-for="(day, index) in monthlyDays" 
        :key="index" 
        class="contentGrid"
        :style="(day.currentMonthDay === 1) ? {'grid-column-start': day.weekDay + 1} : ''"
      >
        {{day.currentMonthDay}}
        <span 
          v-show="isCurrentDay(day.currentMonthDay)"
          class="currentDay"
        >
          Today
        </span>
        <div v-for="(reminder,index) in day.schedules.slice(0, 2)" :key="index">
          <div class="reminderColor" :style="{'background-color': reminder.color}"/>
          <span @click="updateReminder(reminder)">{{reminder.title}}</span>
        </div>
        <span v-if="day.schedules.length > 2">...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonthlyCalendar',
  data() {
    return { 
      WEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      currentMonthDay: null
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
      const firstMonthDay = new Date(this.date.getFullYear(), this.date.getMonth());
      let weekDay = firstMonthDay.getDay();
      let currentMonthDay = firstMonthDay.getDate();
      const days = []

      for (let i = 0; i < daysInCurrentMonth; i++) {
        days[i] = {currentMonthDay, weekDay, schedules: []};
        
        currentMonthDay++;
        weekDay = (weekDay === 6) ? 0 : weekDay++;
      }

      this.$store.dispatch('setMonthlyDays', days);
    },
    isCurrentDay(day) {
      return day === this.date.getDate();
    },
    updateReminder(reminder) {
      this.$store.dispatch('setCurrentReminder', reminder)
      this.$store.dispatch('setScheduleWindowState', true);
    }
  },
  computed: {
    monthlyDays() {
      return this.$store.state.monthlyDays;
    }
  }
}
</script>

<style scoped lang="scss">
.header, .body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid #ddd;
  border-radius: 4px;
}

.header {
  margin-bottom: .5rem;
  padding: .2rem .4rem;
  background-color: cornflowerblue;

  span {
    margin-left: .2rem
  }

  span:not(:last-child) {
    border-right: 1px solid #000;
  }
}

.body {
  .contentGrid {
    background-color: #fff;
    height: 5rem;
    width: 5rem;
    padding: .4rem;

    span:not(.currentDay) {
      font-size: .7rem;
      cursor: pointer;
    }

    .currentDay {
      color: cornflowerblue;
      font-size: .8rem;
    }
  }
}

.calendar {
  margin: 0 1rem;
}

.reminderColor {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-right: .2rem;
}

.reminderTitle {
  font-size: .5rem;
}
</style>
