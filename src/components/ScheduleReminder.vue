<template>
  <div class="reminder">
    <p>Add new reminder</p>
    <span>Choose a color to your reminder:</span>
    <input class="color-picker" type="color" v-model="reminder.color"/>
    <div class="horizontal-line" />

    <p>Title: {{reminder.title}}</p>
    <input type="text" v-model="reminder.title" maxlength="20"/>
    {{inputError}}

    <p>Description: {{reminder.description}}</p>
    <input type="text" v-model="reminder.description" maxlength="30"/>
    {{inputError}}
    <div class="horizontal-line" />

    <p>When? {{reminder.date}}</p>
    <Datepicker v-model="reminder.date" />
    <div class="horizontal-line" />

    <button class="cancel">Cancel</button>
    <button class="save">Save</button>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'ScheduleReminder',
  components: {
    Datepicker
  },
  data() {
    return {
      reminder: {},
      inputError: null
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
  border: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: .5rem;
  margin-left: .2rem;
  cursor: pointer;

  &.cancel {
    background: none;
  }
}

.reminder {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
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
  margin: 2rem 0;
  border-bottom: 1px solid black;
  width: 100%;
}
</style>
