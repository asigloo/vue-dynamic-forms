<script lang="ts">
/* eslint-disable @typescript-eslint/no-use-before-define */

import { defineComponent, PropType, computed, h } from 'vue';
import TextInput from '../text-input/TextInput.vue';
import SelectInput from '../select-input/SelectInput.vue';
import TextAreaInput from '../text-area-input/TextAreaInput.vue';

import { FormControl } from '../../core/models';
import { isEmpty, entries, values, keys } from '../../core/utils/helpers';

const components = {
  TextInput,
  SelectInput,
  TextAreaInput,
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
  setup(props, { emit }) {
    let component;

    const getClasses = computed(() => {
      return [
        'dynamic-input',
        'form-group',
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

        default:
          break;
      }
      return h(
        'div',
        {
          class: getClasses.value,
        },
        [
          h(
            'label',
            {
              class: 'form-label',
              for: props?.control?.label,
            },
            props?.control?.label,
          ),
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
