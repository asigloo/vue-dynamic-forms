<script lang="ts">
import { RadioField, Validator, required } from '/@/';
import { computed, defineComponent, reactive } from 'vue';

/* } from '../../dist/as-dynamic-forms.esm'; */
export default defineComponent({
  name: 'RadioFieldsDemo',
  setup() {
    const formValues = reactive({});

    const form = computed(() => ({
      id: 'text-fields-demo',
      fields: {
        character: RadioField({
          label: 'Select one option',
          options: [
            {
              key: 'mario',
              value: 'Mario',
            },
            {
              key: 'crash-bandicoot',
              value: 'Crash Bandicoot',
            },
            {
              key: 'sonic',
              value: 'Sonic',
            },
            {
              key: 'banjo-kazooie',
              value: 'Banjo Kazooie',
              disabled: true,
            },
          ],
        }),
        console: RadioField({
          label: 'Select one option',
          options: [
            {
              key: 'nintendo-switch',
              value: 'Nintendo Switch',
            },
            {
              key: 'ps4',
              value: 'PS4',
            },

            {
              key: 'ps5',
              value: 'PS5',
            },
            {
              key: 'Xbox',
              value: 'XBox Serie X',
            },
          ],
          value: 'ps5',
        }),
        required: RadioField({
          label: 'Required',
          customClass: 'w-1/2',
          options: [
            {
              key: 'yes',
              value: 'Yes',
            },
            {
              key: 'no',
              value: 'No',
            },
          ],
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
        disabled: RadioField({
          label: 'Disabled',
          customClass: 'w-1/2',
          disabled: true,
          options: [
            {
              key: 'disable',
              value: 'Disable',
            },
            {
              key: 'no',
              value: 'No',
            },
          ],
        }),
      },
      options: {
        customClass: 'flex flex-wrap',
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
          Sign In
        </button>
      </div>
    </div>
    <div class="mx-auto w-full sm:w-1/2"><Console :content="formValues" /></div>
  </div>
</template>

<style lang="scss">
@import '/@/styles/themes/default.scss';
</style>
