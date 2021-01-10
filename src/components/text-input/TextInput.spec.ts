import { shallowMount } from '@vue/test-utils';
import TextInput from './TextInput.vue';
import { FieldControl, TextField, Validator, required } from '../../index';

describe('TextInput', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(TextInput, {
      props: {
        control: FieldControl({
          name: 'test-input',
          ...TextField({
            label: 'Test Input',
          }),
        }),
      },
    });
  });

  it('renders an input of type text', () => {
    const input = cmp.find('input[type="text"]');
    expect(input.exists()).toBe(true);
  });

  it(`renders an input with class 'form-control'`, () => {
    const input = cmp.find('input');
    expect(input.classes()).toContain('form-control');
  });

  it(`renders an input with id equal to field name`, () => {
    const input = cmp.find('input');
    expect(input.attributes('id')).toBe('test-input');
  });

  it(`input gets disabled when form control does it`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          disabled: true,
        }),
      }),
    });
    const input = cmp.find('input');
    expect(input.attributes('disabled')).toBe('');
  });

  it(`renders an input with placeholder`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          placeholder: 'This is not a test',
        }),
      }),
    });
    const input = cmp.find('input');
    expect(input.attributes('placeholder')).toBe('This is not a test');
  });

  it(`renders a required input`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    });
    const input = cmp.find('input');
    expect(input.attributes('required')).toBe('');
  });

  it(`sets ariaRequired when required`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    });
    const input = cmp.find('input');
    expect(input.attributes('ariarequired')).toBe('true');
  });

  it(`renders a readonly input`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          readonly: true,
        }),
      }),
    });
    const input = cmp.find('input');
    expect(input.attributes('readonly')).toBe('');
  });

  it(`renders a input with autocomplete`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          autocomplete: 'username',
        }),
      }),
    });
    const input = cmp.find('input');
    expect(input.attributes('autocomplete')).toBe('username');
  });

  it(`renders an input with aria labels`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          ariaLabel: 'Im a test input',
        }),
      }),
    });
    const input = cmp.find('input');
    expect(input.attributes('arialabel')).toBe('Im a test input');
  });
  /*
  Open ticket with reproduction link on https://github.com/vuejs/vue-test-utils-next/issues

  it('emits an event when value changed', async () => {
    const input = cmp.find('input');
    await input.setValue('Awiwi');

    expect(cmp.emitted()).toHaveProperty('change');
    expect(cmp.emitted('change')[0][0].value).toBe('Awiwi');
  });

  it('emits the control name when value change', async () => {
    const input = cmp.find('input');
    await input.setValue('Awiwi');

    expect(cmp.emitted('change')[0][0].name).toBe('test-input');
  });

  it('emits an event when blur', async () => {
    const input = cmp.find('input');
    await input.trigger('blur');

    expect(cmp.emitted()).toHaveProperty('blur');
  });

  it('emits an event when focus', async () => {
    const input = cmp.find('input');
    await input.trigger('focus');
    expect(cmp.emitted()).toHaveProperty('focus');
  });

  it('renders form errors when invalid', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
        dirty: true,
        valid: false,
        forceValidation: true,
        errors: {
          required: {
            text: 'This field is required',
            value: true,
          },
        },
      }),
    });

    const errors = cmp.findAll('.form-error');
    expect(errors.length).toBeGreaterThan(0);
  }); */
});
