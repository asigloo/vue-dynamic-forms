![Library Banner](https://res.cloudinary.com/alvarosaburido/image/upload/v1589993773/portfolio/web/vue-dynamic-forms/open-graph-preview_kv4glm.png)

# Vue `3.x.x` Dynamic Forms

<p align="center">
  <a href="https://www.npmjs.com/package/@asigloo/vue-dynamic-forms">
    <img src="https://badgen.net/npm/v/@asigloo/vue-dynamic-forms" alt="Current npm version">
  </a>

  <a href="https://bundlephobia.com/result?p=@asigloo/vue-dynamic-forms">
    <img src="https://flat.badgen.net/bundlephobia/min/@asigloo/vue-dynamic-forms" alt="Minified size">
   </a>

  <a href="https://vuejs.org">
    <img src="https://flat.badgen.net/badge/vue.js/3.x.x/4fc08d?icon=github" alt="Vue.js version">
  </a>
</p>

Implementing handcrafted forms can be:

1. Costly
2. Time-consuming

Especially if you need to create a very large form, in which the inputs are similar to each other, and they change frequently to meet rapidly changing business and regulatory requirements.

So, wouldn't it be more economical to create the forms dynamically? Based on metadata that describes the business object model?

That's **Vue Dynamic Forms**.

## Status: Stable

This is the Vue `3.x.x` compatible version. Out of the box `Typescript` support, three shakeable, improved accesiility and be lighter in size. For Vue `2.x.x` please use the library tags [2.x](https://github.com/alvarosaburido/vue-dynamic-forms/tree/2.x).

## Documentation

Complete documentation and examples available at

- **[Documentation](https://vue-dynamic-forms.alvarosaburido.dev/)**
- **[Demos](#demos)** or if you prefer online [here](https://vue-dynamic-forms-demos.alvarosaburido.dev/)
- **[Migration Guide](https://vue-dynamic-forms.alvarosaburido.dev/v3/guide/migration-guide.html)**

## Installation

```bash
$ npm install @asigloo/vue-dynamic-forms
```

or if you prefer yarn

```bash
$ yarn add @asigloo/vue-dynamic-forms
```

## Usage

The installation and usage has change to align with new Vue 3 plugin installation.

To create a new `Dynamic Form` instance, use the `createDynamicForms` function;

```js
import { createApp } from 'vue';
import { createDynamicForms } from '@asigloo/vue-dynamic-forms';

const VueDynamicForms = createDynamicForms();

export const app = createApp(App);

app.use(VueDynamicForms);
```

In your component:

```vue
<template>
  <dynamic-form :form="form" @change="valueChanged" />
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';

import {
  CheckboxField,
  TextField,
  SelectField,
} from '@asigloo/vue-dynamic-forms';

export default defineComponent({
  name: 'BasicDemo',
  setup() {
    const form = ref({
      id: 'basic-demo',
      fields: {
        username: TextField({
          label: 'Username',
        }),
        games: SelectField({
          label: 'Games',
          options: [
            {
              value: 'the-last-of-us',
              label: 'The Last of Us II',
            },
            {
              value: 'death-stranding',
              label: 'Death Stranding',
            },
            {
              value: 'nier-automata',
              label: 'Nier Automata',
            },
          ],
        }),
        checkIfAwesome: CheckboxField({
          label: 'Remember Me',
        }),
      },
    });

    function valueChanged(values) {
      console.log('Values', values);
    }

    return {
      form,
      valueChanged,
    };
  },
});
</script>
```

## Demos

![Vue Dynamic Forms Demo](https://res.cloudinary.com/alvarosaburido/image/upload/v1610265908/vue-dynamic-forms-demo.png)

We've prepared some demos to show different use cases of the library and how to use each type of input field.

To check them just run the command bellow which run the app at `http://localhost:6044/ `

```
yarn run serve
```

- [x] General Form
- [x] Text Fields
- [x] Number Fields
- [x] Select Fields
- [x] Textarea Fields
- [x] Radio Fields
- [x] Login
- [x] Custom Fields
- [ ] Axios form (Retrieve form structure from an API)
- [ ] TailwindCSS styling

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

### Generate types

```
yarn run build:dts
```

### Lints and fixes files

```
yarn run lint
```

### Run your unit tests

```
yarn run test
```

### Run your e2e tests

```
yarn run test
```

## Contributing

If you find this library useful and you want to help improve it, maintain it or just want a new feature, feel free to contact me, or feel free to do a PR 😁.

## Todolist

- [ ] Update docs

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
