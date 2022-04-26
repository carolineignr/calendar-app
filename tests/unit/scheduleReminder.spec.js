import { mount } from '@vue/test-utils'
import ScheduleReminder from '@/components/ScheduleReminder.vue';
import store from '@/store/index.js';

describe('ScheduleReminder', () => {
  it('render scheduled reminder', async () => {
    const wrapper = mount(ScheduleReminder, {
      global: {
        plugins: [store]
      }
    });
    
    const reminderTitle = 'Title to test'
    const inputTitle = wrapper.find('#title');
    inputTitle.setValue(reminderTitle);

    const inputDescription = wrapper.find('#description');
    inputDescription.setValue('reminder description');

    wrapper.setData({
      reminder: {
        date: new Date()
      }
    });

    await wrapper.find('#save').trigger('click');
    expect(wrapper.html()).toContain(reminderTitle);
  })
})
