import { createStore } from "vuex";

export default createStore({
  state: {
    monthlyDays: [{}],
    openScheduleWindow: null,
    currentReminder: {}
  },
  mutations: {
    SET_MONTHLY_DAYS(state, payload) {
      state.monthlyDays = payload;
    },
    SET_SCHEDULE_WINDOW(state, payload) {
      state.openScheduleWindow = payload;
    },
    SET_CURRENT_REMINDER(state, payload) {
      state.currentReminder = payload;
    }
  },
  actions: {
    setMonthlyDays(context, payload) {
      context.commit('SET_MONTHLY_DAYS', payload)
    },
    setScheduleWindowState(context, payload) {
      context.commit('SET_SCHEDULE_WINDOW', payload);
    },
    setCurrentReminder(context, payload) {
      context.commit('SET_CURRENT_REMINDER', payload);
    }
  }
})