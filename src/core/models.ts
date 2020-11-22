/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

export type MustHave<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type FormFields = {
  [key: string]: InputType;
};
export interface DynamicForm {
  id: string;
  fields: FormFields;
  fieldOrder?: string[];
}

export type ValidationErrors = {
  // eslint-disable-next-line
  [key: string]: any;
};

export type BindingObject = {
  [key: string]: unknown;
};

export interface ValidatorFn {
  (control: FormControl<InputType> | undefined): ValidationErrors | null;
}

export interface FormValidation {
  validator: ValidatorFn;
  text: string;
}

export interface InputBase {
  name?: string;
  label?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  required?: boolean;
  disabled?: boolean;
  customClass?: string | string[] | BindingObject | BindingObject[] | unknown;
  customStyles?: string | string[] | BindingObject | BindingObject[] | unknown;
  placeholder?: string;
  autocomplete?: string;
  readonly?: boolean;
  validations?: FormValidation[];
}

export type TextInput = InputBase & {
  type: FieldTypes.TEXT;
  value?: string;
};

export type NumberInput = InputBase & {
  type: FieldTypes.NUMBER;
  value: number;
  min: number;
  max: number;
  step: number;
};

export type SelectInput<T = boolean | string> = InputBase & {
  type: FieldTypes.SELECT;
  value: T;
  options?: { key: string; value: string; disabled?: boolean }[];
};

export type TextAreaInput = InputBase & {
  type: FieldTypes.TEXTAREA;
  value: string;
  cols?: number;
  rows?: number;
};

export type CheckboxInput = InputBase & {
  type: FieldTypes.CHECKBOX;
  value: boolean;
};

export type CustomInput = InputBase & {
  type: FieldTypes.CUSTOM;
  value: boolean | string | number;
};

export type EmailInput = InputBase & {
  type: FieldTypes.EMAIL;
  value: string;
};

export type PasswordInput = InputBase & {
  type: FieldTypes.PASSWORD;
  value: string;
};

export type ColorInput = InputBase & {
  type: FieldTypes.COLOR;
  value: string;
};

export type UrlInput = InputBase & {
  type: FieldTypes.URL;
  value: string;
};

export type RadioInput = InputBase & {
  type: FieldTypes.RADIO;
  value: string;
  options?: { key: string; value: string; disabled?: boolean }[];
};

export type FormControl<T extends InputType> = T & {
  valid: boolean;
  dirty: boolean;
  touched: boolean;
  errors: ValidationErrors | null;
};

export interface FormOptions {
  customClass?: string | string[] | BindingObject | BindingObject[];
  customStyles?: string | string[] | BindingObject | BindingObject[];
  method?: string;
  netlify?: boolean;
  netlifyHoneypot?: string;
  autocomplete?: boolean;
}

export const enum FieldTypes {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  NUMBER = 'number',
  EMAIL = 'email',
  URL = 'url',
  PASSWORD = 'password',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  CUSTOM = 'custom-field',
  COLOR = 'color',
}
