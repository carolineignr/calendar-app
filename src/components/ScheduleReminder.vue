<template>
  <div class="reminder">
    <p>{{reminder.title || reminder.description || 'Add new reminder'}}</p>
    <span>{{reminder.description}}</span>
    <div>
      Choose a color to your reminder:
      <input class="color-picker" type="color" v-model="reminder.color"/>
    </div>
    <div class="horizontal-line" />

    <p>Title: </p>
    <input type="text" id="title" v-model="reminder.title" maxlength="20"/>
    {{inputError}}

    <p>Description: </p>
    <input type="text" id="description" v-model="reminder.description" maxlength="30"/>
    {{inputError}}
    <div class="horizontal-line" />

    <p>When?</p>
    {{reminder.date}}
    <Datepicker v-model="reminder.date" />

    <p>Where?</p>
    {{reminder.city}}
    <input type="text" id="autocomplete"/>
    <div class="horizontal-line" />

    <div>
      <button id="cancel" @click="closeWindow">Cancel</button>
      <button id="save" @click="saveSchedule">Save</button>
    </div>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'ScheduleReminder',
  components: {
    Datepicker
  },
  data() {
    return {
      reminder: {},
      inputError: null,
      city: ''
    }
  },
  beforeMount() {
    this.reminder = this.existentReminder;
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.city = new google.maps.places.Autocomplete(document.getElementById("autocomplete"));
  },
  methods: {
    saveSchedule() {
      try {
        const chosenDay = this.getDayToUpdate();
        this.reminder.color = this.reminder.color || '#000';
        this.reminder.city = this.city.getPlace().formatted_address;

        if (this.reminder.id >= 0) {
          let existentReminder = chosenDay.schedules
            .findIndex(reminder => reminder.id === this.existentReminder.id);
          
          chosenDay.schedules[existentReminder] = this.reminder;
        } else {
          const lastIndex = chosenDay.schedules.length;
          this.reminder.id = lastIndex;

          chosenDay.schedules = [...chosenDay.schedules, this.reminder];
        }

        console.log(this.reminder);
        this.$store.dispatch('setMonthlyDays', this.monthlyDays);
        this.$store.dispatch('setCurrentReminder', {})
      } catch (e) {
        console.log(e);
      } finally {
        this.$store.dispatch('setScheduleWindowState', false);
      }
    },
    getDayToUpdate() {
      return this.monthlyDays.find(day => day.currentMonthDay === this.reminder.date.getDate())
    },
    closeWindow() {
      this.$store.state.openScheduleWindow = false;
    }
  },
  computed: {
    monthlyDays() {
      return this.$store.state.monthlyDays;
    },
    existentReminder() {
      return this.$store.state.currentReminder;
    }
  }
}
</script>

<style scoped lang="scss">
p {
  margin: 0.5rem 0;
  font-weight: 500;
}

input[type=text] {
  border-radius: 4px;
  padding: .5rem;
  width: 15rem;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

button {
  padding: .5rem;
  margin-left: .2rem;
  cursor: pointer;

  &#cancel {
    background: none;
  }
}

.reminder {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  margin: 0 1rem;

  span {
    font-size: .8rem;
  }
}

.color-picker {
  margin: 0 1rem;
  border-radius: 50%;
  height: 1.5rem;
  width: 1.5rem;
  border: none;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }
}

.horizontal-line {
  margin: 1rem 0;
  border-bottom: 1px solid #000;
  width: 100%;
}
</style>
