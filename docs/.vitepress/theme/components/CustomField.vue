<template>
  <div class="field-wrapper">
    <div class="w-1/2">
      <dynamic-form :form="form" @change="updateValues">
        <template v-slot:avocado="{ control, onChange, onFocus, onBlur }">
          <div class="avocado-field">
            <input
              :id="control.name"
              v-if="control"
              class="form-control"
              v-model="control.value"
              :type="control.type"
              :name="control.name"
              @change="onChange"
              @focus="onFocus"
              @blur="onBlur"
            />
            <i>🥑</i>
          </div>
        </template>
      </dynamic-form>
    </div>
    <div class="w-1/2 p-4">
      <Console :content="formValues" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { CustomField, DynamicForm } from '/@'

export default {
  name: 'CustomField',
  setup() {
    const formValues = reactive({})

    const form = reactive<DynamicForm>({
      id: 'my-awesome-form',
      fields: {
        avocado: CustomField({
          label: 'My Avocado field',
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

<style lang="scss">
.avocado-field {
  position: relative;

  .form-control {
    border-color: #aec64c;
    background-color: #e2eb5d52;
    border-radius: 16px;
    width: 100%;
  }
  i {
    position: absolute;
    top: 7px;
    right: 20px;
  }
}
</style>
