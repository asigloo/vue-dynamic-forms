## Phone Prefix Example

The library also mades easy to create more complex arranges of inputs, one escenario could be a field that collects an international phone number and consists of a country dropdown, a numeric input for area code and another numeric input for phone number.

There easiest way to achieve it is by creating the 3 diferent inputs using `FormField` and add layout related classes using `customClass`

Thanks [@dflock](https://github.com/dflock) for the suggestion.

<PhonePrefix />

The first step is to add a new `FormField` with `type: 'custom-field'` to your form fields array in the components data:

```javascript
testForm: {
  id: 'test-form',
  fields: [
    new FormField({
      type: 'select',
      label: 'Prefix',
      name: 'prefix',
      customClass: 'col-2',
      options: COUNTRY_CODES.map(({ label, code }) => ({
        text: `+${code}   ${label}`,
        value: `+ ${code}`,
      })),
      value: `+ 34`,
    }),
    new FormField({
      type: 'text',
      label: 'Area Code',
      name: 'areaCode',
      customClass: 'col-4',
      value: '922',
    }),
    new FormField({
      type: 'text',
      label: 'Phone',
      name: 'phone',
      customClass: 'col-6',
      value: '445-66',
    }),
  ],
  options: {
    customClass: 'row',
  },
},
```
