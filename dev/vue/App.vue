<template>
  <div id="app">
    <div class="page container">
      <h1 class="title m-4">{{ title }}</h1>
      <div class="flex justify-between">
        <div class="card p-6 mr-4">
          <dynamic-form
            :form="form"
            @submited="handleSubmit"
            @changed="valueChanged"
            @error="handleError"
          >
            <template
              v-slot:customField1="{ control, onChange, onFocus, onBlur }"
            >
              <div class="avocado-field">
                <input
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
        <div class="card p-6">
          <pre>{{ formValues }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mockAsync } from '@/core/utils/helpers';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { email, FieldTypes, pattern } from '../../src';

export default defineComponent({
  name: 'app',
  setup() {
    const title = ref('Vue Dynamic Forms');
    const formValues = reactive({});

    const emailValidator = {
      validator: email,
      text: 'Email format is incorrect',
    };

    const passwordValidator = {
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
          type: FieldTypes.TEXT,
          value: 'Alvaro',
        },
        email: {
          label: 'Email',
          type: FieldTypes.EMAIL,
          validations: [emailValidator],
        },
        password: {
          label: 'Password',
          type: FieldTypes.PASSWORD,
          validations: [passwordValidator],
        },
        stock: {
          label: 'Stock',
          type: FieldTypes.NUMBER,
        },
        games: {
          label: 'Games',
          type: FieldTypes.SELECT,
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
        },
        console: {
          label: 'Console (Async Options)',
          type: FieldTypes.SELECT,
          customClass: 'w-1/2',
          options: [],
        },
        steps: {
          label: 'Number',
          type: FieldTypes.NUMBER,
          min: 5,
          max: 60,
          step: 5,
          value: 5,
        },
        awesomeness: {
          label: "Check  if you're awesome",
          type: FieldTypes.CHECKBOX,
        },
        character: {
          label: 'Select one option',
          type: FieldTypes.RADIO,
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
        },
        customField1: {
          type: FieldTypes.CUSTOM,
          label: 'Custom Field',
        },
        color: {
          label: 'Color',
          type: FieldTypes.COLOR,
          value: '#4DBA87',
        },
      },
    });
    function handleSubmit(values) {
      console.log('Values Submitted', values);
    }
    function valueChanged(values) {
      Object.assign(formValues, values);
    }
    function handleError(errors) {
      // eslint-disable-next-line no-undef
      alert(errors);
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
