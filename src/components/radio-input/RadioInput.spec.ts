import { mount } from '@vue/test-utils';
import RadioInput from './RadioInput.vue';
import { FieldControl, RadioField } from '../../index';

describe('RadioInput', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(RadioInput, {
      props: {
        control: FieldControl({
          name: 'test-radio',
          ...RadioField({
            label: 'Test Radio',
            options: [
              {
                key: 'mario',
                value: 'Mario',
              },
              {
                key: 'crash-bandicoot',
                value: 'Crash Bandicoot',
              },
              {
                key: 'sonic',
                value: 'Sonic',
              },
              {
                key: 'banjo-kazooie',
                value: 'Banjo Kazooie',
                disabled: true,
              },
            ],
          }),
        }),
      },
    });
  });

  it('renders an group of inputs of type radio', () => {
    const group = cmp.find('.radio-group');
    const radios = cmp.findAll('.radio-control');
    expect(group.exists()).toBe(true);
    expect(radios.length).toBeGreaterThan(0);
  });

  it(`renders an input with class 'radio-control'`, () => {
    const input = cmp.find('input');
    expect(input.classes()).toContain('radio-control');
  });

  it(`renders an input with id equal to field name`, () => {
    const input = cmp.find('[type=radio][value=crash-bandicoot]');
    expect(input.attributes('id')).toBe('crash-bandicoot');
  });

  // TODO:  Open ticket with reproduction link on https://github.com/vuejs/vue-test-utils-next/issues
  /*
  it(`input gets checked when value is true`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...RadioField({
          label: 'Test Radio',
          value: true,
        }),
      }),
    });
    const input = cmp.find('.radio-control');
    expect(input.attributes('checked')).toBe('');
  });

 it(`input gets disabled when form control does it`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...RadioField({
          label: 'Test Input',
          disabled: true,
        }),
      }),
    });
    const input = cmp.find('.radio-control');
    expect(input.attributes('disabled')).toBe('');
  });

  it(`renders a required input`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...RadioField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    });
    const input = cmp.find('.radio-control');
    expect(input.attributes('required')).toBe('');
  });

  it(`sets ariaRequired when required`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...RadioField({
          label: 'Test Input',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
      }),
    });
    const input = cmp.find('.radio-control');
    expect(input.attributes('ariarequired')).toBe('true');
  });

  it(`renders a readonly input`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...RadioField({
          label: 'Test Input',
          readonly: true,
        }),
      }),
    });
    const input = cmp.find('.radio-control');
    expect(input.attributes('readonly')).toBe('');
  });

  it(`renders an input with aria labels`, async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...RadioField({
          label: 'Test Input',
          ariaLabel: 'Im a test input',
        }),
      }),
    });
    const input = cmp.find('.radio-control');
    expect(input.attributes('arialabel')).toBe('Im a test input');
  });


  it('emits an event when value changed', async () => {
    const input = cmp.find('input[type=radio][value=crash-bandicoot]');
    await input.setValue();

    expect(cmp.emitted()).toHaveProperty('change');
    expect(cmp.emitted('change')[0][0].value).toBe(true);
  });

  it('emits the control name when value change', async () => {
    const input = cmp.find('input[type=radio][value=crash-bandicoot]');
    await input.setValue();

    expect(cmp.emitted('change')[0][0].name).toBe('test-radio');
  });

  it('emits an event when blur', async () => {
    const input = cmp.find('input[type=radio][value=crash-bandicoot]');
    await input.trigger('blur');

    expect(cmp.emitted()).toHaveProperty('blur');
  });

  it('emits an event when focus', async () => {
    const input = cmp.find('input[type=radio][value=crash-bandicoot]');
    await input.trigger('focus');

    expect(cmp.emitted()).toHaveProperty('focus');
  });
  */
});
