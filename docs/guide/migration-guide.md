## Overview

This guide is primarily for users with prior version of **Vue Dynamic Forms** (a.k.a **VDF**) for Vue 2 experience who wants to learn about the new features and changes in the new version for Vue 3.

To make things simpler, this library will follow the same major tags as Vue being:

- Vue dynamic Forms v2.x.x for Vue 2
- Vue dynamic Forms v3.x.x for Vue 3

## Quick Start

To start developing dynamic forms with the new version of the library, install the package from `latest` channel.

```bash
yarn add @asigloo/vue-dynamic-forms

# or, using NPM
npm install @asigloo/vue-dynamic-forms
```

## Notable new features

- Full Typescript Support
- Composition API
- Less bundle size (way less)
- Easier to apply async changes (such as options for a `Select` Input coming from a API call )
- Tree Shakeable

## Breaking Changes

### Typescript

The library was completly refactored to give full support to [Typescript](https://www.typescriptlang.org/). Native code is also in Typescript so everything runs smoothly.

### Initialization

The installation and usage has change to align with new Vue 3 initialization process, for more info read [Global Api - breaking changes](https://v3.vuejs.org/guide/migration/global-api.html#global-api)

#### 2.x.x syntax

In 2.x, the **Global API** was used in order to extend Vue App functionality with plugins, using `Vue.use` like this:

```js
import Vue from 'vue';
import VueDynamicForms from '@asigloo/vue-dynamic-forms';

Vue.use(VueDynamicForms);
```

#### 3.x.x syntax

In 3.x, we adapt the plugin installation to the new [Instance API](https://v3.vuejs.org/guide/migration/global-api.html#a-new-global-api-createapp)

Following this [Vue3 official guide](https://v3.vuejs.org/guide/plugins.html#writing-a-plugin) and taking repositories like [Vue-Router](https://github.com/vuejs/vue-router-next) as example.

```javascript
export interface DynamicFormsOptions {
  autoValidate?: boolean;
  form?: FormOptions;
}

export interface DynamicFormsPlugin {
  options?: DynamicFormsOptions;
  install(app: App): void;
}

export function createDynamicForms(
  options?: DynamicFormsOptions,
): DynamicFormsPlugin {
  const vdf: DynamicFormsPlugin = {
    options,
    install(app: App) {
      const self = this;
      app.component('dynamic-form', DynamicForm);
      app.provide(dynamicFormsSymbol, self);
    },
  };

  return vdf;
}
```

With that, we can use `createDynamicForms` to install the plugin in your Vue instance with `app.use` like this:

```javascript
import { createApp } from 'vue';
import { createDynamicForms } from '@asigloo/vue-dynamic-forms';

const VueDynamicForms = createDynamicForms({
  // Global Options go here
});

export const app = createApp(App);

app.use(VueDynamicForms);
```

### Usage

Another important difference is how we pass the props to the `<dynamic-form>` component and how the fields data is structured

#### 2.x.x syntax

In 2.x, form `id` and `fields` where separated as props.

```vue
<template>
  <dynamic-form :id="testForm.id" :fields="testForm.fields" />
</template>
```

#### 3.x.x syntax

In 3.x we wanted to reduce templating so you only need to pass a form `Object` as a prop.

```vue
<template>
  <dynamic-form :form="testForm" />
</template>

<script lang="ts">
...
setup() {
  const form = ref({
    id: 'test-form',
    fields: {
      // All fields declarations
    }
  })

  return {
    form
  }
}
...
</script>
```

### Fields schema

The idea was always to make easier to the user to declare schemas for each field.

#### 2.x.x syntax

In 2.x, each field could be defined using a normal object with the required fields or to make thing easier a class `FormField`. Fields was an `Array` of fields.

```javascript
fields: [
  new FormField({ type: 'text', label: 'Username', name: 'username' }),
  new FormField({ type: 'email', label: 'Email', name: 'email' }),
],
```

This had an important caveat, to find and modify any field a `fields.find(field => field.name ==='email')` was needed, it was possible to leverage the complexity by mixins but it wasn't the best solution.

#### 3.x.x syntax

In 3.x, the biggest breaking change is the structure of `fields`, now, it's and `Object` where each key is the **input name** (So is no longer needed to write it explicity on the `FormField` declaration)

```typescript
fields: {
  username: TextField({
    label: 'Username',
  }),
  email: EmailField({
    label: 'email',
  }),
}
```

Also is not needed to pass the input `type` anymore, the library will infer it from the **factory function** used to declare the field, ex: `EmailField`, because some inputs require different properties, like `min` and `max` in `type="number"` or `cols` and `rows` in a `text-area`, now each type has it's own factory function. This also help `typing` to be pretty straight forward. <!-- More info [here](./factories) -->

Similar to this, validation factory was also changed:

### Validation

#### 2.x.x syntax

In 2.x, the way to create validations was using the `FormValidation` function.

```javascript
new FormField({
  type: 'text',
  label: 'Username',
  name: 'username',
  validations: [
    new FormValidation(required, 'This field is required'),
  ],
}),
```

#### 3.x.x syntax

In 3.x, the way to create validations was using the `Validator` function.

```javascript
TextField({
  label: 'Username',
  validations: [
    Validator({ validator: required, text: 'This field is required' }),
  ],
}),
```

### Theming

In 2.x `themes` were available at

```scss
@import '~@asigloo/vue-dynamic-forms/src/styles/themes/default.scss';
```

In 3.x `themes` are under:

```scss
@import '~@asigloo/vue-dynamic-forms/dist/themes/default.scss';
```

There was a lot of work to improve change detections to improve performance, accesibility along with complete support to be used with `Composition API`-
