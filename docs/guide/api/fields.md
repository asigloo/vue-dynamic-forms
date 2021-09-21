# Input Fields

By default, `Vue Dynamic Forms` cover the following input types:

- Text
- Email
- Password
- Url
- Number
- Checkbox
- Radio
- Select
- Textarea

::: tip
You can also include your very own custom input using `slots` (Check [Slots](./advanced/slots.md))
:::

## Text

The input of type `text` defines a single-line text field entry. We can create it manually of use the factory function `TextField` (recommended) available on the package.

<text-field />

```js
import { TextField } from '@asigloo/vue-dynamic-forms'

const yourAwesomeComponent = {
  name: 'InputDemo',
  data() {
    return {
      testForm: {
        id: 'form-text-demo',
        fields: {
          username: TextField({
            label: 'Username',
          }),
        },
      },
    }
  },
}
export default yourAwesomeComponent
```

## Email

The input of type `email` is used for input fields that should contain an e-mail address.

<email-field />

```js
import { EmailField, DynamicForm, Validator, FormValidator, email } from '/@/'

const yourAwesomeComponent = {
  name: 'EmailDemo',
  data() {
    return {
      testForm: {
        id: 'form-email-demo',
        fields: {
          email: EmailField({
            label: 'Email',
            validations: [
              Validator({
                validator: email,
                text: 'Email format is incorrect',
              }),
            ],
          }),
        },
      },
    }
  },
}
export default yourAwesomeComponent
```

## Password

The input of type `password` is used for input that define a password field (characters are masked)

<password-field />

```js
import {
  PasswordField,
  DynamicForm,
  Validator,
  FormValidator,
  pattern,
} from '/@/'

const yourAwesomeComponent = {
  name: 'EmailDemo',
  data() {
    return {
      testForm: {
        id: 'form-email-demo',
        fields: {
          password: PasswordField({
            label: 'Password',
            autocomplete: 'current-password',
            validations: [
              Validator({ text: 'This field is required' }),
              Validator({
                validator: pattern(
                  '^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{8,10}$',
                ),
                text: 'Password must contain at least 1 Uppercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
              }),
            ],
          }),
        },
      },
    }
  },
}
export default yourAwesomeComponent
```

## Number

The input of type `number` defines a single-line numerical field entry.

<number-field />

```js
import { NumberField } from '@asigloo/vue-dynamic-forms'

const yourAwesomeComponent = {
  name: 'NumberDemo',
  data() {
    return {
      testForm: {
        id: 'form-text-demo',
        fields: {
          stars: NumberField({
            label: 'Stars',
            value: 37,
          }),
        },
      },
    }
  },
}
export default yourAwesomeComponent
```

## Checkbox

The input of type `checkbox` defines a checkbox. The checkbox is shown as a square box that is ticked (checked) when activated. Checkboxes are used to let a user select one or more options of a limited number of choices.

<checkbox-input />

```js
import { CheckboxField, Validator, required } from '@asigloo/vue-dynamic-forms'

const yourAwesomeComponent = {
  name: 'CheckboxDemo',
  data() {
    return {
      testForm: {
        id: 'form-text-demo',
        fields: {
          awesomeness: CheckboxField({
            label: "Check  if you're awesome",
          }),
          certified: CheckboxField({
            label: 'Last Name',
            customClass: 'w-1/2',
            value: true,
          }),
          disabled: CheckboxField({
            label: 'Disabled',
            customClass: 'w-1/2',
            disabled: true,
          }),
        },
      },
    }
  },
}
export default yourAwesomeComponent
```

## Radio

The input of type `radio` defines a radio button. Radio buttons are normally presented in radio groups (a collection of radio buttons describing a set of related options). Only one radio button in a group can be selected at the same time.

<radio-input />

```js
import { RadioField } from '@asigloo/vue-dynamic-forms'

const yourAwesomeComponent = {
  name: 'RadioDemo',
  data() {
    return {
      testForm: {
        id: 'form-text-demo',
        fields: {
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
        },
      },
    }
  },
}
export default yourAwesomeComponent
```

## Select

The input of type `select` defines a drop-down list

<select-field />

```js
import { SelectField } from '@asigloo/vue-dynamic-forms'

const yourAwesomeComponent = {
  name: 'RadioDemo',
  data() {
    return {
      testForm: {
        id: 'form-text-demo',
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
      },
    }
  },
}
export default yourAwesomeComponent
```

## TextArea

The input of type `textarea` defines a multi-line input field (a text area).

The `rows` attribute specifies the visible number of lines in a text area.

The `cols` attribute specifies the visible width of a text area.

<text-area-field />

```js
import {
  TextAreaField,
  DynamicForm,
  Validator,
  minLength,
} from '@asigloo/vue-dynamic-forms'

const yourAwesomeComponent = {
  name: 'RadioDemo',
  data() {
    return {
      testForm: {
        id: 'form-text-demo',
        fields: {
          interests: TextAreaField({
            label: 'Bio',
            col: 5,
            rows: 10,
            validations: [
              Validator({
                validator: minLength(10),
                text: 'Text must be greater than 10 characters long',
              }),
            ],
          }),
        },
      },
    }
  },
}
export default yourAwesomeComponent
```
