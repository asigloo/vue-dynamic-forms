<template>
  <form class="dynamic-form" novalidate :id="form.id">
    <dynamic-input
      v-for="control in controls"
      :key="control?.name"
      :control="control"
    />
    <pre>{{ form }}</pre>
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
  setup(props) {
    const controls: Ref<FormControl<any>[] | undefined> = ref([]);
    watchEffect(() => {
      controls.value =
        props.form?.fields?.map(
          (field: InputBase<any>) => new FormControl({ ...field }),
        ) || [];
    });

    return { controls, form: props.form };
  },
});
</script>

<style></style>
