The `<dynamic-input>` component contains the following props:

## `control`

Contains an instance of the `FormControl` Object which tracks the value and validation status of an individual input field.

```typescript
 control: {
    type: Object as PropType<FormControl<InputType>>,
    required: true,
  },
```

```typescript
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

export type FormControl<T extends InputType> = T & {
  valid: boolean
  dirty: boolean
  touched: boolean
  errors: ValidationErrors | null
}
```

## `forceValidation`

By default, input validation can be triggered by a `blur` or a `change` event on the input (Check [validation](../../guide/validation.md)). However you can force the validation state of the input by changing this prop to `true`.

```typescript
  forceValidation: {
    type: Boolean,
    default: false,
  },
```
