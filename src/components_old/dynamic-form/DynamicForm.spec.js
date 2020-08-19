import { shallowMount } from '@vue/test-utils';
import DynamicForm from './DynamicForm.vue';

import { FormField, FormValidation, required, email, min } from '@/core/utils';

describe('DynamicForm', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(DynamicForm);
  });
  it('is a Vue instance', () => {
    cmp.setProps({
      fields: [
        new FormField({
          type: 'email',
          label: 'email',
          name: 'email',
          validations: [
            new FormValidation(required, 'This field is required'),
            new FormValidation(email, 'Format of email is incorrect'),
          ],
        }),
        new FormField({
          type: 'number',
          label: 'number',
          name: 'number',
          validations: [
            new FormValidation(required, 'This field is required'),
            new FormValidation(min(3), 'The minimum of this value is %'),
          ],
        }),
      ],
    });
    expect(cmp.isVueInstance()).toBeTruthy();
  });
});
