<template>
  <div class="field-wrapper">
    <div class="w-1/2">
      <dynamic-form :form="form" @change="updateValues" />
    </div>
    <div class="w-1/2 p-4">
      <Console :content="formValues" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { TextField, DynamicForm } from '/@'

export default {
  name: 'TextField',
  setup() {
    const formValues = reactive({
      name: '',
    })

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
      fields: {
        name: TextField({
          label: 'Username',
        }),
      },
    })

    function updateValues(values) {
      Object.assign(formValues, values)
    }

    return {
      form,
      updateValues,
      formValues,
    }
  },
}
</script>
