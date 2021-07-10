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

<script lang="ts">
import { SelectField, Validator, required } from '/@/';
import { computed, defineComponent, reactive } from 'vue';
import Console from '../components/Console.vue';

const components = {
  Console,
};
/* } from '../../dist/as-dynamic-forms.esm'; */
export default defineComponent({
  name: 'SelectFieldsDemo',
  components,
  setup() {
    const formValues = reactive({});

    const form = computed(() => ({
      id: 'select-fields-demo',
      fields: {
        game: SelectField({
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
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
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
        disabled: SelectField({
          label: 'Disabled',
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
