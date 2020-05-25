This library comes with a Built-in Validation responsible of controlling that the inputs match certain criteria defined by the user when defining the `FormFields`.

By default, **Vue Dynamic Forms** contains the following validations:

- required
- min
- max
- email
- minLength
- maxLength
- pattern

To add validations to your fields, you only need to import the `FormValidation` and the desired validation function into your component like this:

```js
import { FormField, required } from '@asigloo/vue-dynamic-forms';
```

The `FormValidation` function takes 2 params, the validation function (required, min, max, email, etc) and the message to display when the validations are not successful:

```js
new FormValidation(email, 'Format of email is incorrect');
```

## `required`

The required attribute is a boolean attribute.

When present, it specifies that an input field must be filled out before submitting the form.

```js
import {
  FormField,
  FormValidation,
  required,
} from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: [
          new FormField({
            type: 'text',
            label: 'Username',
            name: 'username',
            validations: [
              new FormValidation(required, 'This field is required'),
            ],
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```
