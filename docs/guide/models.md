This library counts with several factory functions to model your fields and validation. All of them can be imported into your code.

## `FormField`

This is the principal instance containing the info of your field, as seen in several documentation pages and example, your form fields must be of type FormField when declaring the array on your data object.

```javascript
export function FormField({
  id,
  type = 'text',
  value = null,
  validations = [],
  label = null,
  name = null,
  customClass = null,
  disabled = false,
  options = [],
  placeholder = null,
  inline = false,
  rows = null,
  cols = null,
  helper,
}) {
  this.id = id;
  this.type = type;
  this.value = value;
  this.validations = validations;
  this.label = label;
  this.name = name;
  this.customClass = customClass;
  this.disabled = disabled;
  this.options = options;
  this.placeholder = placeholder;
  this.inline = inline;
  this.rows = rows;
  this.cols = cols;
  this.helper = helper;
}
```

## `FormControl`

Tracks the value and validation status of an individual form control. `FormControls` are used inside of the main component to map the `FormFields` into controls with extra data like if the input is valid (no errors), if it's touched or dirty.

```javascript
export function FormControl({
  id,
  type = null,
  value = null,
  validations = [],
  label = null,
  form,
  name = null,
  customClass = null,
  options = [],
  placeholder = null,
  rows = null,
  cols = null,
  errors = {},
  valid = true,
  touched = false,
  dirty = false,
  helper,
}) {
  this.id = id || `${form}-${name}`;
  this.type = type;
  this.form = form;
  this.value = value;
  this.validations = validations;
  this.label = label;
  this.name = name;
  this.customClass = customClass;
  this.options = options;
  this.placeholder = placeholder;
  this.errors = errors;
  this.valid = valid;
  this.touched = touched;
  this.dirty = dirty;
  this.rows = rows;
  this.cols = cols;
  this.helper = helper;
}
```

## `FormValidation`

Contains validation control for the requested input field. See also [validations](validation.md).

```javascript
export function FormValidation(
  validator = null,
  text = 'There is something wrong with this field',
) {
  this.validator = validator;
  this.text = text;
}
```

## `FormOptions`

Contains the form options. Dahh.

```javascript
export function FormOptions({
  customClass = '',
  method = 'POST',
  autoValidate = false,
  netlify = false,
  netlifyHoneypot = null,
}) {
  this.customClass = customClass;
  this.method = method;
  this.autoValidate = autoValidate;
  this.netlify = netlify;
  this.netlifyHoneypot = netlifyHoneypot;
}
```
