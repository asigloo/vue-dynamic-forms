<template>
  <form class="dynamic-form" novalidate>
    <!-- <li v-for="control in this.form.fields" :key="control.name">
      {{ control.label }}
    </li> -->
    <dynamic-input
      v-for="control in controls"
      :key="control?.name"
      :control="control"
    />
    <pre>{{ controls }}</pre>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
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
    const controls: FormControl<any>[] =
      props.form?.fields?.map(
        (field: InputBase<any>) => new FormControl({ ...field }),
      ) || [];

    return { controls };
  },
});
</script>

<style></style>
