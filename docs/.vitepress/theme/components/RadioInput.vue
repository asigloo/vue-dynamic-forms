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
import { RadioField, DynamicForm } from '/@'

export default {
  name: 'RadioField',
  setup() {
    const formValues = reactive({})

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
      fields: {
        console: RadioField({
          label: 'Select one option',
          options: [
            {
              key: 'nintendo-switch',
              value: 'Nintendo Switch',
            },
            {
              key: 'ps4',
              value: 'PS4',
            },

            {
              key: 'ps5',
              value: 'PS5',
            },
            {
              key: 'Xbox',
              value: 'XBox Serie X',
            },
          ],
          value: 'ps5',
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
