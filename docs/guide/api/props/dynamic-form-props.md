The `<dynamic-form>` component contains the following props:

## `form`

Contains the form object of type `DynamicForm`. Is strictly required.

```typescript
 form: {
    type: Object as PropType<DynamicForm>,
    required: true,
  },
```

```typescript
export interface DynamicForm {
  id: string
  fields: FormFields
  fieldOrder?: string[]
  options?: FormOptions
}
```

It contains the following properties:

- `id` : this field of type `string` contains the form [id](https://developer.mozilla.org/en-US/search?q=form), is especially useful to access your form via javascript when accessing the DOM, also helps to assign external inputs or submit buttons via form attribute.
- `fields`: this property holds an `Object` of type [`FormFields`](../../models.md#form-fields) which is going to be the base of creating the input controls.
- `field-order`: contains the desired order of the fields as an `Array` of strings.
- `options`: Contains all the form options using [`FormOptions`](../../models.md#form-options)
