import { slugify } from './utils/helpers';

type ValidationErrors = {
  [key: string]: any;
};

interface ValidatorFn {
  (control: FormControl<any> | undefined): ValidationErrors | null;
}

export class FormValidation {
  validator: ValidatorFn;
  text: string;

  constructor(validator: ValidatorFn, text: string) {
    this.validator = validator;
    this.text = text || '';
  }
}

export class InputBase<T> {
  value: T | undefined;
  name: string;
  label: string;
  disabled?: boolean;
  order?: number;
  type: string;
  customClass?: string;
  placeholder?: string;
  validations?: FormValidation[];
  options?: { key: string; value: string; disabled?: boolean }[];
  cols?: number;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;

  constructor(
    options: {
      value?: T | undefined;
      name?: string;
      label?: string;
      disabled?: boolean;
      order?: number;
      type?: string;
      customClass?: string;
      placeholder?: string;
      validations?: FormValidation[];
      options?: { key: string; value: string; disabled?: boolean }[];
      cols?: number;
      rows?: number;
      min?: number;
      max?: number;
      step?: number;
    } = {},
  ) {
    this.value = options.value;
    this.name = options.name || slugify(options.label || '') || '';
    this.label = options.label || '';
    this.disabled = !!options.disabled;
    this.order = options.order === undefined ? 1 : options.order;
    this.type = options.type || '';
    this.customClass = options.customClass;
    this.placeholder = options.placeholder;
    this.validations = options.validations || [];
    this.options = options.options;
    this.rows = options.rows || 0;
    this.cols = options.cols || 0;
    this.min = options.min || 0;
    this.max = options.max || 0;
    this.step = options.step || 0;
  }
}

export class TextInput extends InputBase<string> {
  type = 'text';
}

export class EmailInput extends InputBase<string> {
  type = 'email';
}

export class NumberInput extends InputBase<number> {
  type = 'number';
}

export class UrlInput extends InputBase<string> {
  type = 'url';
}

export class PasswordInput extends InputBase<string> {
  type = 'password';
}

export class SelectInput<T> extends InputBase<T> {
  type = 'select';
}

export class TextAreaInput extends InputBase<string> {
  type = 'textarea';
}

export class CheckboxInput extends InputBase<boolean> {
  type = 'checkbox';
}

export class RadioInput extends InputBase<boolean> {
  type = 'radio';
}

export class ColorInput extends InputBase<string> {
  type = 'color';
}

export class FormControl<T> extends InputBase<T> {
  valid = true;
  invalid = false;
  dirty = false;
  touched = false;
  errors: ValidationErrors | null = {};
  constructor(
    options: {
      value?: T | undefined;
      name?: string;
      label?: string;
      disabled?: boolean;
      order?: number;
      type?: string;
      customClass?: string;
      validations?: FormValidation[];
      options?: { key: string; value: string; disabled?: boolean }[];
      cols?: number;
      rows?: number;
      min?: number;
      max?: number;
      step?: number;
    } = {},
  ) {
    super({
      value: options.value,
      name: options.name,
      label: options.label,
      type: options.type,
      disabled: !!options.disabled,
      order: options.order,
      customClass: options.customClass,
      validations: options.validations,
      options: options.options,
      rows: options.rows,
      cols: options.cols,
      min: options.min,
      max: options.max,
      step: options.step,
    });
  }
}

export interface FormOptions {
  customClass?: string;
  method?: string;
  netlify?: boolean;
  netlifyHoneypot?: string;
}
