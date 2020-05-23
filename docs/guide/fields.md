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
You can also include your very own custom input using `slots` (Check [Slots](./slots.md))
:::

All the input types are instances of `FormField` which ends up creating the following html:

```html
<div class="dynamic-input form-group">
  <label for="username" class="form-label"> Username </label
  ><input
    id="username"
    name="username"
    type="text"
    class="form-control"
    autocomplete="off"
  />
</div>
```

## Text

The input of type `text` defines a single-line text field entry. If a `FormField` is created without passing the property `type`, it will be `text` by default.

<InputText />

```js
import { FormField } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'InputDemo',
  data() {
    return {
      testForm: {
        id: 'form-text-demo',
        fields: [new FormField({ label: 'Username', name: 'username' })],
      },
    };
  },
};
export default yourAwesomeComponent;
```

## Email

The input of type `email` is used for input fields that should contain an e-mail address.

<InputEmail />

```js
import { FormField, FormValidation, email } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'EmailDemo',
  data() {
    return {
      testForm: {
        id: 'form-email-demo',
        fields: [
          new FormField({
            type: 'email',
            label: 'Email',
            name: 'email',
            validations: [
              new FormValidation(email, 'Email format is incorrect'),
            ],
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```

## Password

The input of type `password` is used for input that define a password field (characters are masked)

<InputPassword />

```js
import { FormField, FormValidation, pattern } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'PasswordDemo',
  data() {
    return {
      testForm: {
        id: 'form-password-demo',
        fields: [
          new FormField({
            type: 'password',
            label: 'Password',
            name: 'password',
            validations: [
              new FormValidation(
                pattern(
                  '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[#$^+=!*()@%&]).{8,10}$',
                ),
                'Password must contain at least 1 Uppercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
              ),
            ],
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```

## Number

The input of type `number` defines a single-line numerical field entry

<InputNumber />

```js
import { FormField } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'InputNumberDemo',
  data() {
    return {
      testForm: {
        id: 'form-numbber-demo',
        fields: [
          new FormField({
            type: 'number',
            label: 'Stars',
            name: 'stars',
            value: 37,
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```

## Checkbox

The input of type `checkbox` defines a checkbox. The checkbox is shown as a square box that is ticked (checked) when activated. Checkboxes are used to let a user select one or more options of a limited number of choices.

<InputCheckbox />

```js
import { FormField } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'InputCheckboxDemo',
  data() {
    return {
      testForm: {
        id: 'form-checkbox-demo',
        fields: [
          new FormField({
            type: 'checkbox',
            label: 'Accept the conditions',
            name: 'policies',
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```

## Radio

The input of type `radio` defines a radio button. Radio buttons are normally presented in radio groups (a collection of radio buttons describing a set of related options). Only one radio button in a group can be selected at the same time.

<InputRadio />

```js
import { FormField } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'InputRadioDemo',
  data() {
    return {
      testForm: {
        id: 'form-radio-demo',
        fields: [
          new FormField({
            type: 'radio',
            label: 'Prefered Animal',
            name: 'animal',
            options: [
              { text: 'Dogs', value: 'dogs' },
              { text: 'Cats', value: 'cats' },
              { text: 'Others', value: 'others' },
            ],
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```

## Select

The input of type `radio` defines a drop-down list

<InputSelect />

```js
import { FormField } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'InputRadioDemo',
  data() {
    return {
      testForm: {
        id: 'form-select-demo',
        fields: [
          new FormField({
            type: 'select',
            label: 'Category',
            name: 'category',
            options: [
              { value: null, text: 'Please select an option' },
              { value: 'arduino', text: 'Arduino' },
              { value: 'transistors', text: 'Transistors' },
              { value: 'resistors', text: 'Resistors', disabled: true },
            ],
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```

If you want to select a predefined value, just add the property `value` to the `FormField` like this:

```js
new FormField({
    type: 'select',
    label: 'Category',
    name: 'category',
    value: 'arduino',
    options: [
        { value: null, text: 'Please select an option' },
        { value: 'arduino', text: 'Arduino' },
        { value: 'transistors', text: 'Transistors' },
        { value: 'resistors', text: 'Resistors', disabled: true },
    ],
}),
```

## TextArea

The input of type `textarea` defines a multi-line input field (a text area).

The `rows` attribute specifies the visible number of lines in a text area.

The `cols` attribute specifies the visible width of a text area.

<InputTextArea />

```js
import { FormField } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'TextAreaDemo',
  data() {
    return {
      testForm: {
        id: 'form-textarea-demo',
        fields: [
          new FormField({
            type: 'textarea',
            label: 'Bio',
            name: 'bio',
            cols: 30,
            rows: 5,
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
``;
```
