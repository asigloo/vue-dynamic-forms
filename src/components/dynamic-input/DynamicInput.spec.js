import { shallowMount } from '@vue/test-utils';
import DynamicInput from './DynamicInput.vue';
import { FormControl } from '@/core/utils';

describe('DynamicInput', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(DynamicInput);
    cmp.setProps({
      formControl: new FormControl({
        type: 'textarea',
        label: 'Bio',
        name: 'bio',
      }),
    });
  });
  it('is a Vue instance', () => {
    expect(cmp.isVueInstance()).toBeTruthy();
  });
});
