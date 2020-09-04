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
      :key="control?.name"
      :control="control"
      @changed="valueChange"
    />
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
  watchEffect,
  watch,
} from 'vue';
import { DynamicForm } from './form';
import DynamicInput from '@/components/dynamic-input/DynamicInput.vue';
import { InputBase, FormControl } from '@/core/models';

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
  setup(props, { emit }) {
    const controls: Ref<FormControl<any>[]> = ref([]);
    const formValues = reactive({});
    const submited = ref(false);

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
      console.log('mapControls', controls.value);
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

    onMounted(() => {
      mapControls();
      initValues();
    });

    watch(props, (prev, current) => {
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
    };
  },
});
</script>

<style></style>
