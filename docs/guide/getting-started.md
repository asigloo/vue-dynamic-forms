## Installation

Install with yarn:

```bash
yarn add @asigloo/vue-dynamic-forms

# or, using NPM
npm install @asigloo/vue-dynamic-forms --S
```

## Setup

To create a new `Dynamic Form` instance, use the `createDynamicForms` function;

```javascript
import { createApp } from 'vue';
import { createDynamicForms } from '@asigloo/vue-dynamic-forms';

const VueDynamicForms = createDynamicForms({
  // Global Options go here
});

export const app = createApp(App);

app.use(VueDynamicForms);
```
