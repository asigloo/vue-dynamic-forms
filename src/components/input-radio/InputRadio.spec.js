import { shallowMount } from '@vue/test-utils';
import InputRadio from './InputRadio.vue';
import { FormControl } from '@/core/utils';

describe('InputRadio', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(InputRadio);
    cmp.setProps({
      formControl: new FormControl({
        type: 'radio',
        label: 'Gender',
        name: 'gender',
        options: [
          { text: 'Male', value: 0 },
          { text: 'Female', value: 1 },
          { text: 'Genderless', value: -1 },
        ],
      }),
    });
  });
  it('is a Vue instance', () => {
    expect(cmp.isVueInstance()).toBeTruthy();
  });
});
