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
import { NumberField, DynamicForm } from '/@'

export default {
  name: 'NumberField',
  setup() {
    const formValues = reactive({
      stars: 0,
    })

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
      fields: {
        stars: NumberField({
          label: 'Stars ⭐️',
          value: 0,
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
