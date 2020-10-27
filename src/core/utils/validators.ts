import { FormControl, InputType, ValidationErrors } from '../models';

export const isEmptyInputValue = (value: string | number | boolean): boolean =>
  value == null || value === '';

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
const URL_REGEXP = /^((?:(https?):\/\/)?((?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9]))|(?:(?:(?:\w+\.){1,2}[\w]{2,3})))(?::(\d+))?((?:\/[\w]+)*)(?:\/|(\/[\w]+\.[\w]{3,4})|(\?(?:([\w]+=[\w]+)&)*([\w]+=[\w]+))?|\?(?:(wsdl|wadl))))$/;

export const required = (
  control: FormControl<InputType>,
): ValidationErrors | null =>
  isEmptyInputValue(control.value) ? { required: true } : null;

export const min = (min: number) => (
  control: FormControl<InputType>,
): ValidationErrors | null => {
  if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
    return null; // don't validate empty values to allow optional controls
  }
  const value = parseFloat(`${control.value}`);

  return !isNaN(value) && value < min
    ? { min: { min, actual: +control.value } }
    : null;
};

export const max = (max: number) => (
  control: FormControl<InputType>,
): ValidationErrors | null => {
  if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
    return null; // don't validate empty values to allow optional controls
  }
  const value = parseFloat(`${control.value}`);
  // Controls with NaN values after parsing should be treated as not having a
  // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
  return !isNaN(value) && value > max
    ? { max: { max, actual: control.value } }
    : null;
};

export const email = (
  control: FormControl<InputType>,
): ValidationErrors | null => {
  if (isEmptyInputValue(control.value)) {
    return null; // don't validate empty values to allow optional controls
  }
  return EMAIL_REGEXP.test(`${control.value}`) ? null : { email: true };
};

export const url = (
  control: FormControl<InputType>,
): ValidationErrors | null => {
  if (isEmptyInputValue(control.value)) {
    return null; // don't validate empty values to allow optional controls
  }
  return URL_REGEXP.test(`${control.value}`) ? null : { email: true };
};

export const minLength = (minLength: number) => (
  control: FormControl<InputType>,
): ValidationErrors | null => {
  if (isEmptyInputValue(control.value)) {
    return null; // don't validate empty values to allow optional controls
  }
  const length = control.value ? `${control.value}`.length : 0;
  return length < minLength
    ? { minlength: { requiredLength: minLength, actualLength: length } }
    : null;
};

export const maxLength = (maxLength: number) => (
  control: FormControl<InputType>,
): ValidationErrors | null => {
  const length = control.value ? `${control.value}`.length : 0;
  return length > maxLength
    ? { maxlength: { requiredLength: maxLength, actualLength: length } }
    : null;
};

export const pattern = (pattern: string): ValidationErrors | null => {
  if (!pattern) return null;
  let regex: RegExp;
  let regexStr: string | RegExp;
  if (typeof pattern === 'string') {
    regexStr = '';

    if (pattern.charAt(0) !== '^') regexStr += '^';

    regexStr += pattern;

    if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';

    regex = new RegExp(regexStr);
  }
  return (control: FormControl<InputType>) => {
    if (isEmptyInputValue(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }
    const value = `${control.value}`;
    return regex.test(value)
      ? null
      : { pattern: { requiredPattern: regexStr, actualValue: value } };
  };
};

export default {
  required,
  min,
  max,
  email,
  minLength,
  maxLength,
  pattern,
  url,
};
