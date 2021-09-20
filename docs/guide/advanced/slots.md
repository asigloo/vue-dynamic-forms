## Custom Field

Using dynamic scoped slots approach, now is easy to add your own custom fields to the `dynamic-forms` component.

<CustomField />

The first step is to add a new `FormField` with `type: 'custom-field'` to your form fields array in the components data:

```javascript
fields: {
    avocado: CustomField({
        label: 'My Avocado field',
    }),
},

```

Inside of the `dynamic-form` component, add a `<template>` tag with the attribute `v-slot:nameOfYourField` equal to your custom `CustomField` `name` property (In this case, `avocado`).

To make sure your component works within the same API, it's important to also add the deconstruction of the slot `v-slot:avocado="{ control, onChange, onFocus, onBlur }"` to the `<template>` tag. This will allow your input to access data And methods from inside the `Dynamic Form component` such as:

- `control`: contains `FormControl` instance // Check model 'FormControl`
  - value
  - type
  - name
  - dirty
  - touched
  - validations
  - errors
- `onChange`: event on input change
- `onFocus`: event on input focus.
- `onBlur`: event on input blur.

```html
<dynamic-form :form="form" @change="updateValues">
  <template v-slot:avocado="{ control, onChange, onFocus, onBlur }">
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
```
