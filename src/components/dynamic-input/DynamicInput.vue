<script lang="ts">
/* eslint-disable @typescript-eslint/no-use-before-define */

import { defineComponent, PropType, computed, h } from 'vue';
import TextInputComponent from '../text-input/TextInput.vue';
import SelectInputComponent from '../select-input/SelectInput.vue';
import TextAreaInputComponent from '../text-area-input/TextAreaInput.vue';
import CheckboxInputComponent from '../checkbox-input/CheckboxInput.vue';
import RadioInputComponent from '../radio-input/RadioInput.vue';
import NumberInputComponent from '../number-input/NumberInput.vue';

import {
  FormControl,
  TextInput,
  NumberInput,
  EmailInput,
  PasswordInput,
  UrlInput,
  ColorInput,
  SelectInput,
  RadioInput,
  CheckboxInput,
  TextAreaInput,
  InputType,
  BindingObject,
  FieldTypes,
  ValidationEvent,
  InputEvent,
} from '/@/core/models';

import { isArray, isObject } from '/@/core/utils/helpers';
import { useInputEvents } from '/@/composables/useInputEvents';

const components = {
  TextInputComponent,
  SelectInputComponent,
  TextAreaInputComponent,
  CheckboxInputComponent,
  RadioInputComponent,
  NumberInputComponent,
};

const props = {
  control: {
    type: Object as PropType<FormControl<InputType>>,
    required: true,
  },
  forceValidation: {
    type: Boolean,
    default: false,
  },
};

export type ControlAttribute<T extends InputType> = {
  control: FormControl<T>;
  onChange: (value: unknown) => void;
  onFocus: (value: unknown) => void;
  onBlur: (value: unknown) => void;
};

export default defineComponent({
  name: 'asDynamicInput',
  components,
  inheritAttrs: false,
  props,
  setup(props, { emit, slots }) {
    const { onFocus, onInput, onBlur } = useInputEvents(props, emit);

    let component;

    const attributes = computed(() => {
      return {
        control: props?.control,

        onChange: valueChange,
        onBlur: (e: InputEvent) => emit('blur', e),
        onFocus: (e: InputEvent) => emit('focus', e),
        onValidate: (validation: ValidationEvent) =>
          emit('validate', validation),
        forceValidation: props.forceValidation,
      };
    });

    const hasLabel = computed(
      () => props?.control?.label && props?.control?.type !== 'checkbox',
    );
    const isFieldSet = computed(() => props?.control?.type === 'radio');

    const getClasses = computed(() => {
      const classes = [
        'dynamic-input',
        'form-group',
        {
          'form-group--inline': props?.control?.type === FieldTypes.CHECKBOX,
        },
      ];

      if (isArray(props?.control?.customClass)) {
        return [
          ...classes,
          ...(props?.control?.customClass as BindingObject[]),
        ];
      }
      if (isObject(props?.control?.customClass)) {
        return [...classes, props?.control?.customClass];
      }
      return [classes, props?.control?.customClass];
    });

    function valueChange(event) {
      emit('change', event);
    }

    return () => {
      switch (props?.control?.type) {
        case FieldTypes?.TEXT:
          component = h(
            TextInputComponent,
            attributes.value as ControlAttribute<TextInput>,
          );
          break;
        case 'email':
          component = h(
            TextInputComponent,
            attributes.value as ControlAttribute<EmailInput>,
          );
          break;
        case 'password':
          component = h(
            TextInputComponent,
            attributes.value as ControlAttribute<PasswordInput>,
          );
          break;
        case 'url':
          component = h(
            TextInputComponent,
            attributes.value as ControlAttribute<UrlInput>,
          );
          break;
        case 'color':
          component = h(
            TextInputComponent,
            attributes.value as ControlAttribute<ColorInput>,
          );
          break;
        case 'number':
          component = h(
            NumberInputComponent,
            attributes.value as ControlAttribute<NumberInput>,
          );
          break;
        case 'select':
          component = h(
            SelectInputComponent,
            attributes.value as ControlAttribute<SelectInput>,
          );
          break;
        case 'textarea':
          component = h(
            TextAreaInputComponent,
            attributes.value as ControlAttribute<TextAreaInput>,
          );
          break;
        case 'checkbox':
          component = h(
            CheckboxInputComponent,
            attributes.value as ControlAttribute<CheckboxInput>,
          );
          break;
        case 'radio':
          component = h(
            RadioInputComponent,
            attributes.value as ControlAttribute<RadioInput>,
          );
          break;
        case 'custom-field':
          component = h(
            'slot',
            {
              name: 'customField',
            },
            slots.customField({
              control: props.control,
              onChange: onInput,
              onFocus,
              onBlur,
            }),
          );
          break;
        default:
          break;
      }

      const requiredStar = h(
        'span',
        {
          ariaHidden: true,
          class: 'form-required-star',
        },
        ' *',
      );
      return h(
        isFieldSet.value ? 'fieldset' : 'div',
        {
          class: getClasses.value,
          style: props?.control.customStyles,
          role: isFieldSet.value ? undefined : 'group',
        },
        [
          hasLabel.value
            ? h(
                isFieldSet.value ? 'legend' : 'label',
                {
                  class: 'form-label',
                  for: props?.control?.name,
                },
                [
                  `${props?.control?.label}`,
                  props?.control?.validations?.some(
                    validator => validator.type === 'required',
                  )
                    ? requiredStar
                    : '',
                ],
              )
            : null,
          component,
        ],
      );
    };
  },
});
</script>
