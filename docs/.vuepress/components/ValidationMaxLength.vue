<template>
  <div class="form-composition library-example">
    <div class="col">
      <dynamic-form
        :id="testForm.id"
        :fields="testForm.fields"
        :options="testForm.options"
        @change="updateForm"
      />
      <p class="hint">
        Add the tweet enough characters and blur to see the validation working
        👆🏻
      </p>
    </div>
    <div class="col">
      <pre>{{ formData }}</pre>
    </div>
  </div>
</template>

<script>
import {
  DynamicForm,
  FormField,
  FormOptions,
  FormValidation,
  maxLength,
} from '../../../dist/as-dynamic-forms.common';

const MAX_VALUE = 280;

export default {
  name: 'ValidationMinDemo',
  components: {
    DynamicForm,
  },
  data: () => ({
    formData: null,
    testForm: {
      id: 'validation-max-length-demo',
      fields: [
        new FormField({
          type: 'textarea',
          label: 'Tweet',
          name: 'tweet',
          rows: 16,
          value:
            'Prism whatever occupy, stumptown polaroid butcher activated charcoal seitan cornhole direct trade coloring book offal sriracha. 8-bit pitchfork kitsch crucifix chartreuse, tumblr adaptogen brunch stumptown. Drinking vinegar yuccie echo park lo-fi, poutine unicorn raclette adaptogen kale chips chia. Deep v austin fam organic kickstarter hexagon hell of wolf pour-over YOLO. 8-bit glossier lyft authentic, selfies aesthetic kinfolk prism tattooed irony quinoa distillery pug slow-carb post-ironic.',
          validations: [
            new FormValidation(
              maxLength(MAX_VALUE),
              `Tweet shouldn't be more than: ${MAX_VALUE} characters`,
            ),
          ],
        }),
      ],
      options: new FormOptions({ autoValidate: true }),
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

.form-composition {
  display: flex;
  justify-content: space-between;
}
.col {
  width: 45%;
}
pre {
  color: white;
  font-size: 12px;
}
</style>
