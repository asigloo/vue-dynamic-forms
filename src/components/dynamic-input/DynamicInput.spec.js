import { shallowMount } from '@vue/test-utils';
import DynamicInput from './DynamicInput.vue';

describe('DynamicInput', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(DynamicInput);
  });
  it('is a Vue instance', () => {
    expect(cmp.isVueInstance()).toBeTruthy();
  });
});
