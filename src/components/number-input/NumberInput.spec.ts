import { shallowMount } from '@vue/test-utils';
import NumberInput from './NumberInput.vue';
import { FieldControl, NumberField, Validator, required } from '../../index';

describe('Numberinput', () => {
  let cmp;

  beforeEach(() => {
    cmp = shallowMount(NumberInput, {
      props: {
        control: FieldControl({
          name: 'test-input',
          ...NumberField({
            label: 'Test Input',
          }),
        }),
      },
    });
  });

  it('renders an input of type number', () => {
    const input = cmp.find('input[type="number"]');
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
        ...NumberField({
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
        ...NumberField({
          label: 'Test Input',
          placeholder: 'Nº',
        }),
      }),
    });
    const input = cmp.find('input');
    expect(input.attributes('placeholder')).toBe('Nº');
  });

  it(`renders a required input`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...NumberField({
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
        ...NumberField({
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
        ...NumberField({
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
        ...NumberField({
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
        ...NumberField({
          label: 'Test Input',
          ariaLabel: 'Im a test input',
        }),
      }),
    });
    const input = cmp.find('input');
    expect(input.attributes('arialabel')).toBe('Im a test input');
  });

  it(`renders an input with min attribute`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...NumberField({
          label: 'Test Input',
          min: 50,
        }),
      }),
    });
    const input = cmp.find('input');
    expect(input.attributes('min')).toBe('50');
  });

  it(`renders an input with max attribute`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...NumberField({
          label: 'Test Input',
          max: 100,
        }),
      }),
    });
    const input = cmp.find('input');
    expect(input.attributes('max')).toBe('100');
  });

  it(`renders an input with step attribute`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...NumberField({
          label: 'Test Input',
          step: 5,
        }),
      }),
    });
    const input = cmp.find('input');
    expect(input.attributes('step')).toBe('5');
  });

  /*
  Open ticket with reproduction link on https://github.com/vuejs/vue-test-utils-next/issues

  it('emits an event when value changed', async () => {
    const input = cmp.find('input');
    await input.setValue(2);

    expect(cmp.emitted()).toHaveProperty('change');
    expect(cmp.emitted('change')[0][0].value).toBe('2');
    expect(cmp.emitted('change')[0][0].name).toBe('test-input');
  });

  it('emits the control name when value change', async () => {
    const input = cmp.find('input');
    await input.setValue(2);

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
  */
});
