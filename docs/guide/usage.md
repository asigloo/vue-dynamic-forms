## Form Composition

The dynamic form component is pretty straight-forward. 😁

<FormComposition />

You will only need to add it to your template like this:

```html
<template>
  <dynamic-form :id="testForm.id" :fields="testForm.fields" />
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
          new FormField({ type: 'text', label: 'Name', name: 'name' }),
          new FormField({ type: 'email', label: 'Email', name: 'email' }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```

## Submitting the form

This is the recommended way to use the `dynamic-forms` with all the features. (Built-in Validations included).

```html
<template>
  <div>
    <dynamic-form
      :id="testForm.id"
      :fields="testForm.fields"
      @submit="formSubmitted"
      @error="processErrrors"
    />
    <button submit="true" :form="testForm.id">
      Submit
    </button>
  </div>
</template>
```

## Values Changed

The library provides you the possibility of submitting the form (check the previous section) or listen to the values change directly, using the `change` event.

```html
<template>
  <dynamic-form
    :id="testForm.id"
    :fields="testForm.fields"
    @change="updateValues"
  />
</template>
```

```js
methods: {
  updateValues(values) {
    // Apply your own validation
    // Do what you need with the data
  }
}
```

::: warning
By using `change` event, you are giving up to the built-in validation, which is only available if the form is submitted. You will need to apply the validation yourself or use the `error` event.
:::
