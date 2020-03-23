![repository-banner.png](https://res.cloudinary.com/alvarosaburido/image/upload/v1564929632/as-readme-banner_tqdgrx.png)

# Vue Dynamic Forms

![Current Relase](https://img.shields.io/github/package-json/v/alvarosaburido/vue-dynamic-forms) [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Easy way to dynamically create reactive forms in vue based on varying business object model

## Documentation

Complete documentation and examples available at

- **[API Documentation]()** (soon)
- **[Sandbox Demo](https://codesandbox.io/s/vue-dynamic-forms-ftzes)**

## Installation

```bash
$ npm install @asigloo/vue-dynamic-forms
```

or if you prefer yarn

```bash
$ yarn add @asigloo/vue-dynamic-forms
```

## Usage

### Global

Register the component globally in your `main.js`:

```js
import Vue from 'vue';
import VueDynamicForms from '@asigloo/vue-dynamic-forms';

Vue.use(VueDynamicForms);
```

### Local

You can include the dynamic form directly to your component.

```js
import Vue from 'vue';
import { DynamicForm } from '@asigloo/vue-dynamic-forms';

const components = { DynamicForm };

export {
    ...
    components,
    ...
}
```

### Form Composition

The dynamic form component is really easy to use, you will only need to add it to your template like this:

```html
<template>
  <dynamic-form :id="testForm.id" :fields="testForm.fields" />
  <button type="submit" form="testForm.id">Submit</button>
</template>
```

And then create the fields on your component's data structure, to create the fields you can import the factory function `FormField` from the library core:

```js
import { FormField } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: [
          new FormField({
            type: 'text',
            label: 'Name',
            name: 'name',
          }),
          new FormField({
            type: 'email',
            label: 'Email',
            name: 'email',
          }),
        ],
      },
    };
  },
};

export default yourAwesomeComponent;
```

Each `FormField` has a set of properties to customize your input field:

| Property    | Type             | Default | Description                                                                                            |
| :---------- | :--------------- | :------ | :----------------------------------------------------------------------------------------------------- |
| type        | String           | text    | Define the nature of the field, can be `text|email|url|password|number|radio|checkbox|textarea|select` |
| label       | String           | null    | Defines the text in the input label                                                                    |
| placeholder | String           | null    | Defines short hint that describes the expected value of an input field                                 |
| name        | String           | null    | Name property for the field inside of the form data                                                    |
| value       | any              | null    | Initial value of the input field                                                                       |
| disabled    | Boolean          | false   | Whenever the input field is disabled or not                                                            |
| customClass | String           | null    | Allows the user to set custom classes to the input for styling purpouses                               |
| options     | Array of Objects | []      | Options for input type `select`                                                                        |
| inline      | Boolean          | false   | Specifies if options for `radio|checkbox` should be inline                                             |
| validations | Array of Objects | []      | Array of `FormValidation` objects, specify validations and messages for the input                      |

### Events and Submit

| Event        | Type | Emitter       | Description                                                                                                                    |
| :----------- | :--- | :------------ | :----------------------------------------------------------------------------------------------------------------------------- |
| `submit`     |      | `DynamicForm` | Emits whenever the submit button has been clicked and the form is valid (no errors), returns all the form values in an Object  |
| `form-error` |      | `DynamicForm` | Emits whenever the submit button has been clicked and the form is invalid (with errors), returns all errors                    |
| `change`     |      | `DynamicForm` | Emits every time there is a value changed on the form, returns all the form values in an Object without the need ob submitting |

A small example of a form without submit button

```html
<template>
  <dynamic-form
    :id="testForm.id"
    :fields="testForm.fields"
    @change="valuesChanged"
  />
</template>
```

```js
...
const yourAwesomeComponent = {
  name: 'your-awesome',
  methods: {
    valuesChanged(values) {
      this.formData = {
        ...this.formData,
        ...values,
      };
    },
  }
}
...
```

### Select input

```js
...
new FormField({
  type: 'select',
  label: 'Category',
  name: 'category',
  options: [
    { value: null, text: 'Please select an option' },
    { value: 'arduino', text: 'Arduino' },
    { value: 'transistors', text: 'Transistors' },
  ],
}),
...
```

### Radio and Checkboxes

```js
...
new FormField({
  type: 'checkbox',
  label: 'Read the conditions',
  name: 'conditions',
  inline: false,
}),
new FormField({
  type: 'radio',
  label: 'Prefered Animal',
  name: 'animal',
  inline: true,
  options: [
    { text: 'Dogs', value: 'dogs' },
    { text: 'Cats', value: 'cats' },
    { text: 'Others', value: 'others' },
  ],
}),
...
```

### Validation

This library offers a simple validation system using the property `validations` as an array of `FormValidation`objects containing the validation function and the text in case of error.

To use it you need the following code:

```js
import {
  FormField,
  FormValidation,
  required,
  email,
  pattern,
} from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: [
          new FormField({
            type: 'text',
            label: 'Name',
            name: 'name',
          }),
          new FormField({
            type: 'email',
            label: 'Email',
            name: 'email',
            validations: [
              new FormValidation(required, 'This field is required'),
              new FormValidation(email, 'Format of email is incorrect'),
            ],
          }),
          new FormField({
            type: 'password',
            label: 'Password',
            name: 'password',
            validations: [
              new FormValidation(required, 'This field is required'),
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

### Styling themes

The components are unstyled by default, so you can customize them with your own styles. If you want a more "ready to go" solution you can import on of the themes we have included in `src/styles/themes/`

```scss
@import '~@asigloo/vue-dynamic-forms/src/styles/themes/default.scss';
```

## Development

### Project setup

```
yarn install
```

### Compiles and hot-reloads

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Run your unit tests

```
yarn run test:unit
```

## Contributing

If you find this library useful and you want to help improve it, maintain it or just want a new feature, feel free to contact me, or feel free to do a PR 😁.

## Todolist

This are the features I have planned for next versions of this library

- [ ] Material theme
- [ ] Form Mixins for fields manipulation (for example, change values of a field depending of other)
- [ ] More complex input types.
- [ ] Nuxt plugin istall
- [ ] Better docs & online examples
- [ ] Storybook

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
