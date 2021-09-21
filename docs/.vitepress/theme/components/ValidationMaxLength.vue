<template>
  <div class="field-wrapper">
    <div class="w-1/2">
      <dynamic-form :form="form" @change="updateValues" />
      <p class="text-sm">
        Add the tweet enough characters and blur to see the validation working
        👆🏻
      </p>
    </div>
    <div class="w-1/2 p-4">
      <Console :content="formValues" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { TextAreaField, DynamicForm, Validator, maxLength } from '/@'

const MAX_VALUE = 280

export default {
  name: 'ValidationMaxLength',
  setup() {
    const formValues = reactive({})

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
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
    })

    function updateValues(values) {
      Object.assign(formValues, values)
    }

    return {
      form,
      updateValues,
      formValues,
    }
  },
}
</script>
