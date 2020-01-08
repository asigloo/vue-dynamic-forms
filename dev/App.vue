<template>
  <div id="app">
    <div class="container">
      <h1 class="title text-center">Dynamic Forms Example</h1>
      <div class="row mt-5">
        <div class="col-6">
          <dynamic-form :id="testForm.id" :fields="testForm.fields" />
        </div>
        <div class="col-6">
          <pre>{{ testForm.fields }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const DynamicForm = () => import('@/components/dynamic-form/DynamicForm.vue');

const data = () => ({
  testForm: {
    id: 'test-form',
    fields: [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
        validations: [],
      },
    ],
  },
});

const components = {
  DynamicForm,
};

export default {
  name: 'app',
  data,
  components,
};
</script>

<style lang="scss"></style>
