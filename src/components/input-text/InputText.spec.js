import { shallowMount } from '@vue/test-utils';
import InputText from './InputText.vue';

describe('InputText', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(InputText);
  });
  it('is a Vue instance', () => {
    expect(cmp.isVueInstance()).toBeTruthy();
  });
});
