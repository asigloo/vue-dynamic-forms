import { shallowMount } from '@vue/test-utils';
import InputSelect from './InputSelect.vue';

describe('InputSelect', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(InputSelect);
  });
  it('is a Vue instance', () => {
    expect(cmp.isVueInstance()).toBeTruthy();
  });
});
