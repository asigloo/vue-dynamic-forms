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
  EmailField,
  DynamicForm,
  Validator,
  FormValidator,
  email,
  required,
} from '/@/'

export default {
  name: 'EmailField',
  setup() {
    const formValues = reactive({
      email: '',
    })

    const emailValidator: FormValidator = Validator({
      validator: email,
      text: 'Email format is incorrect',
    })

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
      fields: {
        email: EmailField({
          label: 'Email',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
            emailValidator,
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
