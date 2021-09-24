<script lang="ts">
import {
  CheckboxField,
  FormValidator,
  Validator,
  email,
  pattern,
  EmailField,
  required,
  PasswordField,
} from '/@/'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ResetFormDemo',
  setup() {
    const formValues = ref({})
    const formRef = ref(null)

    const emailValidator: FormValidator = Validator({
      validator: email,
      text: 'Email format is incorrect',
    })

    const passwordValidator: FormValidator = Validator({
      validator: pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{8,10}$',
      ),
      text: 'Password must contain at least 1 Uppercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
    })

    const form = computed(() => ({
      id: 'basic-demo',
      fields: {
        email: EmailField({
          label: 'Email',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
            emailValidator,
          ],
        }),
        password: PasswordField({
          label: 'Password',
          autocomplete: 'current-password',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
            passwordValidator,
          ],
        }),
        rememberMe: CheckboxField({
          label: 'Remember Me',
        }),
      },
    }))

    function handleSubmit(values) {
      console.log('Values Submitted', values)
    }

    function valueChanged(values) {
      Object.assign(formValues.value, values)
      console.log('Values', values)
    }

    function handleError(errors) {
      console.error('Errors', errors)
    }

    function resetForm() {
      formRef.value.resetForm()
      formValues.value = {}
    }

    return {
      form,
      handleSubmit,
      formValues,
      valueChanged,
      handleError,
      formRef,
      resetForm,
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
          ref="formRef"
          :form="form"
          @submitted="handleSubmit"
          @change="valueChanged"
          @error="handleError"
        />
        <button
          data-cy="submit"
          class="btn mr-4 bg-green-500 text-white hover:bg-green-700 mt-4"
          submit="true"
          :form="form?.id"
        >
          Try me
        </button>

        <button
          class="btn bg-green-500 text-white hover:bg-green-700 mt-4"
          @click="resetForm"
        >
          Reset Me
        </button>
      </div>
    </div>
    <div class="mx-auto w-full sm:w-1/2">
      <Console :content="formValues" />
    </div>
  </div>
</template>

<style lang="scss">
@import '/@/styles/themes/default.scss';
</style>
