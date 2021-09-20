## Dynamic form

### `submit`

Triggered when the form is submitted by clicking and `<input type="submit">` or a `<button submit="true">` and passing the validation.

```typescript
if (isValid.value) {
  ctx.emit('submitted', formValues.value)
}
```

### `error`

Triggered when the form is submitted but errors has been found.

```typescript
else {
   ctx.emit('error', errors.value);
}
```

### `change`

Triggered when a form field value is changed via modifying the input.

```typescript
function emitChanges(changes: FormChanges) {
  ctx.emit('change', changes)
}
```

## Dynamic Input

### `change`

Triggered when the input value is changed.

```typescript
function valueChange(event) {
  ctx.emit('change', event)
}
```

### `focus`

Triggered when the input is focused.

```typescript
onFocus: (e: InputEvent) => emit('focus', e),
```

### `blur`

Triggered when the input has lost focus.

```typescript
onBlur: (e: InputEvent) => emit('blur', e),
```

### `validate`

Triggered when the input has been validated.

```typescript
   onValidate: (validation: ValidationEvent) =>
          emit('validate', validation),
```
