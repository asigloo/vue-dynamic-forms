## Custom Field Slot

Using dynamic scoped slots approach, now is easy to add your own custom fields to the `dynamic-forms` component.

<SlotCustomField />

The first step is to add a new `FormField` with `type: 'custom-field'` to your form fields array in the components data:

```javascript
new FormField({
    type: 'custom-field',
    label: 'My Avocado Field',
    name: 'avocado-field',
}),

```

Inside of the `dynamic-form` component, add a `<template>` tag with the attribute `slot` equal to your custom `FormField` `name` property (In this case, `avocado-field`).

To make sure your component works within the same API, it's important to also add `slot-scope="props"` to the `<template>` tag. This will allow your input to access data And methods from inside the `Dynamic Form component` such as:

- `control`: contains `FormControl` instance // Check model 'FormControl`
  - value
  - type
  - name
  - dirty
  - touched
  - validations
  - errors
- `valueChange`: event on input change
- `onFocus`: event on input focus.
- `blur`: event on input blur.

```html
<dynamic-form
  :id="testForm.id"
  :fields="testForm.fields"
  :options="testForm.options"
  @change="valuesChanged"
>
  <template slot="avocado-field" slot-scope="props">
    <div class="avocado-field">
      <input
        v-if="props.control"
        class="form-control"
        v-model="props.control.value"
        :type="props.control.type"
        :name="props.control.name"
        @change="props.valueChange()"
        @focus="props.onFocus()"
        @blur="props.onBlur()"
      />
      <i>🥑</i>
    </div>
  </template>
</dynamic-form>
```

You can also deconstruct the `props` object to have a more cleaner approach:

```html
<template
  slot="custom-field-1"
  slot-scope="{ control, valueChange, onFocus, onBlur }"
>
  <div class="avocado-field">
    <input
      v-if="control"
      class="form-control"
      v-model="control.value"
      :type="control.type"
      :name="control.name"
      @change="valueChange()"
      @focus="onFocus()"
      @blur="onBlur()"
    />
    <i>🥑</i>
  </div>
</template>
```
