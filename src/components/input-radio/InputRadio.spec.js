import { shallowMount } from '@vue/test-utils';
import InputRadio from './InputRadio.vue';

describe('InputRadio', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(InputRadio);
  });
  it('is a Vue instance', () => {
    expect(cmp.isVueInstance()).toBeTruthy();
  });
});
