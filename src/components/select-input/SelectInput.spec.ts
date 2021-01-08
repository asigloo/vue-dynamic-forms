import { mount } from '@vue/test-utils';
import SelectInput from './SelectInput.vue';
import { FieldControl, SelectField, Validator, required } from '../../index';

describe('SelectInput', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(SelectInput, {
      props: {
        control: FieldControl({
          name: 'test-input',
          ...SelectField({
            label: 'Test Input',
            options: [
              {
                value: 'the-last-of-us',
                label: 'The Last of Us II',
              },
              {
                value: 'death-stranding',
                label: 'Death Stranding',
              },
              {
                value: 'nier-automata',
                label: 'Nier Automata',
              },
            ],
          }),
        }),
      },
    });
  });

  it('renders an select element', () => {
    const select = cmp.find('select');
    expect(select.exists()).toBe(true);
  });

  it(`renders an input with class 'form-control'`, () => {
    const select = cmp.find('select');
    expect(select.classes()).toContain('form-control');
  });

  it(`renders options for  dropdown'`, () => {
    const options = cmp.findAll('option');
    expect(options.length).toBe(3);
  });

  it(`renders an input with id equal to field name`, () => {
    const select = cmp.find('select');
    expect(select.attributes('id')).toBe('test-input');
  });

  it(`select gets disabled when form control does it`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...SelectField({
          label: 'Test Input',
          disabled: true,
        }),
      }),
    });
    const select = cmp.find('select');
    expect(select.attributes('disabled')).toBe('');
  });

  it(`renders a required input`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...SelectField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    });
    const select = cmp.find('select');
    expect(select.attributes('required')).toBe('');
  });

  it(`sets ariaRequired when required`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...SelectField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    });
    const select = cmp.find('select');
    expect(select.attributes('ariarequired')).toBe('true');
  });

  it(`renders a readonly input`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...SelectField({
          label: 'Test Input',
          readonly: true,
        }),
      }),
    });
    const select = cmp.find('select');
    expect(select.attributes('readonly')).toBe('');
  });

  it(`renders an input with aria labels`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...SelectField({
          label: 'Test Input',
          ariaLabel: 'Im a test input',
        }),
      }),
    });
    const select = cmp.find('select');
    expect(select.attributes('arialabel')).toBe('Im a test input');
  });

  /*
  Open ticket with reproduction link on https://github.com/vuejs/vue-test-utils-next/issues

  it('emits an event when value changed', async () => {
    const select = cmp.find('select');
    await select.setValue('the-last-of-us');
    const emmited = cmp.emitted();
    expect(cmp.emitted()).toHaveProperty('change');
    expect(emmited('change')[0][0].value).toBe('the-last-of-us');
    expect(emmited('change')[0][0].name).toBe('test-input');
  }); */

  /* it('emits the control name when value change', async () => {
    const select = cmp.find('select');
    await select.setValue('the-last-of-us');

    expect(cmp.emitted('change')[0][0].name).toBe('test-input');
  });

  it('emits an event when blur', async () => {
    const select = cmp.find('select');
    await select.trigger('blur');

    expect(cmp.emitted()).toHaveProperty('blur');
  });

  it('emits an event when focus', async () => {
    const select = cmp.find('select');
    await select.trigger('focus');

    expect(cmp.emitted()).toHaveProperty('focus');
  });
  */

  /* it('renders form errors when invalid', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...SelectField({
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
