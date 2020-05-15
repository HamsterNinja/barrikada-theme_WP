import { mount } from '@vue/test-utils';

import Vue from 'vue';
import stockPopup from '@/components/stockPopup.vue'

describe('stockPopup.vue', () => {
   it('является экземпляром Vue', () => {
     const wrapper = mount(stockPopup)
     expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('Popup закрылся', () => {
    const wrapper = mount(stockPopup);
    const button = wrapper.find('.button--remove-popup');
    button.trigger('click');
    expect(wrapper.vm.showPopup).toBe(false)
  })

})