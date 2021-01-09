import { mount } from '@vue/test-utils';
import CheckboxInput from './CheckboxInput.vue';
import { FieldControl, CheckboxField } from '../../index';

describe('CheckboxInput', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(CheckboxInput, {
      props: {
        control: FieldControl({
          name: 'test-checkbox',
          ...CheckboxField({
            label: 'Test Checkbox',
          }),
        }),
      },
    });
  });

  it('renders an input of type checkbox', () => {
    const input = cmp.find('.checkbox-control');
    expect(input.exists()).toBe(true);
  });

  it(`renders an input with class 'checkbox-control'`, () => {
    const input = cmp.find('input');
    expect(input.classes()).toContain('checkbox-control');
  });

  it(`renders an input with id equal to field name`, () => {
    const input = cmp.find('input');
    expect(input.attributes('id')).toBe('test-checkbox');
  });

  // TODO:  Open ticket with reproduction link on https://github.com/vuejs/vue-test-utils-next/issues
  /*
  it(`input gets checked when value is true`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...CheckboxField({
          label: 'Test Checkbox',
          value: true,
        }),
      }),
    });
    const input = cmp.find('.checkbox-control');
    expect(input.attributes('checked')).toBe('');
  });

 it(`input gets disabled when form control does it`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...CheckboxField({
          label: 'Test Input',
          disabled: true,
        }),
      }),
    });
    const input = cmp.find('.checkbox-control');
    expect(input.attributes('disabled')).toBe('');
  });

  it(`renders a required input`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...CheckboxField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    });
    const input = cmp.find('.checkbox-control');
    expect(input.attributes('required')).toBe('');
  });

  it(`sets ariaRequired when required`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...CheckboxField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    });
    const input = cmp.find('.checkbox-control');
    expect(input.attributes('ariarequired')).toBe('true');
  });

  it(`renders a readonly input`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...CheckboxField({
          label: 'Test Input',
          readonly: true,
        }),
      }),
    });
    const input = cmp.find('.checkbox-control');
    expect(input.attributes('readonly')).toBe('');
  });

  it(`renders an input with aria labels`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...CheckboxField({
          label: 'Test Input',
          ariaLabel: 'Im a test input',
        }),
      }),
    });
    const input = cmp.find('.checkbox-control');
    expect(input.attributes('arialabel')).toBe('Im a test input');
  }); */

  /*
  Open ticket with reproduction link on https://github.com/vuejs/vue-test-utils-next/issues

  it('emits an event when value changed', async () => {
    const input = cmp.find('input');
    await input.setValue();

    expect(cmp.emitted()).toHaveProperty('change');
    expect(cmp.emitted('change')[0][0].value).toBe(true);
  });

  it('emits the control name when value change', async () => {
    const input = cmp.find('input');
    await input.setValue();

    expect(cmp.emitted('change')[0][0].name).toBe('test-checkbox');
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
