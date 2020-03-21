![repository-banner.png](https://res.cloudinary.com/alvarosaburido/image/upload/v1564929632/as-readme-banner_tqdgrx.png)

## Software version

- `node -v` : v12.4.0
- `npm -v` : v6.4.1
- `yarn -v`: 1.9.4
- `vue --version`:3.0.3
- `webpack -v` : v4.1.1

# Vue Dynamic Forms

![Current Relase](https://img.shields.io/github/package-json/v/alvarosaburido/vue-dynamic-forms) [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Easy way to dynamically create reactive forms in vue based on varying business object model

## Documentation

Complete documentation and examples available at

- **[API Documentation]()** (soon)
- **[Sandbox Demo]()** (soon)

## Installation

```bash
$ npm install @asigloo/vue-dynamic-forms
```

or if you prefer yarn

```bash
$ yarn add @asigloo/vue-dynamic-forms
```

## Usage

### Global

Register the component globally in your `main.js`:

```js
import Vue from 'vue';
import VueDynamicForms from '@asigloo/vue-dynamic-forms';

Vue.use(VueDynamicForms);
```

### Local

You can include the dynamic form directly to your component.

```js
import Vue from 'vue';
import { DynamicForm } from '@asigloo/vue-dynamic-forms';

const components = { DynamicForm };

export {
    ...
    components,
    ...
}
```

### Form Composition

The dynamic form component is really easy to use, you will only need to add it to your template like this:

```html
<template>
  <dynamic-form :id="testForm.id" :fields="testForm.fields" />
</template>
```

And then create the fields on your component's data structure, to create the fields you can import the factory function `FormField` from the library core:

```js
import { FormField } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: [
          new FormField({
            type: 'text',
            label: 'Name',
            name: 'name',
          }),
        ],
      },
    };
  },
};

export default yourAwesomeComponent;
```

### Styling themes

The components are unstyled by default, so you can customize them with your own styles. If you want a more "ready to go" solution you can import on of the themes we have included

## Development

### Project setup

```
yarn install
```

### Compiles and hot-reloads

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Run your unit tests

```
yarn run test:unit
```
