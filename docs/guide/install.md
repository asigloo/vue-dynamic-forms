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
