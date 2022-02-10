<template>
  <div class="field-wrapper">
    <div class="w-1/2">
      <dynamic-form :form="form" @change="updateValues" />
      <button
        class="
          font-bold
          py-2
          px-4
          rounded
          bg-green-500
          text-white
          hover:bg-green-700
          mt-4
        "
        submit="true"
        :form="form?.id"
      >
        Submit me
      </button>
    </div>
    <div class="w-1/2 p-4">
      <Console :content="formValues" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { PasswordField, DynamicForm, Validator, pattern } from '/@/'

export default {
  name: 'ValidationPattern',
  setup() {
    const formValues = reactive({})

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
      fields: {
        password: PasswordField({
          label: 'Password',
          validations: [
            Validator({
              validator: pattern(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{8,10}$',
              ),
              text: 'Password must contain at least 1 Uppercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
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
