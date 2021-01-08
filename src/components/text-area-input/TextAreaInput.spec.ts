import { mount } from '@vue/test-utils';
import TextAreaInput from './TextAreaInput.vue';
import { FieldControl, TextAreaField, Validator, required } from '../../';

describe('TextAreaInput', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(TextAreaInput, {
      props: {
        control: FieldControl({
          name: 'test-input',
          ...TextAreaField({
            label: 'Test Textarea',
          }),
        }),
      },
    });
  });

  it('renders an textarea element', () => {
    const textarea = cmp.find('textarea');
    expect(textarea.exists()).toBe(true);
  });

  it(`renders an textarea with class 'form-control'`, () => {
    const textarea = cmp.find('textarea');
    expect(textarea.classes()).toContain('form-control');
  });

  it(`renders an textarea with id equal to field name`, () => {
    const textarea = cmp.find('textarea');
    expect(textarea.attributes('id')).toBe('test-input');
  });

  it(`textarea gets disabled when form control does it`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextAreaField({
          label: 'Test Textarea',
          disabled: true,
        }),
      }),
    });
    const textarea = cmp.find('textarea');
    expect(textarea.attributes('disabled')).toBe('');
  });

  it(`renders a required textarea`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextAreaField({
          label: 'Test Textarea',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    });
    const textarea = cmp.find('textarea');
    expect(textarea.attributes('required')).toBe('');
  });

  it(`sets ariaRequired when required`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextAreaField({
          label: 'Test Textarea',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    });
    const textarea = cmp.find('textarea');
    expect(textarea.attributes('ariarequired')).toBe('true');
  });

  it(`renders a readonly textarea`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextAreaField({
          label: 'Test Textarea',
          readonly: true,
        }),
      }),
    });
    const textarea = cmp.find('textarea');
    expect(textarea.attributes('readonly')).toBe('');
  });

  it(`renders an textarea with aria labels`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextAreaField({
          label: 'Test Textarea',
          ariaLabel: 'Im a test input',
        }),
      }),
    });
    const textarea = cmp.find('textarea');
    expect(textarea.attributes('arialabel')).toBe('Im a test input');
  });

  /*
  Open ticket with reproduction link on https://github.com/vuejs/vue-test-utils-next/issues

  it('emits an event when blur', async () => {
    const textarea = cmp.find('textarea');
    await textarea.trigger('blur');

    expect(cmp.emitted()).toHaveProperty('blur');
  });

  it('emits an event when focus', async () => {
    const textarea = cmp.find('textarea');
    await textarea.trigger('focus');

    expect(cmp.emitted()).toHaveProperty('focus');
  });

  */
});
