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
import { CheckboxField, Validator, required, DynamicForm } from '/@'

export default {
  name: 'CheckboxField',
  setup() {
    const formValues = reactive({})

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
      fields: {
        awesomeness: CheckboxField({
          label: "Check  if you're awesome",
        }),
        required: CheckboxField({
          label: 'Required',
          customClass: 'w-1/2',
          validations: [
            Validator({
              validator: required,
              text: 'This field is required',
            }),
          ],
        }),
        disabled: CheckboxField({
          label: 'Disabled',
          customClass: 'w-1/2',
          disabled: true,
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
