## Dynamic form

### `submit`

Triggered when the form is submitted by clicking and `<input type="submit">` or a `<button submit="true">` and passing the validation.

```javascript
/**
 * @param values {Object}` - form values.
 */
this.$emit('submit', values);
```

### `error`

Triggered when the form is submitted but errors has been found.

```javascript
/**
 * @param errors {Object}` - form values.
 */
this.$emit('error', errors);
```

### `change`

Triggered when a form field value is changed via modifying the input.

```javascript
/**
 * @param value {Object}` - form values.
 */
this.$emit('change', values);
```

## Dynamic Input

### `change`

Triggered when the input value is changed.

```javascript
/**
 * @param value {Object|String|Numbber}` - input value.
 */
this.$emit('change', value);
```

### `focus`

Triggered when the input is focused.

```javascript
this.$emit('focus');
```

### `blur`

Triggered when the input has lost focus.

```javascript
this.$emit('blur');
```
