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
import { TextAreaField, DynamicForm, Validator, minLength } from '/@'

export default {
  name: 'TextAreaField',
  setup() {
    const formValues = reactive({
      bio: '',
    })

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
      fields: {
        bio: TextAreaField({
          label: 'Bio',
          col: 5,
          rows: 10,
          validations: [
            Validator({
              validator: minLength(10),
              text: 'Text must be greater than 10 characters long',
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
