import { shallowMount } from '@vue/test-utils';
import TextInput from './TextInput.vue';
import { FieldControl, TextField } from '@/core/factories';

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

  test('renders an input of type text', () => {
    const input = cmp.find('input[type="text"]');
    expect(input.exists()).toBe(true);
  });

  test(`renders an input with class 'form-control'`, () => {
    const input = cmp.find('input');
    expect(input.classes()).toContain('form-control');
  });
  test(`renders an input with id equal to field name`, () => {
    const input = cmp.find('input');
    expect(input.attributes('id')).toBe('test-input');
  });

  test(`input gets disabled when form control does it`, async () => {
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

  test(`renders an input with placeholder`, async () => {
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

  test(`renders a required input`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          required: true,
        }),
      }),
    });
    const input = cmp.find('input');
    expect(input.attributes('required')).toBe('');
  });

  test(`sets ariaRequired when required`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
          required: true,
        }),
      }),
    });
    const input = cmp.find('input');
    expect(input.attributes('ariaRequired')).toBe('');
  });

  test(`renders a readonly input`, async () => {
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

  test(`renders a input with autocomplete`, async () => {
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

  test(`renders an input with aria labels`, async () => {
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
    expect(input.attributes('ariaLabel')).toBe('Im a test input');
  });

  test('emits an event when value changed', async () => {
    const input = cmp.find('input');
    await input.setValue('Awiwi');

    expect(cmp.emitted()).toHaveProperty('change');
    expect(cmp.emitted('change')[0][0].value).toBe('Awiwi');
    expect(cmp.emitted('change')[0][0].name).toBe('test-input');
  });

  test('emits the control name when value change', async () => {
    const input = cmp.find('input');
    await input.setValue('Awiwi');

    expect(cmp.emitted('change')[0][0].name).toBe('test-input');
  });

  test('emits an event when blur', async () => {
    const input = cmp.find('input');
    await input.trigger('blur');

    expect(cmp.emitted()).toHaveProperty('blur');
  });

  test('emits an event when focus', async () => {
    const input = cmp.find('input');
    await input.trigger('focus');

    expect(cmp.emitted()).toHaveProperty('focus');
  });
});
