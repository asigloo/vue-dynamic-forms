export function FormControl({
  type = null,
  value = null,
  validations = [],
  label = null,
  name = null,
  options = [],
  placeholder = null,
  errors = {},
}) {
  this.type = type;
  this.value = value;
  this.validations = validations;
  this.label = label;
  this.name = name;
  this.options = options;
  this.placeholder = placeholder;
  this.errors = errors;
}

export function FormField({
  type = null,
  value = null,
  validations = [],
  label = null,
  name = null,
  customClass = 'col-12 col-md-6',
  disabled = false,
  datalist = [],
  variant,
  options = [],
  placeholder = null,
  errors = {},
}) {
  this.type = type;
  this.value = value;
  this.validations = validations;
  this.label = label;
  this.variant = variant;
  this.datalist = datalist;
  this.name = name;
  this.customClass = customClass;
  this.disabled = disabled;
  this.options = options;
  this.placeholder = placeholder;
  this.errors = errors;
}

export default { FormControl, FormField };
