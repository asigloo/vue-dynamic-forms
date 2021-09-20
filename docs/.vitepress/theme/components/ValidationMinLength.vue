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
      <p class="text-sm">
        Remove -1 character and blur to see the validation working 👆🏻
      </p>
    </div>
    <div class="w-2/5 p-4">
      <Console :content="formValues" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { TextField, DynamicForm, Validator, minLength } from '/@'

const MIN_VALUE = 7

export default {
  name: 'ValidationMinLength',
  setup() {
    const formValues = reactive({})

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
      fields: {
        username: TextField({
          label: 'Username',
          value: 'avocado',
          validations: [
            Validator({
              validator: minLength(MIN_VALUE),
              text: `Text length should be bigger than: ${MIN_VALUE}`,
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
