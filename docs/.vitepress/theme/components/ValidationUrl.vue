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
    <div class="w-2/5 p-4">
      <Console :content="formValues" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { UrlField, DynamicForm, Validator, url } from '/@/'

export default {
  name: 'ValidationUrl',
  setup() {
    const formValues = reactive({})

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
      fields: {
        website: UrlField({
          label: 'Website',
          validations: [
            Validator({
              validator: url,
              text: 'Format of url is incorrect',
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
