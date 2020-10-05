<template>
  <form
    class="dynamic-form"
    novalidate
    :id="form.id"
    :name="form.id"
    v-bind="formattedOptions"
    @submit.prevent="handleSubmit"
  >
    <dynamic-input
      v-for="control in controls"
      :key="control.name"
      :control="control"
      :submited="submited"
      @changed="valueChange"
    >
      <template v-slot:customField="props">
        <div
          v-for="slot in deNormalizedScopedSlots"
          :key="slot"
          class="custom-form-wrapper"
        >
          <slot
            v-if="props.control.name === slot"
            :name="slot"
            :control="normalizedControls[slot]"
            :onChange="props.onChange"
            :onFocus="props.onFocus"
            :onBlur="props.onBlur"
          ></slot>
        </div>
      </template>
    </dynamic-input>
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  ref,
  Ref,
  computed,
  onMounted,
  watch,
  inject,
} from 'vue';
import { DynamicForm } from './form';
import DynamicInput from '../dynamic-input/DynamicInput.vue';

import { FormControl, InputType } from '../../core/models';
import { dynamicFormsSymbol } from '../../useApi';
import { removeEmpty } from '../../core/utils/helpers';

const props = {
  form: {
    type: Object as PropType<DynamicForm>,
    required: true,
  },
};

const components = {
  DynamicInput,
};

/* const AVAILABLE_THEMES = ['default', 'material'];
 */
export default defineComponent({
  name: 'asDynamicForm',
  props,
  components,
  setup(props, ctx) {
    const { options } = inject(dynamicFormsSymbol);

    const controls: Ref<FormControl<InputType>[]> = ref([]);
    const formValues = reactive({});
    const submited = ref(false);

    onMounted(() => {
      mapControls();
      initValues();
    });
    //  TODO: enable again when plugin theme option is available

    /* const validTheme = computed(
      () => options.theme && AVAILABLE_THEMES.includes(options.theme),
    );

    if (!validTheme.value) {
      warn(
        `There isn't a theme: ${
          options.theme
        } just yet, please choose one of the available themes: ${AVAILABLE_THEMES.join(
          ', ',
        )}`,
      );
    } */

    const deNormalizedScopedSlots = computed(() => Object.keys(ctx.slots));

    const normalizedControls = computed(() => {
      let normalizedControls = {};
      controls.value.forEach(element => {
        normalizedControls[element.name] = element;
      });
      return normalizedControls;
    });

    const isValid = computed(() => {
      const hasInvalidControls = controls.value.some(control => !control.valid);
      return !hasInvalidControls;
    });

    const errors = computed(() => {
      return controls.value
        ? controls.value.reduce((prev, curr) => {
            const errors = Object.keys(curr.errors || {}) || [];
            if (errors.length > 0) {
              const error = {};
              error[curr.name] = curr.errors;
              return {
                ...prev,
                ...error,
              };
            }
            return prev;
          }, {})
        : {};
    });

    const formattedOptions = computed(() => {
      if (options?.form) {
        const { customClass, method, netlify, netlifyHoneypot } = options?.form;
        return {
          class: [
            customClass,
            /* validTheme.value ? `theme-${options.theme}` : null, */
          ].join(' '),
          method,
          'data-netlify': netlify,
          'data-netlify-honeypot': netlifyHoneypot,
        };
      } else {
        return;
      }
    });

    function valueChange(changedValue: Record<string, unknown>) {
      Object.assign(formValues, changedValue);
      ctx.emit('changed', removeEmpty(formValues));
    }

    function mapControls(empty?: boolean) {
      const controlArray =
        Object.entries(props.form?.fields).map(
          ([key, field]: [string, InputType]) =>
            empty
              ? ({
                  ...field,
                  name: key,
                  value: null,
                  dirty: false,
                  touched: false,
                  valid: true,
                } as FormControl<InputType>)
              : ({
                  ...field,
                  name: key,
                  dirty: false,
                  touched: false,
                  valid: true,
                } as FormControl<InputType>),
        ) || [];
      if (props.form.fieldOrder) {
        controls.value = controlArray.sort(
          (a: FormControl<InputType>, b: FormControl<InputType>) =>
            props.form.fieldOrder.indexOf(a.name) -
            props.form.fieldOrder.indexOf(b.name),
        );
      }
    }

    function resetForm() {
      mapControls(true);
    }

    function handleSubmit() {
      submited.value = true;

      if (isValid.value) {
        ctx.emit('submited', formValues);
        resetForm();
      } else {
        ctx.emit('error', formValues);
      }
    }

    function initValues() {
      Object.assign(
        formValues,
        controls.value
          ? controls.value.reduce((prev, curr) => {
              const obj = {};
              obj[curr.name] = curr.value;
              return {
                ...prev,
                ...obj,
              };
            }, {})
          : {},
      );
      ctx.emit('changed', formValues);
    }

    watch(props.form.fields, () => {
      mapControls();
    });

    return {
      controls,
      form: props.form,
      valueChange,
      formValues,
      handleSubmit,
      isValid,
      errors,
      deNormalizedScopedSlots,
      normalizedControls,
      submited,
      formattedOptions,
    };
  },
});
</script>
