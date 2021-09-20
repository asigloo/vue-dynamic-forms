## Form Fields & Inputs

### `FieldType`

```ts
export enum FieldTypes {
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
```

### `InputType`

```ts
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
  | CustomInput
```

### `FormFields`

```ts
export type FormFields = {
  [key: string]: InputType
}
```

### `InputBase`

```ts
export interface InputBase {
  name?: string
  label?: string
  ariaLabel?: string
  ariaLabelledBy?: string
  disabled?: boolean
  customClass?: string | string[] | BindingObject | BindingObject[] | unknown
  customStyles?: string | string[] | BindingObject | BindingObject[] | unknown
  placeholder?: string
  autocomplete?: string
  readonly?: boolean
  validations?: FormValidator[]
  validationTrigger?: ValidationTrigger
}
```

### `TextInput`

```ts
export type TextInput = InputBase & {
  type: FieldTypes.TEXT
  value?: string
}
```

### `TextInput`

```ts
export type NumberInput = InputBase & {
  type: FieldTypes.NUMBER
  value: number
  min: number
  max: number
  step: number
}
```

### `SelectInput`

```ts
export type SelectInput<T = boolean | string> = InputBase & {
  type: FieldTypes.SELECT
  value: T
  optionValue: string
  optionLabel: string
  options?: { label: string; value: string; disabled?: boolean }[]
}
```

### `TextAreaInput`

```ts
export type TextAreaInput = InputBase & {
  type: FieldTypes.TEXTAREA
  value: string
  cols?: number
  rows?: number
}
```

### `CheckboxInput`

```ts
export type CheckboxInput = InputBase & {
  type: FieldTypes.CHECKBOX
  value: boolean
}
```

### `RadioInput`

```ts
export type RadioInput = InputBase & {
  type: FieldTypes.RADIO
  value: string
  options?: { key: string; value: string; disabled?: boolean }[]
}
```

### `CustomInput`

```ts
export type CustomInput = InputBase & {
  type: FieldTypes.CUSTOM
  value: boolean | string | number
}
```

### `EmailInput`

```ts
export type EmailInput = InputBase & {
  type: FieldTypes.EMAIL
  value: string
}
```

### `PasswordInput`

```ts
export type PasswordInput = InputBase & {
  type: FieldTypes.PASSWORD
  value: string
}
```

### `ColorInput`

```ts
export type ColorInput = InputBase & {
  type: FieldTypes.COLOR
  value: string
}
```

### `UrlInput`

```ts
export type UrlInput = InputBase & {
  type: FieldTypes.URL
  value: string
}
```

## Form

### `FormOptions`

```ts
export interface FormOptions {
  customClass?: string | string[] | BindingObject | BindingObject[] | unknown
  customStyles?: string | string[] | BindingObject | BindingObject[] | unknown
  method?: string
  netlify?: boolean
  netlifyHoneypot?: string
  autocomplete?: boolean | string
  resetAfterSubmit?: boolean
}
```

### `DynamicForm`

```ts
export interface DynamicForm {
  id: string
  fields: FormFields
  fieldOrder?: string[]
  options?: FormOptions
}
```

## Controls & Validation

### `ValidationTrigger`

```ts
export enum ValidationTriggerTypes {
  BLUR = 'blur',
  CHANGE = 'change',
}
export interface ValidationTrigger {
  type: ValidationTriggerTypes
  threshold: number
}
```

### `ValidatorFn`

```ts
export interface ValidatorFn {
  (value: ControlValue | undefined): ValidationErrors | null
}
```

### `ValidationErrors`

```ts
export type ValidationErrors = {
  // eslint-disable-next-line
  [key: string]: any
}
```

### `FormValidator`

```ts
export interface FormValidator {
  validator: ValidatorFn
  text: string
  type?: string
}
```

### `ControlValue`

```ts
export type ControlValue = string | number | boolean
```

### `FormControl`

```ts
export type FormControl<T extends InputType> = T & {
  valid: boolean
  dirty: boolean
  touched: boolean
  errors: ValidationErrors | null
}
```
