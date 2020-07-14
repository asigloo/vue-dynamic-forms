## Third Party Example

What happens when you want to use a third-party vue component inside of the `dynamic-forms` component? The anwser is as simple as the implementation using [Custom Field Slot](../slots.md).

In this example we are going to use the amazing [Vue-select](https://github.com/sagalbot/vue-select) from [@salgabot](https://github.com/sagalbot)

Install with yarn:

```bash
yarn add vue-select

# or, using NPM
npm install vue-select
```

Then, import and register the component:

```javascript
import Vue from 'vue';
import vSelect from 'vue-select';

Vue.component('v-select', vSelect);
```

Thanks [@dflock](https://github.com/dflock) for the suggestion.

<ThirdParty />

What is really important for the correct functionality between the `dynamic-form` component and the third-party solution is that the last one needs to have the following API's:

- `v-model`
- Blur event
- Focus Event
- Change Event

If we check the template of this solution, the thirdparty is inside of a template slot that has `props` as scope, giving access to all the control methods like `valueChange`, `onFocus` etc. Make sure to connect both.

```vue
<template>
  <div class="form-composition library-example">
    <div v-if="testForm">
      <dynamic-form
        :id="testForm.id"
        :fields="testForm.fields"
        :options="testForm.options"
        @change="updateForm"
      >
        <template slot="third-party" slot-scope="props">
          <div class="third-party">
            <v-select
              v-model="props.control.value"
              :options="props.control.options"
              :name="props.control.name"
              @input="props.valueChange()"
              @search:focus="props.onFocus()"
              @search:blur="props.onBlur()"
            ></v-select>
          </div>
        </template>
      </dynamic-form>
    </div>
    <pre>{{ formData }}</pre>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import { DynamicForm, FormField } from '@asigloo/vue-dynamic-forms';

export default {
  name: 'Thirdparty',
  components: {
    DynamicForm,
    'v-select': vSelect,
  },
  data: () => ({
    formData: null,
    testForm: {
      id: 'test-form',
      fields: [
        new FormField({
          type: 'custom-field',
          label: 'V-Select',
          name: 'third-party',
          customClass: 'col-6',
          options: ['Arduino', 'Pinguino'],
        }),
      ],
      options: {
        customClass: 'row',
      },
    },
  }),
  methods: {
    updateForm(values) {
      this.formData = values;
    },
  },
};
</script>

<style lang="scss">
@import '../styles/styles.scss';

pre {
  color: white;
  font-size: 12px;
}

.vs__dropdown-toggle {
  background: white;
}
</style>
```
