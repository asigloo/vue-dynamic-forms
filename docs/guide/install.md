## Yarn / NPM

Install with yarn:

```bash
yarn add @asigloo/vue-dynamic-forms

# or, using NPM
npm install @asigloo/vue-dynamic-forms
```

## Add to vue

### Global

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

### Install it as Nuxt.js Module

Vue Dynamic Forms provides a [Nuxt.js](https://nuxtjs.org/) module for easily importing the library into your Nuxt.js App.

Nuxt.js version `2.12.2` (or greater) is recommended.

#### Getting dependencies

```bash
yarn add @asigloo/vue-dynamic-forms

# or, using NPM
npm install @asigloo/vue-dynamic-forms
```

Add `@asigloo/vue-dynamic-forms/nuxt` to modules section of your `nuxt.config.js` file.

```javascript
module.exports = {
  modules: ['@asigloo/vue-dynamic-forms/nuxt'],
};
```

#### Choosing theme

You can select directly the theme trough `dynamicForms` options like this

```javascript
module.exports = {
  modules: ['@asigloo/vue-dynamic-forms/nuxt'],
  dynamicForms: {
    theme: 'default',
  },
};
```
