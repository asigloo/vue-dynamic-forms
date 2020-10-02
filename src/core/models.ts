export type InputTypeKeys =
  | 'text'
  | 'email'
  | 'url'
  | 'number'
  | 'password'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'color';

export type InputType =
  | TextInput
  | NumberInput
  | SelectInput
  | TextAreaInput
  | CheckboxInput
  | RadioInput
  | EmailInput
  | PasswordInput
  | RadioInput
  | ColorInput
  | UrlInput
  | CustomInput;

type ValidationErrors = {
  [key: string]: any;
};

interface ValidatorFn {
  (control: FormControl<any> | undefined): ValidationErrors | null;
}

export interface FormValidation {
  validator: ValidatorFn;
  text: string;
}

export interface InputBase {
  value: any;
  name: string;
  label: string;
  disabled?: boolean;
  customClass?: string;
  placeholder?: string;
  validations?: FormValidation[];
}

export type TextInput = InputBase & {
  value: string;
  type: 'text';
};

/* export interface EmailInput extends InputBase<string> {
  type: 'email';
} */

export type NumberInput = InputBase & {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  type: 'number';
};

export type SelectInput<T = any> = InputBase & {
  type: 'select';
  value: T;
  options?: { key: string; value: string; disabled?: boolean }[];
};

export type TextAreaInput = InputBase & {
  cols?: number;
  rows?: number;
  type: 'textarea';
  value: string;
};

export type CheckboxInput = InputBase & {
  type: 'checkbox';
  value: boolean;
};

export type CustomInput = InputBase & {
  type: 'custom-field';
};

export type EmailInput = InputBase & {
  type: 'email';
  value: string;
};

export type PasswordInput = InputBase & {
  type: 'password';
  value: string;
};

export type ColorInput = InputBase & {
  type: 'color';
  value: string;
};

export type UrlInput = InputBase & {
  type: 'url';
  value: string;
};

export type RadioInput = InputBase & {
  type: 'radio';
  options?: { key: string; value: string; disabled?: boolean }[];
  value: string;
};

/* export type UrlInput = InputBase<'url', string>;

export type PasswordInput = InputBase<'password', string>;

export type SelectInput = InputBase<'select'> & {
  options?: { key: string; value: string; disabled?: boolean }[];
};

export type TextAreaInput = InputBase<'textarea', string> & {
  cols?: number;
  rows?: number;
};

export type CheckboxInput = InputBase<'checkbox', string>;

export type RadioInput = InputBase<'radio', string>;

export type ColorInput = InputBase<'color', string>;
 */
export type FormControl<T = InputType> = T & {
  valid: boolean;
  invalid: boolean;
  dirty: boolean;
  touched: boolean;
  errors: ValidationErrors | null;
};

export interface FormOptions {
  customClass?: string;
  method?: string;
  netlify?: boolean;
  netlifyHoneypot?: string;
}
