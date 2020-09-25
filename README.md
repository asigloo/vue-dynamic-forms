![Library Banner](https://res.cloudinary.com/alvarosaburido/image/upload/v1589993773/portfolio/web/vue-dynamic-forms/open-graph-preview_kv4glm.png)

# Vue Dynamic Forms

<p align="center">
  <a href="https://www.npmjs.com/package/@asigloo/vue-dynamic-forms">
    <img src="https://badgen.net/npm/v/@asigloo/vue-dynamic-forms" alt="Current npm version">
  </a>
  <a href="https://bundlephobia.com/result?p=@asigloo/vue-dynamic-forms@0.2.0">
    <img src="https://flat.badgen.net/bundlephobia/min/@asigloo/vue-dynamic-forms" alt="Minified size">
  </a>
  <a href="https://vuejs.org">
    <img src="https://flat.badgen.net/badge/vue.js/2.6.x/4fc08d?icon=github" alt="Vue.js version">
  </a>
</p>

Implementing handcrafted forms can be:

1. Costly
2. Time-consuming

Especially if you need to create a very large form, in which the inputs are similar to each other, and they change frequently to meet rapidly changing business and regulatory requirements.

So, wouldn't it be more economical to create the forms dynamically? Based on metadata that describes the business object model?

That's Vue Dynamic Forms.

## Vue 3 Compatibility 

This is the Vue 2.x.x compatible version. For Vue 3.x.x please use the library tag [next](https://github.com/alvarosaburido/vue-dynamic-forms/tree/next).

## Documentation

Complete documentation and examples available at

- **[Documentation](https://vue-dynamic-forms.netlify.app)**
- **[Sandbox Demo](https://codesandbox.io/s/vue-dynamic-forms-ftzes)**

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

## Contributing

If you find this library useful and you want to help improve it, maintain it or just want a new feature, feel free to contact me, or feel free to do a PR 😁.

## Todolist

This are the features I have planned for next versions of this library

- [x] Material theme
- [ ] Form Mixins for fields manipulation (for example, change values of a field depending of other)
- [ ] More complex input types.
- [x] Nuxt plugin istall
- [x] Better docs & online examples

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
