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
        <dynamic-form
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
          Sign In
        </button>
      </div>
    </div>
    <div class="mx-auto w-full sm:w-1/2"><Console :content="formValues" /></div>
  </div>
</template>

<script lang="ts">
import {
  FormValidator,
  email,
  Validator,
  EmailField,
  pattern,
  PasswordField,
  CheckboxField,
  required,
} from '/@/';
import { computed, defineComponent, reactive } from 'vue';
import Console from '../components/Console.vue';

const components = {
  Console,
};
/* } from '../../dist/as-dynamic-forms.esm'; */
export default defineComponent({
  name: 'LoginDemo',
  components,
  setup() {
    const formValues = reactive({});
    const emailValidator: FormValidator = Validator({
      validator: email,
      text: 'Email format is incorrect',
    });

    const passwordValidator: FormValidator = Validator({
      validator: pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{8,10}$',
      ),
      text: 'Password must contain at least 1 Uppercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
    });

    const form = computed(() => ({
      id: 'login-demo',
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
    }));

    function handleSubmit(values) {
      console.log('Values Submitted', values);
    }

    function valueChanged(values) {
      Object.assign(formValues, values);
      console.log('Values', values);
    }

    function handleError(errors) {
      console.error('Errors', errors);
    }

    return {
      form,
      formValues,
      handleSubmit,
      valueChanged,
      handleError,
    };
  },
});
</script>
<style lang="scss"></style>
