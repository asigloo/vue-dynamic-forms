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
      @changed="valueChanged"
    />
    <pre>{{ formValues }}</pre>
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  toRef,
  reactive,
  watchEffect,
  ref,
  Ref,
  computed,
} from 'vue';
import { DynamicForm } from './form';
import DynamicInput from '@/components/dynamic-input/DynamicInput.vue';
import { InputBase, FormControl } from '@/core/models';

const props = {
  form: Object as PropType<DynamicForm>,
};

const components = {
  DynamicInput,
};

export default defineComponent({
  name: 'asDynamicForm',
  props,
  components,
  setup(props, { emit }) {
    const controls: Ref<FormControl<any>[] | undefined> = ref([]);
    const formValues = reactive({});
    const submited = ref(false);

    function valueChanged(changedValue: any) {
      Object.assign(formValues, changedValue);
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
      emit('submited', formValues);
      resetForm();
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
    }

    watchEffect(() => {
      mapControls();
      initValues();
    });

    return {
      controls,
      form: props.form,
      valueChanged,
      formValues,
      handleSubmit,
    };
  },
});
</script>

<style></style>
