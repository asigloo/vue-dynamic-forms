<script lang="ts">
/* eslint-disable @typescript-eslint/no-use-before-define */

import { defineComponent, PropType, computed, h, inject } from 'vue';
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
} from '@/core/models';

import { isEmpty, entries, values, keys, isEvent } from '@/core/utils/helpers';
import { useInputEvents } from '@/composables/input-events';
import { dynamicFormsSymbol } from '@/useApi';

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
  submited: {
    type: Boolean,
    required: true,
  },
};

export type ControlAttribute<T extends InputType> = {
  control: FormControl<T>;
  onChange: (value: unknown) => void;
};

export default defineComponent({
  name: 'asDynamicInput',
  components,
  props,
  setup(props, { emit, slots }) {
    const { onFocus, onBlur } = useInputEvents(props?.control, emit);
    const { options } = inject(dynamicFormsSymbol);

    let component;

    const attributes = computed(() => {
      return {
        control: props?.control,
        onChange: valueChange,
      };
    });

    const hasLabel = computed(() => props?.control?.type !== 'checkbox');
    const isFieldSet = computed(() => props?.control?.type === 'radio');

    const getClasses = computed(() => {
      return [
        'dynamic-input',
        'form-group',
        {
          'form-group--inline': props?.control?.type === 'checkbox',
        },
        {
          'form-group--error': showErrors.value,
        },
        `${props?.control?.customClass || ''}`,
      ];
    });

    const autoValidate = computed(
      () => props?.control?.touched && options?.autoValidate,
    );

    const showErrors = computed(() => {
      return (
        props?.control?.errors &&
        keys(props?.control?.errors).length > 0 &&
        (props.submited || autoValidate.value)
      );
      /* props.control.errors &&
        Object.keys(props.control.errors).length > 0 &&
        (this.submited || this.autoValidate) */
    });

    const errorMessages = computed(() => {
      const errors = values(props?.control?.errors || {});
      if (errors.length > 0 && (props.submited || autoValidate.value)) {
        return errors.map(value => value.text);
      }
      return [];
    });

    function validate() {
      if (
        props.control &&
        props.control.validations &&
        isEmpty(props.control.validations)
      ) {
        const validation = props.control.validations.reduce((prev, curr) => {
          const val =
            typeof curr.validator === 'function'
              ? curr.validator(props.control)
              : null;
          if (val !== null) {
            const [key, value] = entries(val)[0];
            const obj = {};
            obj[key] = {
              value,
              text: curr.text,
            };
            return {
              ...prev,
              ...obj,
            };
          }
          return {
            ...prev,
          };
        }, {});
        props.control.errors = validation;
        props.control.valid = Object.keys(validation).length === 0;
      }
    }

    function valueChange($event) {
      let value;
      const newValue = {};

      if (isEvent($event)) {
        $event.stopPropagation();
        value =
          props.control.type === 'checkbox'
            ? $event.target.checked
            : $event.target.value;
      } else {
        value = $event;
      }

      if (props.control) {
        newValue[props.control.name] = value;
        validate();
        emit('change', newValue);
      }
    }

    return () => {
      switch (props?.control?.type) {
        case 'text':
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
              onChange: $event => {
                const newValue = {};
                const value = $event.target.value;

                if (props.control) {
                  props.control.dirty = true;
                  newValue[props.control.name] = value;
                  validate();
                  emit('changed', newValue);
                }
              },
              onFocus,
              onBlur,
            }),
          );
          break;
        default:
          break;
      }
      return h(
        isFieldSet.value ? 'fieldset' : 'div',
        {
          class: getClasses.value,
          role: isFieldSet.value ? undefined : 'group',
        },
        [
          hasLabel.value
            ? h(
                isFieldSet.value ? 'legend' : 'label',
                {
                  class: 'form-label',
                  for: props?.control?.label,
                },
                props?.control?.label,
              )
            : null,
          component,
          h(
            'div',
            {
              class: 'form-errors',
            },
            errorMessages.value.map(error =>
              h('p', { class: 'form-error' }, error),
            ),
          ),
        ],
      );
    };
  },
});
</script>
