/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  | 'color'
  | 'custom-field';

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

export type ValidationErrors = {
  // eslint-disable-next-line
  [key: string]: any;
};

export type BindingObject = {
  [key: string]: any;
};

interface ValidatorFn {
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
  type: string;
  value?: string;
};

export type NumberInput = InputBase & {
  type: string;
  value: number;
  min: number;
  max: number;
  step: number;
};

export type SelectInput<T = boolean | string> = InputBase & {
  type: string;
  value: T;
  options?: { key: string; value: string; disabled?: boolean }[];
};

export type TextAreaInput = InputBase & {
  type: string;
  value: string;
  cols?: number;
  rows?: number;
};

export type CheckboxInput = InputBase & {
  type: string;
  value: boolean;
};

export type CustomInput = InputBase & {
  type: string;
  value: boolean | string | number;
};

export type EmailInput = InputBase & {
  type: string;
  value: string;
};

export type PasswordInput = InputBase & {
  type: string;
  value: string;
};

export type ColorInput = InputBase & {
  type: string;
  value: string;
};

export type UrlInput = InputBase & {
  type: string;
  value: string;
};

export type RadioInput = InputBase & {
  type: string;
  value: string;
  options?: { key: string; value: string; disabled?: boolean }[];
};

export type FormControl<T extends InputType> = T & {
  valid: boolean;
  invalid: boolean;
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

export const fieldTypes = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  NUMBER: 'number',
  EMAIL: 'email',
  URL: 'url',
  PASSWORD: 'password',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  CUSTOM: 'custom-field',
  COLOR: 'color',
};

// Factory Functions

export const FieldBase = ({
  value = null,
  validations = [],
  label = null,
  ariaLabel = null,
  ariaLabelledBy = null,
  customClass = null,
  customStyles = null,
  disabled = false,
  placeholder = null,
  inline = false,
  required = false,
  autocomplete = null,
  readonly = false,
} = {}): InputBase =>
  ({
    value,
    validations,
    label,
    ariaLabel,
    ariaLabelledBy,
    customClass,
    customStyles,
    disabled,
    placeholder,
    inline,
    required,
    autocomplete,
    readonly,
  } as InputBase);

export const TextField = ({ value = null, ...rest }): TextInput => ({
  ...FieldBase(rest),
  value,
  type: fieldTypes.TEXT,
});

export const EmailField = ({ value = null, ...rest }): EmailInput => ({
  ...FieldBase(rest),
  value,
  type: fieldTypes.EMAIL,
});

export const PasswordField = ({ value = null, ...rest }): PasswordInput => ({
  ...FieldBase(rest),
  value,
  type: fieldTypes.PASSWORD,
});

export const CheckboxField = ({ value = null, ...rest }): CheckboxInput => ({
  ...FieldBase(rest),
  value,
  type: fieldTypes.CHECKBOX,
});

export const ColorField = ({ value = null, ...rest }): ColorInput => ({
  ...FieldBase(rest),
  value,
  type: fieldTypes.COLOR,
});

export const RadioField = ({
  options = [],
  value = null,
  ...rest
}): RadioInput => ({
  ...FieldBase(rest),
  value,
  options,
  type: fieldTypes.RADIO,
});

export const NumberField = ({
  value = null,
  min = 0,
  max = 100,
  step = 1,
  ...rest
}): NumberInput => ({
  ...FieldBase(rest),
  value,
  min,
  max,
  step,
  type: fieldTypes.NUMBER,
});

export const SelectField = ({
  options = [],
  value = null,
  ...rest
}): SelectInput => ({
  ...FieldBase(rest),
  value,
  options,
  type: fieldTypes.SELECT,
});

export const CustomField = ({ value = null, ...rest }): CustomInput => ({
  ...FieldBase(rest),
  value,
  type: fieldTypes.CUSTOM,
});
