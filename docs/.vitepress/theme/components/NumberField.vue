<template>
  <div
    class="
      w-full
      flex
      justify-between
      container
      bg-white
      shadow-lg
      p-4
      rounded-lg
      my-8
    "
  >
    <div class="w-1/2">
      <dynamic-form :form="form" @change="updateValues" />
    </div>
    <div class="w-2/5 p-4">
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
