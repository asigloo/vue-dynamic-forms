By default, form controls are resetted after `submit` event.

It's possible to deactivate this funcionality by setting `resetAfterSubmit` to `false` on the `Form Options`.

You can find and example [here](https://vue-dynamic-forms-demos.alvarosaburido.dev/reset-after-submit).

```typescript
export default {
  data() {
    return {
      form: {
        id: 'my-awesome-form',
        fields: {
          name: TextField({
            label: 'Name',
          }),
          email: EmailField({
            label: 'Email',
          }),
        },
      },
      options: {
        resetAfterSubmit: false,
      },
    }
  },
}
```

# Manual Reset

It's possible to reset the form controls and validation manually by accesing the `form` reference and calling the methods directly.

```html
<DynamicForm ref="formRef" :form="form" />
```

You can see the example [here](https://vue-dynamic-forms-demos.alvarosaburido.dev/reset-form).

## Options API

You can access the dom element ref above by using template refs `this.$ref`

```typescript

methods: {
    resetForm() {
        this.$refs.formRef.resetForm
    }
}

```

## Composition API

You can access the dom element ref above by using template refs `const formRef = ref(null)`.

::: warning
Remember to add the ref to the return statement on the `setup` function so it's available on the template.
:::

```typescript

setup() {
    const formRef = ref(null);

    function resetForm() {
      formRef.value.resetForm()
    }

    return {
        formRef
    }
}

```
