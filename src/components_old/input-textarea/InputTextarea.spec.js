import { shallowMount } from '@vue/test-utils';
import InputTextarea from './InputTextarea.vue';
import { FormControl } from '@/core/utils';

describe('InputTextarea', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(InputTextarea);
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
