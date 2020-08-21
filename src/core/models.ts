import { slugify } from './utils/helpers';

type ValidationErrors = {
  [key: string]: any;
};

interface ValidatorFn {
  (control: FormControl<string>): ValidationErrors | null;
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
  placeholder?: string;
  validations?: FormValidation[];
  options?: { key: string; value: string; disabled?: boolean }[];

  constructor(
    options: {
      value?: T | undefined;
      name?: string;
      label?: string;
      disabled?: boolean;
      order?: number;
      type?: string;
      placeholder?: string;
      validations?: FormValidation[];
      options?: { key: string; value: string; disabled?: boolean }[];
    } = {},
  ) {
    this.value = options.value;
    this.name = options.name || slugify(options.label || '') || '';
    this.label = options.label || '';
    this.disabled = !!options.disabled;
    this.order = options.order === undefined ? 1 : options.order;
    this.type = options.type || '';
    this.placeholder = options.placeholder;
    this.validations = options.validations;
    this.options = options.options;
  }
}

export class TextInput extends InputBase<string> {
  type = 'text';
}

export class SelectInput<T> extends InputBase<T> {
  type = 'select';
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
      options?: { key: string; value: string; disabled?: boolean }[];
    } = {},
  ) {
    super({
      value: options.value,
      name: options.name,
      label: options.label,
      type: options.type,
      disabled: !!options.disabled,
      order: options.order,
    });
  }
}
