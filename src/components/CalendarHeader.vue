<template>
  <div>
    {{formattedMonthName()}}
  </div>
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
    }
  }
}
</script>

<style scoped>
</style>
