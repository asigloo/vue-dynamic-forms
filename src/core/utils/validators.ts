import { ControlValue, ValidationErrors, ValidatorFn } from '../models';

export const isEmptyInputValue = (value: ControlValue): boolean =>
  value == null || value === '';

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
const URL_REGEXP = /^((?:(https?):\/\/)?((?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9]))|(?:(?:(?:\w+\.){1,2}[\w]{2,3})))(?::(\d+))?((?:\/[\w]+)*)(?:\/|(\/[\w]+\.[\w]{3,4})|(\?(?:([\w]+=[\w]+)&)*([\w]+=[\w]+))?|\?(?:(wsdl|wadl))))$/;

export const required = (value: ControlValue): ValidationErrors => ({
  required: isEmptyInputValue(value) ? true : null,
});

export const min = (min: number) => (value: ControlValue): ValidationErrors => {
  if (isEmptyInputValue(value) || isEmptyInputValue(min)) {
    return { min: null }; // don't validate empty values to allow optional controls
  }
  const minValue = parseFloat(`${value}`);
  return {
    min: !isNaN(minValue) && minValue < min ? { min, actual: +minValue } : null,
  };
};

export const max = (max: number) => (value: ControlValue): ValidationErrors => {
  if (isEmptyInputValue(value) || isEmptyInputValue(max)) {
    return { max: null }; // don't validate empty values to allow optional controls
  }
  const maxValue = parseFloat(`${value}`);
  // Controls with NaN values after parsing should be treated as not having a
  // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
  return {
    max: !isNaN(maxValue) && maxValue > max ? { max, actual: +maxValue } : null,
  };
};

export const email = (value: ControlValue): ValidationErrors => {
  if (isEmptyInputValue(value)) {
    return { email: null }; // don't validate empty values to allow optional controls
  }
  return { email: EMAIL_REGEXP.test(`${value}`) ? null : true };
};

export const url = (value: ControlValue): ValidationErrors => {
  if (isEmptyInputValue(value)) {
    return { url: null }; // don't validate empty values to allow optional controls
  }
  return { url: URL_REGEXP.test(`${value}`) ? null : true };
};

export const minLength = (minLength: number) => (
  value: ControlValue,
): ValidationErrors => {
  if (isEmptyInputValue(value)) {
    return { minLength: null }; // don't validate empty values to allow optional controls
  }
  const length = value ? `${value}`.length : 0;

  return {
    minLength:
      length < minLength
        ? { requiredLength: minLength, actualLength: length }
        : null,
  };
};

export const maxLength = (maxLength: number) => (
  value: ControlValue,
): ValidationErrors => {
  if (isEmptyInputValue(value)) {
    return { maxLength: null }; // don't validate empty values to allow optional controls
  }
  const length = value ? `${value}`.length : 0;
  return {
    maxLength:
      length > maxLength
        ? { requiredLength: maxLength, actualLength: length }
        : null,
  };
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
      return { pattern: null }; // don't validate empty values to allow optional controls
    }
    const patternValue = value;
    return {
      pattern: regex.test(patternValue as string)
        ? null
        : { requiredPattern: regexStr, actualValue: value },
    };
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
