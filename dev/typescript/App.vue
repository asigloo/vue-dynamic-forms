<template>
  <div id="app" class="bg-gray-100">
    <div class="page container">
      <div class="flex flex-wrap justify-between">
        <div class="w-full sm:w-1/2 relative m-6">
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-200 shadow-xl transform -skew-y-3 sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl"
          ></div>
          <div class="relative card p-6 bg-white">
            <h1 class="title mb-16 text-bg">{{ title }}</h1>
            <dynamic-form
              :form="form"
              @submitted="handleSubmit"
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
              class="btn bg-green-500 text-white hover:bg-green-700 mt-4"
              submit="true"
              :form="form?.id"
            >
              Submit Form
            </button>
          </div>
        </div>
        <div class="p-6 w-full sm:w-1/3">
          <div
            class="result bg-marine text-white text-xs p-4 rounded-md relative"
          >
            <ul class="absolute top-1 left-2">
              <li class="rounded w-2 h-2 bg-salmon inline-block mr-1"></li>
              <li class="rounded w-2 h-2 bg-yellow-300 inline-block mr-1"></li>
              <li class="rounded w-2 h-2 bg-green-500 inline-block"></li>
            </ul>
            <pre data-cy="form-values" class="shadow-lg pt-4">{{
              formValues
            }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mockAsync, mockAsyncValidator } from '@/core/utils/helpers';
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import {
  TextField,
  SelectField,
  EmailField,
  PasswordField,
  NumberField,
  CheckboxField,
  RadioField,
  CustomField,
  ColorField,
  Validator,
  FormValidator,
  required,
  email,
  pattern,
  ValidatorTrigger,
  ValidationTriggerTypes,
  TextAreaField,
} from '../../src';
/* } from '../../dist/as-dynamic-forms.esm'; */
export default defineComponent({
  name: 'app',
  setup() {
    const title = ref('Vue Dynamic Forms');
    const formValues = reactive({});
    let consoleOptions = ref();
    const emailValidator: FormValidator = Validator({
      validator: email,
      text: 'Email format is incorrect',
    });

    const emailUniquenessValidator: FormValidator = {
      validator: value =>
        mockAsyncValidator(
          'isUnique',
          value === 'alvaro.saburido@gmail.com',
          2000,
        ),
      text: 'Email must be unique',
    };

    const passwordValidator: FormValidator = Validator({
      validator: pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{8,10}$',
      ),
      text:
        'Password must contain at least 1 Uppercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
    });

    const form = computed(() => ({
      id: 'example-form',
      fieldOrder: [
        'name',
        'email',
        'password',
        'bio',
        'console',
        'games',
        'stock',
        'steps',
        'character',
        'awesomeness',
        'color',
        'customField1',
        'customStyles',
        'readonly',
      ],
      fields: {
        name: TextField({
          label: 'Name',
          customClass: 'w-1/2 pr-4',
          validations: [
            Validator({ validator: required, text: 'This field is required' }),
          ],
        }),
        email: EmailField({
          label: 'Email',
          validations: [emailValidator, emailUniquenessValidator],
          customClass: {
            active: true,
            'text-blue': true,
            'w-1/2': true,
          },
        }),
        password: PasswordField({
          label: 'Password',
          autocomplete: 'current-password',
          validations: [passwordValidator],
        }),
        bio: TextAreaField({
          label: 'Bio',
          cols: 30,
          rows: 4,
        }),
        stock: NumberField({
          label: 'Stock',
          customClass: 'w-1/2 pr-4',
        }),
        games: SelectField({
          label: 'Games',
          customClass: 'w-1/2',
          value: 'the-last-of-us',
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
        console: SelectField({
          label: 'Console (Async Options)',
          customClass: 'w-1/2 pr-4',
          optionValue: 'console',
          options: consoleOptions.value,
        }),
        steps: NumberField({
          label: 'Number',
          min: 5,
          max: 60,
          step: 5,
          value: 5,
          customClass: 'w-1/2 ',
        }),
        awesomeness: CheckboxField({
          label: "Check  if you're awesome",
        }),
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
        customField1: CustomField({
          label: 'Custom Field',
        }),
        color: ColorField({
          label: 'Color',
          value: '#4DBA87',
        }),
        customStyles: TextField({
          label: 'Custom Styles',
          customStyles: {
            border: '1px solid teal',
          },
          validations: [emailValidator],

          validationTrigger: ValidatorTrigger({
            type: ValidationTriggerTypes.CHANGE,
            threshold: 4,
          }),
        }),
        readonly: TextField({
          label: 'Readonly',
          value: 'Alvaro',
          readonly: true,
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

    onMounted(async () => {
      try {
        consoleOptions.value = await mockAsync(true, 4000, [
          {
            console: 'playstation',
            label: 'Playstation',
          },
          {
            console: 'nintendo',
            label: 'Nintendo',
          },
          {
            console: 'xbox',
            label: 'Xbox',
          },
        ]);
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
