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
import { reactive, toRefs } from 'vue'
import { SelectField, DynamicForm } from '/@'

export default {
  name: 'SelectInput',
  setup() {
    const formValues = reactive({
      character: '',
    })

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
      fields: {
        character: SelectField({
          label: 'Characters',
          options: [
            {
              value: 'crash',
              label: 'Crash Bandicoot',
            },
            {
              value: 'spyro',
              label: 'Spyro the Dragon',
            },
            {
              value: 'cloud',
              label: 'Cloud',
            },
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
