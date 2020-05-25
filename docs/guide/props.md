## Dynamic form

### `id`

This field of type `string` contains the form [id](https://developer.mozilla.org/en-US/search?q=form), is especially useful to access your form via javascript when accessing the DOM, also helps to assign external inputs or submit buttons via form attribute.

The form attribute `name` is set with the `id` value

```js
 id: {
    default: null,
    type: String,
  },
```

### `fields`

This is the prop containing an `Array` for [`FormFields`](./models.md) which is going to be the base of creating the input controls.

```js
fields: {
    type: Array,
},
```

### `options`

Contains all the form options using [`FormOptions`](./models.md)

```js
options: {
    type: Object,
    default: () => new FormOptions({}),
},
```

Defaults:

```javascript
options: {
  customClass = '',
  method = 'POST',
  autoValidate = false,
  netlify = false,
  netlifyHoneypot = null,
}
```

## Dynamic Input

### `formControl`

This is the prop containing an instance of [`FormControl`](./models.md) which tracks validation and errors for each input

```js
formControl: {
    default: () => new FormControl({}),
    type: Object,
},
```
