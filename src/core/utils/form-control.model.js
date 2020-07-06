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
  disabled = false,
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
  this.disabled = disabled;
  this.errors = errors;
  this.valid = valid;
  this.touched = touched;
  this.dirty = dirty;
  this.rows = rows;
  this.cols = cols;
  this.helper = helper;
}

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

export function FormValidation(
  validator = null,
  text = 'There is something wrong with this field',
) {
  this.validator = validator;
  this.text = text;
}

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

export default { FormControl, FormField, FormValidation, FormOptions };
