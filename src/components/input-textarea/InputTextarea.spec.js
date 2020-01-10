import { shallowMount } from '@vue/test-utils';
import InputTextarea from './InputTextarea.vue';

describe('InputTextarea', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(InputTextarea);
  });
  it('is a Vue instance', () => {
    expect(cmp.isVueInstance()).toBeTruthy();
  });
});
