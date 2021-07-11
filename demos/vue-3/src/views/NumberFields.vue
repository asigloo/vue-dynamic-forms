<script lang="ts">
import { FormValidator, min, max, Validator, NumberField, required } from '/@/';
import { computed, defineComponent, reactive } from 'vue';
import Console from '../components/Console.vue';

const components = {
  Console,
};
/* } from '../../dist/as-dynamic-forms.esm'; */
export default defineComponent({
  name: 'TextFieldsDemo',
  components,
  setup() {
    const formValues = reactive({});
    const minValidator: FormValidator = Validator({
      validator: min(18),
      text: 'Number must be greater than 18',
    });

    const maxValidator: FormValidator = Validator({
      validator: max(100),

      text: 'Number must be less than 100',
    });

    const form = computed(() => ({
      id: 'text-fields-demo',
      fields: {
        qty: NumberField({
          label: 'Quantity',
        }),
        stock: NumberField({
          label: 'Stock',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
        age: NumberField({
          label: 'Age',
          min: 18,
          validations: [Validator(minValidator)],
        }),
        percentage: NumberField({
          label: 'Percentage',
          max: 100,
          step: 5,
          validations: [Validator(maxValidator)],
        }),
        disabled: NumberField({
          label: 'Disabled',
          value: 3,
          disabled: true,
        }),
      },
      options: {
        customClass: 'grid gap-4 grid-cols-2',
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
          Submit
        </button>
      </div>
    </div>
    <div class="mx-auto w-full sm:w-1/2"><Console :content="formValues" /></div>
  </div>
</template>
