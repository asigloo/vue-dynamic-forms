<template>
  <form
    class="dynamic-form"
    novalidate
    :id="form.id"
    :name="form.id"
    @submit.prevent="handleSubmit"
  >
    <dynamic-input
      v-for="control in controls"
      :key="control.name"
      :control="control"
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
} from 'vue';
import { DynamicForm } from './form';
import DynamicInput from '../dynamic-input/DynamicInput.vue';

import { InputBase, FormControl } from '../../core/models';

const props = {
  form: {
    type: Object as PropType<DynamicForm>,
    required: true,
  },
};

const components = {
  DynamicInput,
};

export default defineComponent({
  name: 'asDynamicForm',
  props,
  components,
  setup(props, { emit, slots }) {
    const controls: Ref<FormControl<any>[]> = ref([]);
    const formValues = reactive({});
    const submited = ref(false);

    onMounted(() => {
      mapControls();
      initValues();
    });

    const isValid = computed(() => {
      const control = controls?.value?.find(control => !control.valid);
      return control ? control.valid : true;
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

    function valueChange(changedValue: any) {
      Object.assign(formValues, changedValue);
      emit('changed', formValues);
    }

    function mapControls(empty?) {
      controls.value =
        props.form?.fields?.map((field: InputBase<any>) =>
          empty
            ? new FormControl({ ...field, value: null })
            : new FormControl({ ...field }),
        ) || [];
    }

    function resetForm() {
      mapControls(true);
    }

    function handleSubmit() {
      submited.value = true;
      if (isValid.value) {
        emit('submited', formValues);
        resetForm();
      } else {
        emit('error', formValues);
      }
    }

    function initValues() {
      Object.assign(
        formValues,
        controls.value
          ? controls.value.reduce((prev, curr) => {
              const obj = {};
              obj[curr.name] =
                curr.type === 'number' ? parseFloat(curr.value) : curr.value;
              return {
                ...prev,
                ...obj,
              };
            }, {})
          : {},
      );
      emit('changed', formValues);
    }

    const deNormalizedScopedSlots = computed(() => Object.keys(slots));

    const normalizedControls = computed(() => {
      let normalizedControls = {};
      controls.value.forEach(element => {
        normalizedControls[element.name] = element;
      });
      return normalizedControls;
    });

    watch(props, () => {
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
    };
  },
});
</script>

<style></style>
