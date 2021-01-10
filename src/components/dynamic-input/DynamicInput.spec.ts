import { mount } from '@vue/test-utils';

import DynamicInput from './DynamicInput.vue';
import {
  CheckboxField,
  ColorField,
  EmailField,
  FieldControl,
  NumberField,
  PasswordField,
  RadioField,
  required,
  SelectField,
  TextAreaField,
  TextField,
  UrlField,
  Validator,
} from '../../';

import TextInput from '../text-input/TextInput.vue';
import NumberInput from '../number-input/NumberInput.vue';
import TextAreaInput from '../text-area-input/TextAreaInput.vue';
import SelectInput from '../select-input/SelectInput.vue';
import CheckboxInput from '../checkbox-input/CheckboxInput.vue';
import RadioInput from '../radio-input/RadioInput.vue';

describe('DynamicInput', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(DynamicInput, {
      props: {
        control: FieldControl({
          name: 'test-input',
          ...TextField({
            label: 'Test Textarea',
          }),
        }),
      },
    });
  });

  it('renders an dynamic input element', () => {
    const input = cmp.find('.dynamic-input.form-group');
    expect(input.exists()).toBe(true);
  });

  it('renders an dynamic input element with role group', () => {
    const input = cmp.find('.dynamic-input.form-group');
    expect(input.attributes('role')).toBe('group');
  });

  it('render a element with new classes if customClasses are filled as a string', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test label',
          customClass: 'mb-4 text-gray-600',
        }),
      }),
    });
    const formGroup = cmp.find('.dynamic-input.form-group');
    expect(formGroup.classes()).toContain('mb-4');
    expect(formGroup.classes()).toContain('text-gray-600');
  });

  it('render a element with new classes if customClasses are filled as an array', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test label',
          customClass: ['mb-4', 'text-gray-600'],
        }),
      }),
    });
    const formGroup = cmp.find('.dynamic-input.form-group');
    expect(formGroup.classes()).toContain('mb-4');
    expect(formGroup.classes()).toContain('text-gray-600');
  });

  it('render a element with new classes if customClasses are filled as an object', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test label',
          customClass: {
            hidden: true,
            'animate-fadeOut': true,
          },
        }),
      }),
    });
    const formGroup = cmp.find('.dynamic-input.form-group');
    expect(formGroup.classes()).toContain('hidden');
    expect(formGroup.classes()).toContain('animate-fadeOut');
  });

  it('render a label if control has label and is not a checkbox', () => {
    const label = cmp.find('.form-label');
    expect(label.exists()).toBe(true);
  });

  it('not render a label if control has no label and is not a checkbox', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({}),
      }),
    });
    const label = cmp.find('.form-label');
    expect(label.exists()).toBeFalsy();
  });

  it('not render a label if control is a checkbox', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...CheckboxField({
          label: 'Test Textarea',
        }),
      }),
    });
    const label = cmp.find('.form-label');
    expect(label.exists()).toBeFalsy();
  });

  it('render a legend instead of label if control has label and is is a radio input', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...RadioField({
          label: 'Test Radio',
        }),
      }),
    });

    const legend = cmp.find('legend.form-label');
    expect(legend.exists()).toBe(true);
  });

  it('render a fieldset with role groupif it is a radio field', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...RadioField({
          label: 'Test Radio',
        }),
      }),
    });

    const legend = cmp.find('fieldset');
    expect(legend.exists()).toBe(true);
  });

  it('render a span with a * when validation required is present', async () => {
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
    const requiredStar = cmp.find('span.form-required-star');
    expect(requiredStar.exists()).toBe(true);
    expect(requiredStar.text()).toBe('*');
  });

  it('render TextInputComponent if field type is text', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextField({
          label: 'Test Input',
        }),
      }),
    });
    const child = cmp.findComponent(TextInput);
    expect(child.exists()).toBe(true);
  });

  it('render TextInputComponent if field type is email', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...EmailField({
          label: 'Test Input',
        }),
      }),
    });
    const child = cmp.findComponent(TextInput);
    expect(child.exists()).toBe(true);
  });

  it('render TextInputComponent if field type is password', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...PasswordField({
          label: 'Test Input',
        }),
      }),
    });
    const child = cmp.findComponent(TextInput);
    expect(child.exists()).toBe(true);
  });

  it('render TextInputComponent if field type is url', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...UrlField({
          label: 'Test Input',
        }),
      }),
    });
    const child = cmp.findComponent(TextInput);
    expect(child.exists()).toBe(true);
  });

  it('render TextInputComponent if field type is color', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...ColorField({
          label: 'Test Input',
        }),
      }),
    });
    const child = cmp.findComponent(TextInput);
    expect(child.exists()).toBe(true);
  });

  it('render NumberInputComponent if field type is text', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...NumberField({
          label: 'Test Input',
        }),
      }),
    });
    const child = cmp.findComponent(NumberInput);
    expect(child.exists()).toBe(true);
  });

  it('render SelectInputComponent if field type is dropdown', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...SelectField({
          label: 'Test Input',
        }),
      }),
    });
    const child = cmp.findComponent(SelectInput);
    expect(child.exists()).toBe(true);
  });

  it('render TextAreaInputComponent if field type is textarea', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...TextAreaField({
          label: 'Test Input',
        }),
      }),
    });
    const child = cmp.findComponent(TextAreaInput);
    expect(child.exists()).toBe(true);
  });

  it('render CheckboxInputComponent if field type is checkbox', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...CheckboxField({
          label: 'Test Input',
        }),
      }),
    });
    const child = cmp.findComponent(CheckboxInput);
    expect(child.exists()).toBe(true);
  });

  it('render RadioInputComponent if field type is radio', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'test-input',
        ...RadioField({
          label: 'Test Input',
        }),
      }),
    });
    const child = cmp.findComponent(RadioInput);
    expect(child.exists()).toBe(true);
  });

  /*   it('render a slot if field type is an custom field', async () => {
    const cmpWithSlots = mount(DynamicInput, {
      props: {
        control: FieldControl({
          avocadoField: 'test-input',
          ...CustomField({
            label: 'Test Slots',
          }),
        }),
      },
      slots: {
        avocadoField: '<input name="avocadoField"/>',
      },
    });
    expect(cmpWithSlots.find('slot[name="avocadoField"]').exists()).toBe(true);
  }); */

  it('passes control prop down to child component', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'awiwi-input',
        ...TextField({
          label: 'Test Input',
        }),
      }),
    });
    const child = cmp.findComponent(TextInput);
    expect(child.props('control').name).toBe('awiwi-input');
  });

  it('passes forceValidation prop down to child component', async () => {
    await cmp.setProps({
      control: FieldControl({
        name: 'awiwi-input',
        ...TextField({
          label: 'Test Input',
        }),
      }),
      forceValidation: true,
    });
    const child = cmp.findComponent(TextInput);
    expect(child.props('forceValidation')).toBe(true);
  });
});
