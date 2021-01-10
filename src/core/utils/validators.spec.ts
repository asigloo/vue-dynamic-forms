import {
  isEmptyInputValue,
  required,
  min,
  max,
  email,
  url,
  minLength,
  maxLength,
  pattern,
} from './validators';

describe('Validators', () => {
  it('isEmptyInputValue should return true if value is null', () => {
    const value = null;
    const validation = isEmptyInputValue(value);
    expect(validation).toBe(true);
  });

  it('isEmptyInputValue should return true if value is empty string', () => {
    const value = '';
    const validation = isEmptyInputValue(value);
    expect(validation).toBe(true);
  });

  it('isEmptyInputValue should return true if value is null', () => {
    const value = null;
    const validation = isEmptyInputValue(value);
    expect(validation).toBe(true);
  });

  it('required should return true if value is empty', () => {
    const value = null;
    const validation = required(value);
    expect(validation.required).toBe(true);
  });

  it('required should return null if value is valid', () => {
    const value = 'Awiwi';
    const validation = required(value);
    expect(validation.required).toBeNull();
  });

  it('min should return null if value is empty', () => {
    const minValue = 4;
    const value = null;
    const validation = min(minValue)(value);
    expect(validation.min).toBeNull();
  });

  it('min should return null if value is greater than minValue', () => {
    const minValue = 4;
    const value = 8;
    const validation = min(minValue)(value);
    expect(validation.min).toBeNull();
  });

  it('min should return true if value is less than minValue', () => {
    const minValue = 4;
    const value = 3;
    const validation = min(minValue)(value);
    expect(validation.min).toStrictEqual({ min: minValue, actual: value });
  });

  it('max should return null if value is empty', () => {
    const maxValue = 4;
    const value = null;
    const validation = max(maxValue)(value);
    expect(validation.max).toBeNull();
  });

  it('max should return null if value is greater than maxValue', () => {
    const maxValue = 4;
    const value = 3;
    const validation = max(maxValue)(value);
    expect(validation.max).toBeNull();
  });

  it('max should return true if value is less than maxValue', () => {
    const maxValue = 4;
    const value = 8;
    const validation = max(maxValue)(value);
    expect(validation.max).toStrictEqual({ max: maxValue, actual: value });
  });

  it('email should return true if value is empty', () => {
    const value = null;
    const validation = email(value);
    expect(validation.email).toBeNull();
  });

  it('email should return true if value is invalid', () => {
    const value = 'hola.com';
    const validation = email(value);
    expect(validation.email).toBe(true);
  });

  it('email should return null if value is valid', () => {
    const value = 'hola@alvarosaburido.dev';
    const validation = email(value);
    expect(validation.email).toBeNull();
  });

  it('url should return true if value is empty', () => {
    const value = null;
    const validation = url(value);
    expect(validation.url).toBeNull();
  });

  it('url should return true if value is invalid', () => {
    const value = 'ftp://hola.com';
    const validation = url(value);
    expect(validation.url).toBe(true);
  });

  it('url should return null if value is valid', () => {
    const value = 'https://alvarosaburido.dev/blog';
    const validation = url(value);
    expect(validation.url).toBeNull();
  });

  it('minLength should return null if value is empty', () => {
    const minLengthValue = 4;
    const value = null;
    const validation = minLength(minLengthValue)(value);
    expect(validation.minLength).toBeNull();
  });

  it('minLength should return null if value is shorter than minLengthValue', () => {
    const minLengthValue = 4;
    const value = 'arepa ipsum';
    const validation = minLength(minLengthValue)(value);
    expect(validation.minLength).toBeNull();
  });

  it('minLength should return true if value is longer than minLengthValue', () => {
    const minLengthValue = 4;
    const value = 'awi';
    const validation = minLength(minLengthValue)(value);
    expect(validation.minLength).toStrictEqual({
      requiredLength: minLengthValue,
      actualLength: value.length,
    });
  });

  it('maxLength should return null if value is empty', () => {
    const maxLengthValue = 4;
    const value = null;
    const validation = maxLength(maxLengthValue)(value);
    expect(validation.maxLength).toBeNull();
  });

  it('maxLength should return null if value is longer than maxLengthValue', () => {
    const maxLengthValue = 4;
    const value = 'awi';
    const validation = maxLength(maxLengthValue)(value);
    expect(validation.maxLength).toBeNull();
  });

  it('maxLength should return true if value is shorter than maxLengthValue', () => {
    const maxLengthValue = 4;
    const value = 'arepa ipsum';

    const validation = maxLength(maxLengthValue)(value);
    expect(validation.maxLength).toStrictEqual({
      requiredLength: maxLengthValue,
      actualLength: value.length,
    });
  });

  it('pattern should return true if value is empty', () => {
    const value = null;
    const validation = pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{8,12}$',
    )(value);
    expect(validation.pattern).toBeNull();
  });

  it('pattern should return true if value is invalid', () => {
    const value = 'abcd1234';
    const validation = pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{8,12}$',
    )(value);
    expect(validation.pattern).toStrictEqual({
      actualValue: value,
      requiredPattern:
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{8,12}$',
    });
  });

  it('pattern should return null if value is valid', () => {
    const value = 'Abcd@1234';
    const validation = pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{8,12}$',
    )(value);
    expect(validation.pattern).toBeNull();
  });
});
