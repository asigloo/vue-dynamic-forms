# Input Fields

By default, `Vue Dynamic Forms` cover the following input types:

- Text
- Email
- Password
- Url
- Checkbox
- Radio
- Select
- Textarea

::: tip
You can also include your very own custom input using `slots` (Check [Slots](./slots.md))
:::

All the input types are instances of `FormField`.

## Text

<InputText />

The input of type `text` defines a single-line text field entry. If a `FormField` is created without passing the property `type`, it will be `text` by default.

```js
import { FormField } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'InputDemo',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: [new FormField({ label: 'Username', name: 'username' })],
      },
    };
  },
};
export default yourAwesomeComponent;
```

## Email

The input of type `email` is used for input fields that should contain an e-mail address.

<InputEmail />

```js
import { FormField, FormValidation } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'EmailDemo',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: [
          new FormField({
            type: 'email',
            label: 'Email',
            name: 'email',
            validations: [
              new FormValidation('email', 'Email format is incorrect'),
            ],
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```
