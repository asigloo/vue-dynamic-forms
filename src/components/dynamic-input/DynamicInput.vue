<template>
  <div :class="getClasses">
    <TextInput
      :control="control"
      v-if="
        control.type === 'text' ||
        control.type === 'email' ||
        control.type === 'password' ||
        control.type === 'url' ||
        control.type === 'number'
      "
      @changed="valueChange"
    />
    <SelectInput
      v-if="control.type === 'select'"
      :control="control"
      @changed="valueChange"
    />
    <label
      class="form-label"
      :for="control.name"
      v-if="control.type !== 'checkbox'"
    >
      {{ control.label }}
    </label>
    <span class="form-bar"></span>
    <div class="form-errors" v-if="showErrors">
      <p
        v-for="(error, $index) in errorMessages"
        :key="`${$index}`"
        class="form-error"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, ref, reactive } from 'vue';
import TextInput from '@/components/text-input/TextInput.vue';
import SelectInput from '@/components/select-input/SelectInput.vue';

import { FormControl } from '@/core/models';
import { isEmpty, entries, values, keys } from '@/core/utils/helpers';

const components = {
  TextInput,
  SelectInput,
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
    const showErrors = computed(() => {
      return props?.control?.errors && keys(props?.control?.errors).length > 0;
      /* props.control.errors &&
        Object.keys(props.control.errors).length > 0 &&
        (this.submited || this.autoValidate) */
    });

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

    /* const attributes = computed(() => {
      return {
        control: props.control,
        onChange: function ($event) {
          const value = {};
          value[$event.target.name] = $event.target.value;
          validate();
          emit('changed', value);
        },
      };
    }); */
    return {
      valueChange,
      errorMessages,
      getClasses,
      showErrors,
    };

    /* return () => {
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

        default:
          break;
      }
      return h(
        'div',
        {
          class: ['dynamic-input', 'form-group', props?.control?.customClass],
        },
        [
          component,
          h(
            'label',
            {
              class: 'form-label',
              for: props?.control?.label,
            },
            props?.control?.label,
          ),
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
    }; */
  },
});
</script>

<style></style>
