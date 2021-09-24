<script lang="ts">
import { CheckboxField, TextField, SelectField } from '/@/'
import { computed, defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'BasicDemo',
  setup() {
    const formValues = reactive({})

    const form = computed(() => ({
      id: 'basic-demo',
      fields: {
        username: TextField({
          label: 'Username',
        }),
        games: SelectField({
          label: 'Games',
          options: [
            {
              value: 'the-last-of-us',
              label: 'The Last of Us II',
            },
            {
              value: 'death-stranding',
              label: 'Death Stranding',
            },
            {
              value: 'nier-automata',
              label: 'Nier Automata',
            },
          ],
        }),
        checkIfAwesome: CheckboxField({
          label: 'Remember Me',
        }),
      },
    }))

    function handleSubmit(values) {
      console.log('Values Submitted', values)
    }

    function valueChanged(values) {
      Object.assign(formValues, values)
      console.log('Values', values)
    }

    function handleError(errors) {
      console.error('Errors', errors)
    }

    return {
      form,
      formValues,
      handleSubmit,
      valueChanged,
      handleError,
    }
  },
})
</script>
<template>
  <div class="page container">
    <div class="mx-auto w-full sm:w-1/2 relative mb-24">
      <div
        class="
          absolute
          inset-0
          bg-gradient-to-r
          from-blue-400
          to-green-200
          shadow-xl
          transform
          -skew-y-3
          sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl
        "
      ></div>
      <div class="relative card p-6 bg-white">
        <DynamicForm
          :form="form"
          @submitted="handleSubmit"
          @change="valueChanged"
          @error="handleError"
        />
        <button
          data-cy="submit"
          class="btn bg-green-500 text-white hover:bg-green-700 mt-4"
          submit="true"
          :form="form?.id"
        >
          Try me
        </button>
      </div>
    </div>
    <div class="mx-auto w-full sm:w-1/2"><Console :content="formValues" /></div>
  </div>
</template>

<style lang="scss">
@import '/@/styles/themes/default.scss';
</style>
