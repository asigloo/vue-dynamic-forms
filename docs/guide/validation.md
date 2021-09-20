This library comes with built-in validation responsible for validating that the inputs match certain criteria defined by the user when defining the form field using the factory functions.

By default, **Vue Dynamic Forms** contains the following validations:

- required
- min
- max
- email
- minLength
- maxLength
- pattern

To add validations to your fields, you only need to import the `Validator` and the desired validation function into your component like this:

```js
import { Validator, required, email } from '@asigloo/vue-dynamic-forms'
```

The `Validator` function takes 2 params, the validation function (required, min, max, email, etc) and the message to display when the validations are not successful:

```js
{
    email: EmailField({
        label: 'Email',
        validations: [
            Validator({ validator: required, text: 'This field is required' }),
            Validator({ validator: email, text: 'Format of email is incorrect' }),
        ],
    }),
}
```

## `required`

The required attribute is a boolean attribute.

When present, it specifies that an input field must be filled out before submitting the form.

<ValidationRequired />

```ts
import { EmailField, DynamicForm, Validator, required } from '/@/'

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: {
          email: EmailField({
            label: 'Email',
            validations: [
              Validator({
                validator: required,
                text: 'This field is required',
              }),
            ],
          }),
        },
      },
    }
  },
}
export default yourAwesomeComponent
```

## `email`

Email input types are just a text field with a semantic use of `type="email"`, so the text string should be tested to match an email pattern (lowercase and uppercase, and `@` followed by a domain name with `.` and a suffix).

The best way to achieve it is by using a regular expression, we use the following one, [email](https://regex101.com/r/3qY1kt/1).

<ValidationEmail />

```js
import { EmailField, Validator, email } from '@asigloo/vue-dynamic-forms'

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: {
          email: EmailField({
            label: 'Email',
            validations: [
              Validator({
                validator: email,
                text: 'Format of email is incorrect',
              }),
            ],
          }),
        },
      },
    }
  },
}
export default yourAwesomeComponent
```

## `url`

Url input types are just a text field with a semantic use of `type="url"`, so the text string should be tested to match an url pattern.

<ValidationUrl />

```js
import { UrlField, Validator, url } from '@asigloo/vue-dynamic-forms';

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: {
        website: UrlField({
          label: 'Website',
          validations: [
            Validator({
              validator: url,
              text: 'Format of url is incorrect',
            }),
          ],
        }),
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
import { PasswordField, Validator, pattern } from '@asigloo/vue-dynamic-forms'

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: {
          password: PasswordField({
            label: 'Password',
            validations: [
              Validator({
                validator: pattern(
                  '^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{8,10}$',
                ),
                text: 'Password must contain at least 1 Uppercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
              }),
            ],
          }),
        },
      },
    }
  },
}
export default yourAwesomeComponent
```

## `min`

The `min` validators check if a numeric input type value less than a certain threshold.

<ValidationMin />

```js
import { NumberField, Validator, min } from '@asigloo/vue-dynamic-forms'

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: {
          age: NumberField({
            label: 'Age',
            validations: [
              Validator({
                validator: min(18),
                text: 'You must be older than 18',
              }),
            ],
          }),
        },
      },
    }
  },
}
export default yourAwesomeComponent
```

## `max`

The `max` validators check if a numeric input type value bigger than a certain threshold.

<ValidationMax />

```js
import { NumberField, Validator, max } from '@asigloo/vue-dynamic-forms'

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: {
          age: NumberField({
            label: 'Tip',
            validations: [
              Validator({
                validator: max(100),
                text: 'Tips canmot be more than 100 €',
              }),
            ],
          }),
        },
      },
    }
  },
}
export default yourAwesomeComponent
```

## `minLength`

The `minLength` validators check if a text input type length less than a certain threshold.

<ValidationMinLength />

```js
import { TextField, Validator, minLength } from '@asigloo/vue-dynamic-forms'

const MIN_VALUE = 5

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: {
          username: TextField({
            label: 'Username',
            validations: [
              Validator({
                validator: minLength(MIN_VALUE),
                text: `Text length should be bigger than: ${MIN_VALUE}`,
              }),
            ],
          }),
        },
      },
    }
  },
}
export default yourAwesomeComponent
```

## `maxLength`

The `maxLength` validators check if a text input length bigger than a certain threshold.

<ValidationMaxLength />

```js
import { TextAreaField, Validator, maxLength } from '@asigloo/vue-dynamic-forms'

const MAX_VALUE = 280

const yourAwesomeComponent = {
  name: 'your-awesome',
  data() {
    return {
      testForm: {
        id: 'test-form',
        fields: {
          tweet: TextAreaField({
            label: 'Tweet',
            rows: 10,
            value:
              'Prism whatever occupy, stumptown polaroid butcher activated charcoal seitan cornhole direct trade coloring book offal sriracha. 8-bit pitchfork kitsch crucifix chartreuse, tumblr adaptogen brunch stumptown. Drinking vinegar yuccie echo park lo-fi, poutine unicorn raclette adaptogen kale chips chia. Deep v austin fam organic kickstarter hexagon hell of wolf pour-over YOLO. 8-bit glossier lyft authentic, selfies aesthetic kinfolk prism tattooed irony quinoa distillery pug slow-carb post-ironic..',
            validations: [
              Validator({
                validator: maxLength(MAX_VALUE),
                text: `Tweet shouldn't be more than: ${MAX_VALUE} characters`,
              }),
            ],
          }),
        },
      },
    }
  },
}
export default yourAwesomeComponent
```
