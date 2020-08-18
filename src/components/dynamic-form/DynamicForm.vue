<template>
  <form class="dynamic-form" novalidate>
    {{ this.form.fields }}
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { DynamicForm } from './form';

const props = {
  form: Object as PropType<DynamicForm>,
};

export default defineComponent({
  name: 'asDynamicForm',
  props,
});
</script>

<style></style>
