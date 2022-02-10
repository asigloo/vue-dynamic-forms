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
import { NumberField, DynamicForm, Validator, max } from '/@'

export default {
  name: 'ValidationMax',
  setup() {
    const formValues = reactive({
      stars: 0,
    })

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
      fields: {
        age: NumberField({
          label: 'Tip',
          validations: [
            Validator({
              validator: max(100),
              text: 'Tips canmot be more than 100 €',
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
