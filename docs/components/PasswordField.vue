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
import {
  DynamicForm,
  Validator,
  FormValidator,
  pattern,
  PasswordField,
} from '/@/'

export default {
  name: 'PasswordField',
  setup() {
    const formValues = reactive({
      password: '',
    })

    const passwordValidator: FormValidator = Validator({
      validator: pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{8,10}$',
      ),
      text: 'Password must contain at least 1 Uppercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
    })

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
      fields: {
        password: PasswordField({
          label: 'Password',
          autocomplete: 'current-password',
          validations: [passwordValidator],
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
