The components are unstyled by default, so you can customize them with your own styles. If you want a more "ready to go" solution you can import one of the themes we have included in `src/styles/themes/`

```scss
@import '~@asigloo/vue-dynamic-forms/src/styles/themes/theme.scss';
```

More themes are in progress.

## Defaul Theme

Similar to default bootstrap theme for forms.

### Import to your app

```scss
@import '~@asigloo/vue-dynamic-forms/src/styles/themes/default.scss';
```

or with Nuxt Module options in `nuxt.config.js`:

```javascript [nuxt.config.js]
module.exports = {
  modules: ['@asigloo/vue-dynamic-forms/nuxt'],
  dynamicForms: {
    theme: 'default',
  },
};
```

### Customize your variables

```scss
$input-bg: #e2eb5d52;
$input-border-color: #aec64c;

@import '~@asigloo/vue-dynamic-forms/src/styles/themes/default.scss';
```

### Variables available

You have all this variables to customize your form inputs.

Consider that this variables will affect **All** your inputs, for more selective styling please use `customClass` available on the [models](./models.md).

```scss
$font-family-sans-serif: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' !default;

$input-line-height: 1.5 !default;
$input-font-family: $font-family-sans-serif !default;
$input-font-size: 1rem !default;
$input-font-weight: 400;

$input-padding-y: 0.375rem !default;
$input-padding-x: 0.75rem !default;
$input-border-width: 1px !default;
$input-border-color: #e9ecef !default;
$input-bg: #fff !default;
$input-disabled-bg: #e9ecef;
$input-border-radius: 0.25rem !default;

$input-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out !default;
$input-placeholder-color: #6c757d !default;
$input-box-shadow: inset 0 1px 1px rgba(#000, 0.075) !default;
$input-height: calc(
  #{$input-line-height * 1em} + #{$input-padding-y * 2} +
    #{$input-border-width * 2}
);

$input-focus-bg: $input-bg !default;
$input-focus-border-color: lighten($component-active-bg, 25%) !default;
$input-focus-color: $input-color !default;
$input-focus-width: $input-btn-focus-width !default;
$input-focus-box-shadow: $input-btn-focus-box-shadow !default;

$enable-shadows: true !default;

$input-error-color: #dc3545 !default;
```

## Material Theme

### Import to your app

```scss
@import '~@asigloo/vue-dynamic-forms/src/styles/themes/material.scss';
```

or with Nuxt Module options in `nuxt.config.js`:

```javascript [nuxt.config.js]
module.exports = {
  modules: ['@asigloo/vue-dynamic-forms/nuxt'],
  dynamicForms: {
    theme: 'material',
  },
};
```

### Variables available

You have all this variables to customize your form inputs.

Consider that this variables will affect **All** your inputs, for more selective styling please use `customClass` available on the [models](./models.md).

```scss
$theme-color: #6200ee;
$base-color: #ced4da;
$text-color: #202020;
$light: #fefefe;

$font-size: 1rem !default;

$font-family-sans-serif: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' !default;
$font-family: $font-family-sans-serif !default;

$line-height: 1.5;

$input-padding-y: 0.375rem;
$input-padding-x: 0.75rem;
$input-border-width: 1px;
$input-border-color: $base-color;
$input-border-radius: 0;
$input-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
$input-placeholder-color: #6c757d;

$input-error-color: #dc3545;
```

### Customize your variables

```scss
$theme-color: #6200ee;
$base-color: #ced4da;

@import '~@asigloo/vue-dynamic-forms/src/styles/themes/material.scss';
```

## Submit you own theme

If you have a great custom theme and you want it to be on the library submit a propose via PR [here](https://github.com/alvarosaburido/vue-dynamic-forms/pulls). 👩‍🎤👨‍🎤
