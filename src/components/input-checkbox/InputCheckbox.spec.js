import { shallowMount } from '@vue/test-utils';
import InputCheckbox from './InputCheckbox.vue';

describe('InputCheckbox', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(InputCheckbox);
  });
  it('is a Vue instance', () => {
    expect(cmp.isVueInstance()).toBeTruthy();
  });
});
