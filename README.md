![Library Banner](https://res.cloudinary.com/alvarosaburido/image/upload/v1589993773/portfolio/web/vue-dynamic-forms/open-graph-preview_kv4glm.png)

# Vue `3.x.x` Dynamic Forms

<p align="center">
  <a href="https://www.npmjs.com/package/@asigloo/vue-dynamic-forms">
    <img src="https://badgen.net/npm/v/@asigloo/vue-dynamic-forms/next" alt="Current npm version">
  </a>
  <a href="https://bundlephobia.com/result?p=@asigloo/vue-dynamic-forms">
    <img src="https://flat.badgen.net/bundlephobia/min/@asigloo/vue-dynamic-forms@next" alt="Minified size">
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

## Status: Beta

This is the Vue `3.x.x` compatible version. The focus right now is out of the box `Typescript` support, three shakeable, improve accesiility and be lighter in size. For Vue `2.x.x` please use the library tags [0.x](https://github.com/alvarosaburido/vue-dynamic-forms/tree/0.x).

## Documentation

Complete documentation and examples available at

- **[Documentation](https://vue-dynamic-forms.netlify.app)**
- **[Sandbox Demo](https://codesandbox.io/s/vue-dynamic-forms-ftzes)**
- **Migration Guide** (soon)

## Installation

```bash
$ npm install @asigloo/vue-dynamic-forms@next
```

or if you prefer yarn

```bash
$ yarn add @asigloo/vue-dynamic-forms@next
```

## Usage

The installation and usage has change to align with new Vue 3 initialization process.

To create a new `Dynamic Form` instance, use the `createDynamicForms` function;

```js
import { createApp } from 'vue';
import { createDynamicForms } from '@asigloo/vue-dynamic-forms';

const VueDynamicForms = createDynamicForms({});

export const app = createApp(App);

app.use(VueDynamicForms);
```

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

## Contributing

If you find this library useful and you want to help improve it, maintain it or just want a new feature, feel free to contact me, or feel free to do a PR 😁.

## Todolist

- [] Update docs

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
