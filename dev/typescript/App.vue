<template>
  <div id="app">
    <div class="page container">
      <h1 class="title m-4 text-bg">{{ title }}</h1>
      <div class="flex flex-wrap justify-between">
        <div class="card p-6 w-full sm:w-1/2">
          <dynamic-form
            :form="form"
            @submited="handleSubmit"
            @change="valueChanged"
            @error="handleError"
          >
            <template
              v-slot:customField1="{ control, onChange, onFocus, onBlur }"
            >
              <div class="avocado-field">
                <input
                  :id="control.name"
                  v-if="control"
                  class="form-control"
                  v-model="control.value"
                  :type="control.type"
                  :name="control.name"
                  @change="onChange"
                  @focus="onFocus"
                  @blur="onBlur"
                />
                <i>🥑</i>
              </div>
            </template>
          </dynamic-form>
          <button
            class="btn bg-teal-500 text-white hover:bg-teal-700 mt-4"
            submit="true"
            :form="form?.id"
          >
            Submit Form
          </button>
        </div>
        <div class="p-6 w-full sm:w-1/3">
          <pre>{{ formValues }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mockAsync } from '@/core/utils/helpers';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import {
  TextInput,
  SelectInput,
  EmailInput,
  FormValidation,
  PasswordInput,
  CheckboxInput,
  RadioInput,
  email,
  pattern,
  ColorInput,
  NumberInput,
  CustomInput,
} from '../../src';
/* } from '../../dist/as-dynamic-forms.esm'; */
export default defineComponent({
  name: 'app',
  setup() {
    const title = ref('Vue Dynamic Forms');
    const formValues = reactive({});

    const emailValidator: FormValidation = {
      validator: email,
      text: 'Email format is incorrect',
    };

    const passwordValidator: FormValidation = {
      validator: pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{8,10}$',
      ),
      text:
        'Password must contain at least 1 Uppercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
    };

    const form = reactive({
      id: 'example-form',
      fieldOrder: [
        'name',
        'email',
        'password',
        'console',
        'games',
        'stock',
        'steps',
        'character',
        'awesomeness',
        'color',
        'customField1',
      ],
      fields: {
        name: {
          label: 'Name',
          type: 'text',
          value: 'Alvaro',
          required: true,
        } as TextInput,
        email: {
          label: 'Email',
          type: 'email',
          validations: [emailValidator],
        } as EmailInput,
        password: {
          label: 'Password',
          type: 'password',
          autocomplete: 'current-password',
          validations: [passwordValidator],
        } as PasswordInput,
        stock: {
          label: 'Stock',
          type: 'number',
        } as NumberInput,
        games: {
          label: 'Games',
          type: 'select',
          customClass: 'w-1/2',
          value: 'the-last-of-us',
          options: [
            {
              key: 'the-last-of-us',
              value: 'The Last of Us II',
            },
            {
              key: 'death-stranding',
              value: 'Death Stranding',
            },
            {
              key: 'nier-automata',
              value: 'Nier Automata',
            },
          ],
        } as SelectInput,
        console: {
          label: 'Console (Async Options)',
          type: 'select',
          customClass: 'w-1/2',
          options: [],
        } as SelectInput,
        steps: {
          label: 'Number',
          type: 'number',
          min: 5,
          max: 60,
          step: 5,
          value: 5,
        } as NumberInput,
        awesomeness: {
          label: "Check  if you're awesome",
          type: 'checkbox',
        } as CheckboxInput,
        character: {
          label: 'Select one option',
          type: 'radio',
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
        } as RadioInput,
        customField1: {
          type: 'custom-field',
          label: 'Custom Field',
        } as CustomInput,
        color: {
          label: 'Color',
          type: 'color',
          value: '#4DBA87',
        } as ColorInput,
      },
    });

    function handleSubmit(values) {
      console.log('Values Submitted', values);
    }

    function valueChanged(values) {
      Object.assign(formValues, values);
      /* console.log('Values', values); */
    }

    function handleError(errors) {
      console.error('Errors', errors);
    }

    onMounted(async () => {
      try {
        const consoleOptions = await mockAsync(true, 4000, [
          {
            key: 'playstation',
            value: 'Playstation',
          },
          {
            key: 'nintendo',
            value: 'Nintendo',
          },
          {
            key: 'xbox',
            value: 'Xbox',
          },
        ]);
        form.fields.console.options = consoleOptions as {
          key: string;
          value: string;
          disabled?: boolean;
        }[];
      } catch (e) {
        console.error(e);
      }
    });

    return {
      title,
      form,
      handleSubmit,
      valueChanged,
      formValues,
      handleError,
    };
  },
});
</script>
<style lang="scss">
.text-bg {
  background-image: linear-gradient(
    to top,
    #99ffd580 54%,
    transparent 54%,
    transparent 100%
  );
  width: fit-content;
}
.avocado-field {
  position: relative;

  .form-control {
    border-color: #aec64c;
    background-color: #e2eb5d52;
    border-radius: 16px;
  }
  i {
    position: absolute;
    top: 5px;
    right: 15px;
  }
}
</style>
