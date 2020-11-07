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
      @change="valueChange"
      @blur="onBlur"
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
  ref,
  Ref,
  computed,
  onMounted,
  watch,
  inject,
  toRaw,
} from 'vue';
import { diff } from 'deep-object-diff';

import DynamicInput from '../dynamic-input/DynamicInput.vue';

import { DynamicForm, FieldTypes, FormControl, InputType } from '@/core/models';
import { dynamicFormsSymbol } from '@/useApi';
import { deepClone, hasValue, removeEmpty } from '@/core/utils/helpers';

/* import { warn } from '../../core/utils/warning';
 */
const props = {
  form: {
    type: Object as PropType<DynamicForm>,
    required: true,
  },
};

const components = {
  DynamicInput,
};

const EMPTY_CONTROL = {
  dirty: false,
  touched: false,
  valid: true,
};

/* const AVAILABLE_THEMES = ['default', 'material'];
 */
export default defineComponent({
  name: 'asDynamicForm',
  props,
  components,
  setup(props, ctx) {
    const { options } = inject(dynamicFormsSymbol);
    const cache = deepClone(toRaw(props.form.fields));

    const controls: Ref<FormControl<InputType>[]> = ref([]);
    const submited = ref(false);

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

    const formValues = computed(() => {
      return removeEmpty(
        controls.value.reduce((prev, curr) => {
          const obj = {};
          obj[curr.name] =
            curr.type === FieldTypes.NUMBER
              ? parseFloat(`${curr.value}`)
              : curr.value;
          return {
            ...prev,
            ...obj,
          };
        }, {}),
      );
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
        const {
          customClass,
          customStyles,
          method,
          netlify,
          netlifyHoneypot,
          autocomplete,
        } = options?.form;
        return {
          class: customClass,
          style: customStyles,
          method,
          'data-netlify': netlify,
          'data-netlify-honeypot': netlifyHoneypot,
          autocomplete: autocomplete ? 'on' : 'off',
        };
      } else {
        return;
      }
    });

    function mapControls(empty = false) {
      const controlArray =
        Object.entries(props.form?.fields).map(
          ([key, field]: [string, InputType]) =>
            empty
              ? ({
                  ...field,
                  name: key,
                  value: null,
                  ...EMPTY_CONTROL,
                } as FormControl<InputType>)
              : ({
                  ...field,
                  name: key,
                  ...EMPTY_CONTROL,
                } as FormControl<InputType>),
        ) || [];
      if (props.form.fieldOrder) {
        controls.value = controlArray.sort(
          (a: FormControl<InputType>, b: FormControl<InputType>) =>
            props.form.fieldOrder.indexOf(a.name) -
            props.form.fieldOrder.indexOf(b.name),
        );
      } else {
        controls.value = controlArray;
      }
    }
    function findControlByName(name: string | unknown) {
      const updatedCtrl = controls.value.find(control => control.name === name);
      return updatedCtrl;
    }

    function valueChange(event: Record<string, unknown>) {
      if (event && hasValue(event.value)) {
        const updatedCtrl = findControlByName(event.name);
        if (updatedCtrl) {
          updatedCtrl.value = event.value as string;
          updatedCtrl.dirty = true;
          validateControl(updatedCtrl);
        }
        ctx.emit('change', formValues.value);
      }
    }

    function onBlur(control: FormControl<InputType>) {
      const updatedCtrl = findControlByName(control.name);
      if (updatedCtrl) {
        updatedCtrl.touched = true;
      }
    }

    function validateControl(control: FormControl<InputType>) {
      if (control.validations) {
        const validation = control.validations.reduce((prev, curr) => {
          const val =
            typeof curr.validator === 'function'
              ? curr.validator(control)
              : null;
          if (val !== null) {
            const [key, value] = Object.entries(val)[0];
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
        control.errors = validation;
        control.valid = Object.keys(validation).length === 0;
      }
    }

    function detectChanges(fields) {
      const changes = diff(cache, deepClone(fields));
      Object.entries(changes).forEach(([key, value]) => {
        let ctrl = findControlByName(key);
        if (ctrl) {
          Object.entries(value).forEach(([change, newValue]) => {
            ctrl[change] = newValue;
          });
        }
      });
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

    watch(
      () => props.form.fields,
      fields => {
        detectChanges(fields);
      },
      {
        deep: true,
      },
    );

    onMounted(() => {
      mapControls();
    });

    return {
      controls,
      valueChange,
      formValues,
      handleSubmit,
      isValid,
      errors,
      deNormalizedScopedSlots,
      normalizedControls,
      submited,
      formattedOptions,
      onBlur,
    };
  },
  /* watch: {
    form: {
      handler(newVal, oldVal) {
        console.log({
          newVal,
          oldVal,
        });
      },
      deep: true,
    },
  }, */
});
</script>
