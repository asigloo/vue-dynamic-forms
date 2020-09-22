<script lang="ts">
/* eslint-disable @typescript-eslint/no-use-before-define */

import { defineComponent, PropType, computed, h } from 'vue';
import TextInput from '../text-input/TextInput.vue';
import SelectInput from '../select-input/SelectInput.vue';
import TextAreaInput from '../text-area-input/TextAreaInput.vue';
import CheckboxInput from '../checkbox-input/CheckboxInput.vue';
import RadioInput from '../radio-input/RadioInput.vue';

import { FormControl } from '../../core/models';
import { isEmpty, entries, values, keys } from '../../core/utils/helpers';
import { useInputEvents } from '../../composables/input-events';

const components = {
  TextInput,
  SelectInput,
  TextAreaInput,
  CheckboxInput,
  RadioInput,
};

const props = {
  control: {
    type: Object as PropType<FormControl<any>>,
    required: true,
  },
};
export default defineComponent({
  name: 'asDynamicInput',
  components,
  props,
  setup(props, { emit, slots }) {
    const { onFocus, onBlur } = useInputEvents(props?.control, emit);

    let component;

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

    const showErrors = computed(() => {
      return props?.control?.errors && keys(props?.control?.errors).length > 0;
      /* props.control.errors &&
        Object.keys(props.control.errors).length > 0 &&
        (this.submited || this.autoValidate) */
    });

    const errorMessages = computed(() => {
      const errors = values(props?.control?.errors || {});
      if (errors.length > 0) {
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
        console.log(props.control);
      }
    }

    function valueChange(value) {
      const newValue = {};
      if (props.control) {
        newValue[props.control.name] = value;
        validate();
        emit('changed', newValue);
      }
    }

    const attributes = computed(() => {
      return {
        control: props.control,
        onChanged: valueChange,
      };
    });

    const hasLabel = computed(() => props?.control?.type !== 'checkbox');
    const isFieldSet = computed(() => props?.control?.type === 'radio');

    return () => {
      switch (props?.control?.type) {
        case 'text':
        case 'email':
        case 'password':
        case 'url':
          component = h(TextInput, attributes.value);
          break;
        case 'select':
          component = h(SelectInput, attributes.value);
          break;
        case 'textarea':
          component = h(TextAreaInput, attributes.value);
          break;
        case 'checkbox':
          component = h(CheckboxInput, attributes.value);
          break;
        case 'radio':
          component = h(RadioInput, attributes.value);
          break;
        case 'custom-field':
          component = h(
            'slot',
            {
              name: 'customField',
            },
            slots.customField({
              control: props.control,
              onChange: ($event: any) => {
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
