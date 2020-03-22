import { shallowMount } from '@vue/test-utils';
import { FormControl } from '@/core/utils';
import InputCheckbox from './InputCheckbox.vue';

describe('InputCheckbox', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(InputCheckbox);
    cmp.setProps({
      formControl: new FormControl({
        type: 'checkbox',
        label: 'Read the conditions',
        name: 'conditions',
        inline: false,
      }),
    });
  });
  it('is a Vue instance', () => {
    expect(cmp.isVueInstance()).toBeTruthy();
  });
});
