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
import { NumberField, DynamicForm, Validator, min } from '/@'

export default {
  name: 'ValidationMin',
  setup() {
    const formValues = reactive({
      stars: 0,
    })

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
      fields: {
        age: NumberField({
          label: 'Age',
          validations: [
            Validator({
              validator: min(18),
              text: 'You must be older than 18',
            }),
          ],
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
