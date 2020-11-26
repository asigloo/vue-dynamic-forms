import { ControlValue, ValidationErrors, ValidatorFn } from '../models';

export const isEmptyInputValue = (value: ControlValue): boolean =>
  value == null || value === '';

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
const URL_REGEXP = /^((?:(https?):\/\/)?((?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9]))|(?:(?:(?:\w+\.){1,2}[\w]{2,3})))(?::(\d+))?((?:\/[\w]+)*)(?:\/|(\/[\w]+\.[\w]{3,4})|(\?(?:([\w]+=[\w]+)&)*([\w]+=[\w]+))?|\?(?:(wsdl|wadl))))$/;

export const required = (value: ControlValue): ValidationErrors | null =>
  isEmptyInputValue(value) ? { required: true } : null;

export const min = (min: number) => (
  value: number,
): ValidationErrors | null => {
  if (isEmptyInputValue(value) || isEmptyInputValue(min)) {
    return null; // don't validate empty values to allow optional controls
  }
  const minValue = parseFloat(`${value}`);

  return !isNaN(minValue) && minValue < min
    ? { min: { min, actual: +minValue } }
    : null;
};

export const max = (max: number) => (
  value: number,
): ValidationErrors | null => {
  if (isEmptyInputValue(value) || isEmptyInputValue(max)) {
    return null; // don't validate empty values to allow optional controls
  }
  const maxValue = parseFloat(`${value}`);
  // Controls with NaN values after parsing should be treated as not having a
  // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
  return !isNaN(maxValue) && maxValue > max
    ? { max: { max, actual: maxValue } }
    : null;
};

export const email = (value: string): ValidationErrors | null => {
  if (isEmptyInputValue(value)) {
    return null; // don't validate empty values to allow optional controls
  }
  return EMAIL_REGEXP.test(`${value}`) ? null : { email: true };
};

export const url = (value: string): ValidationErrors | null => {
  if (isEmptyInputValue(value)) {
    return null; // don't validate empty values to allow optional controls
  }
  return URL_REGEXP.test(`${value}`) ? null : { email: true };
};

export const minLength = (minLength: number) => (
  value: number,
): ValidationErrors | null => {
  if (isEmptyInputValue(value)) {
    return null; // don't validate empty values to allow optional controls
  }
  const length = value ? `${value}`.length : 0;
  return length < minLength
    ? { minlength: { requiredLength: minLength, actualLength: length } }
    : null;
};

export const maxLength = (maxLength: number) => (
  value: number,
): ValidationErrors | null => {
  if (isEmptyInputValue(value)) {
    return null; // don't validate empty values to allow optional controls
  }
  const length = value ? `${value}`.length : 0;
  return length > maxLength
    ? { maxlength: { requiredLength: maxLength, actualLength: length } }
    : null;
};

export const pattern = (pattern: string): ValidatorFn => {
  if (!pattern) return null;
  let regex: RegExp;
  let regexStr: string;
  if (typeof pattern === 'string') {
    regexStr = '';

    if (pattern.charAt(0) !== '^') regexStr += '^';

    regexStr += pattern;

    if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';

    regex = new RegExp(regexStr);
  } else {
    regexStr = pattern;
    regex = pattern;
  }
  return (value: ControlValue) => {
    if (isEmptyInputValue(value)) {
      return null; // don't validate empty values to allow optional controls
    }
    const patternValue = value;
    return regex.test(patternValue as string)
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
