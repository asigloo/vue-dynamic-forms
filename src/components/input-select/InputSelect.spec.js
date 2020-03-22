import { shallowMount } from '@vue/test-utils';
import { FormControl } from '@/core/utils/form-control.model.js';

import InputSelect from './InputSelect.vue';

describe('InputSelect', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(InputSelect);
    cmp.setProps({
      formControl: new FormControl({
        type: 'select',
        label: 'Category',
        name: 'category',
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'arduino', text: 'Arduino' },
          { value: 'transistors', text: 'Transistors' },
        ],
      }),
    });
  });
  it('is a Vue instance', () => {
    expect(cmp.isVueInstance()).toBeTruthy();
  });
});
