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

// Factory Functions

export const FieldBase = ({
  validations = [],
  label = null,
  ariaLabel = null,
  ariaLabelledBy = null,
  customClass = null,
  customStyles = null,
  disabled = false,
  placeholder = null,
  required = false,
  autocomplete = null,
  readonly = false,
}: InputBase): InputBase =>
  ({
    validations,
    label,
    ariaLabel,
    ariaLabelledBy,
    customClass,
    customStyles,
    disabled,
    placeholder,
    required,
    autocomplete,
    readonly,
  } as InputBase);

export const TextField = ({
  value,
  ...rest
}: Partial<TextInput>): TextInput => ({
  ...FieldBase(rest),
  value,
  type: FieldTypes.TEXT,
});

export const EmailField = ({
  value,
  ...rest
}: Partial<EmailInput>): EmailInput => ({
  ...FieldBase(rest),
  value,
  type: FieldTypes.EMAIL,
});

export const PasswordField = ({
  value,
  ...rest
}: Partial<PasswordInput>): PasswordInput => ({
  ...FieldBase(rest),
  value,
  type: FieldTypes.PASSWORD,
});

export const CheckboxField = ({
  value,
  ...rest
}: Partial<CheckboxInput>): CheckboxInput => ({
  ...FieldBase(rest),
  value,
  type: FieldTypes.CHECKBOX,
});

export const ColorField = ({
  value,
  ...rest
}: Partial<ColorInput>): ColorInput => ({
  ...FieldBase(rest),
  value,
  type: FieldTypes.COLOR,
});

export const RadioField = ({
  options,
  value,
  ...rest
}: Partial<RadioInput>): RadioInput => ({
  ...FieldBase(rest),
  value,
  options,
  type: FieldTypes.RADIO,
});

export const NumberField = ({
  value = null,
  min = 0,
  max = 100,
  step = 1,
  ...rest
}: Partial<NumberInput>): NumberInput => ({
  ...FieldBase(rest),
  value,
  min,
  max,
  step,
  type: FieldTypes.NUMBER,
});

export const SelectField = ({
  options = [],
  value,
  ...rest
}: Partial<SelectInput>): SelectInput => ({
  ...FieldBase(rest),
  value,
  options,
  type: FieldTypes.SELECT,
});

export const CustomField = ({
  value,
  ...rest
}: Partial<CustomInput>): CustomInput => ({
  ...FieldBase(rest),
  value,
  type: FieldTypes.CUSTOM,
});
