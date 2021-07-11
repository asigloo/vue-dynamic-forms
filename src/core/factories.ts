import {
  InputBase,
  TextInput,
  FieldTypes,
  EmailInput,
  PasswordInput,
  CheckboxInput,
  ColorInput,
  RadioInput,
  NumberInput,
  SelectInput,
  CustomInput,
  FormControl,
  FormValidator,
  ValidationTriggerTypes,
  ValidationTrigger,
  TextAreaInput,
  UrlInput,
} from './models';

const EMPTY_CONTROL = {
  dirty: false,
  touched: false,
  valid: true,
  errors: null,
};

export const FieldBase = ({
  validations = [],
  label = null,
  ariaLabel = null,
  ariaLabelledBy = null,
  customClass = null,
  customStyles = null,
  disabled = false,
  placeholder = null,
  autocomplete = null,
  readonly = false,
  validationTrigger = ValidatorTrigger({
    type: ValidationTriggerTypes.BLUR,
    threshold: 0,
  }),
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
    autocomplete,
    readonly,
    validationTrigger,
  } as InputBase);

export const TextField = ({
  value,
  ...rest
}: Partial<TextInput>): TextInput => ({
  ...FieldBase(rest),
  value,
  type: FieldTypes.TEXT,
});

export const TextAreaField = ({
  value,
  cols = 20,
  rows = 3,
  ...rest
}: Partial<TextAreaInput>): TextAreaInput => ({
  ...FieldBase(rest),
  value,
  cols,
  rows,
  type: FieldTypes.TEXTAREA,
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

export const UrlField = ({ value, ...rest }: Partial<UrlInput>): UrlInput => ({
  ...FieldBase(rest),
  value,
  type: FieldTypes.URL,
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
  optionValue = 'value',
  optionLabel = 'label',
  ...rest
}: Partial<SelectInput>): SelectInput => ({
  ...FieldBase(rest),
  value,
  options,
  optionValue,
  optionLabel,
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

export const FieldControl = ({
  name,
  type,
  ...rest
}: Partial<FormControl<any>>): FormControl<any> => ({
  ...rest,
  name,
  type,
  ...EMPTY_CONTROL,
});

export const Validator = ({
  validator,
  text,
}: FormValidator): FormValidator => ({
  type: validator(undefined) ? Object.keys(validator(undefined))[0] : 'pattern',
  validator,
  text,
});

export const ValidatorTrigger = ({
  type,
  threshold,
}: ValidationTrigger): ValidationTrigger => ({
  type,
  threshold,
});
