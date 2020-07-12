This library comes with built-in validation responsible for validating that the inputs match certain criteria defined by the user when defining the `FormFields`.

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

<ValidationRequired />

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

## `email`

Email input types are just a text field with a semantic use of `type="email"`, so the text string should be tested to match an email pattern (lowercase and uppercase, and `@` followed by a domain name with `.` and a suffix).

The best way to achieve it is by using a regular expression, we use the following one, [email](https://regex101.com/r/3qY1kt/1).

<ValidationEmail />

```js
import { FormField, FormValidation, email } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'your-awesome',
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
              new FormValidation(email, 'Format of email is incorrect'),
            ],
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```

## `url`

Url input types are just a text field with a semantic use of `type="url"`, so the text string should be tested to match an url pattern.

<ValidationUrl />

```js
import { FormField, FormValidation, url } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: [
          new FormField({
            type: 'url',
            label: 'Website',
            name: 'website',
            validations: [
              new FormValidation(url, 'Format of this url is incorrect'),
            ],
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```

## `pattern`

If you need a text validation that is not included by default in the library, such as a specific password rule, you can use the `pattern` validator.

<ValidationPattern />

```js
import { FormField, FormValidation, pattern } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: [
          new FormField({
            type: 'password',
            label: 'Password',
            name: 'password',
            validations: [
              new FormValidation(required, 'This field is required'),
              new FormValidation(
                pattern(
                  '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[#$^+=!*()@%&]).{8,10}$',
                ),
                'Password must contain at least 1 Uppercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
              ),
            ],
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```

## `min`

The `min` validators check if a numeric input type value less than a certain threshold.

<ValidationMin />

```js
import {
  FormField,
  FormValidation,
  required,
} from '@asigloo/vue-dynamic-forms';

const MIN_VALUE = 5;

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: [
          new FormField({
            type: 'number',
            label: 'Number',
            name: 'number',
            value: 0,
            validations: [
              new FormValidation(min(MIN_VALUE), 'This field is required'),
            ],
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```

## `max`

The `max` validators check if a numeric input type value bigger than a certain threshold.

<ValidationMax />

```js
import { FormField, FormValidation, max } from '@asigloo/vue-dynamic-forms';

const MAX_VALUE = 5;

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: [
          new FormField({
            type: 'number',
            label: 'Number',
            name: 'number',
            value: 5,
            validations: [
              new FormValidation(
                max(MAX_VALUE),
                `Value should be less than: ${MAX_VALUE}`,
              ),
            ],
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```

## `minLength`

The `minLength` validators check if a text input type length less than a certain threshold.

<ValidationMinLength />

```js
import {
  FormField,
  FormValidation,
  minLength,
} from '@asigloo/vue-dynamic-forms';

const MIN_VALUE = 5;

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
            value: 'avocado',
            validations: [
              new FormValidation(
                minLength(MIN_VALUE),
                `Text length should be bigger than: ${MIN_VALUE}`,
              ),
            ],
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```

## `maxLength`

The `maxLength` validators check if a text input length bigger than a certain threshold.

<ValidationMaxLength />

```js
import {
  FormField,
  FormValidation,
  maxLength,
} from '@asigloo/vue-dynamic-forms';

const MAX_VALUE = 280;

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: [
          new FormField({
            type: 'textarea',
            label: 'Tweet',
            name: 'tweet',
            rows: 10,
            value:
              'Prism whatever occupy, stumptown polaroid butcher activated charcoal seitan cornhole direct trade coloring book offal sriracha. 8-bit pitchfork kitsch crucifix chartreuse, tumblr adaptogen brunch stumptown. Drinking vinegar yuccie echo park lo-fi, poutine unicorn raclette adaptogen kale chips chia. Deep v austin fam organic kickstarter hexagon hell of wolf pour-over YOLO. 8-bit glossier lyft authentic, selfies aesthetic kinfolk prism tattooed irony quinoa distillery pug slow-carb post-ironic..',
            validations: [
              new FormValidation(
                maxLength(MAX_VALUE),
                `Tweet shouldn't be more than: ${MAX_VALUE} characters`,
              ),
            ],
          }),
        ],
      },
    };
  },
};
export default yourAwesomeComponent;
```
