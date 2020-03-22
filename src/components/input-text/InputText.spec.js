import { shallowMount } from '@vue/test-utils';
import { FormControl } from '@/core/utils';

import InputText from './InputText.vue';

describe('InputText', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(InputText);
    cmp.setProps({
      formControl: new FormControl({
        type: 'text',
        label: 'Name',
        name: 'name',
      }),
    });
  });
  it('is a Vue instance', () => {
    expect(cmp.isVueInstance()).toBeTruthy();
  });
});
