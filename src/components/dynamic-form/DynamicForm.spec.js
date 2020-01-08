import { shallowMount } from '@vue/test-utils';
import DynamicForm from './DynamicForm.vue';

import Validators from '@/core/utils/validators';

describe('DynamicForm', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(DynamicForm);
    cmp.setProps({
      fields: [
        {
          type: 'email',
          label: 'email',
          name: 'email',
          validations: [Validators.required, Validators.email],
          errorTexts: {
            required: 'This field is required',
            email: 'Format of email is incorrect',
          },
          value: null,
        },
        {
          type: 'number',
          label: 'number',
          name: 'number',
          validations: [Validators.required, Validators.min(3)],
          helperText: 'You can enter jon.doe@gmail.com',
          errorTexts: {
            required: 'This field is required',
            min: 'The minimum of this value is %',
          },
          value: null,
        },
      ],
    });
  });
  it('is a Vue instance', () => {
    expect(cmp.isVueInstance()).toBeTruthy();
  });
});
