<template>
  <dynamic-form :form="form" />
</template>

<script lang="ts">
import { TextField, EmailField } from '../../../src'

export default {
  name: 'FormCompositionOptionsApi',
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
    }
  },
}
</script>
