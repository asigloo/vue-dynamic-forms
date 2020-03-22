export function FormControl({
  type = null,
  value = null,
  validations = [],
  label = null,
  name = null,
  options = [],
  placeholder = null,
  errors = {},
  valid = true,
  touched = false,
  dirty = false,
}) {
  this.type = type;
  this.value = value;
  this.validations = validations;
  this.label = label;
  this.name = name;
  this.options = options;
  this.placeholder = placeholder;
  this.errors = errors;
  this.valid = valid;
  this.touched = touched;
  this.dirty = dirty;
}

export function FormField({
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
}) {
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
}

export function FormValidation(
  validator = null,
  text = 'There is something wrong with this field',
) {
  this.validator = validator;
  this.text = text;
}

export default { FormControl, FormField, FormValidation };
