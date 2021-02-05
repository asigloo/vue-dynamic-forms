<template>
  <form
    class="dynamic-form"
    novalidate
    :id="form.id"
    :name="form.id"
    v-bind="formattedOptions"
    @submit.prevent="handleSubmit"
  >
    <dynamic-input
      v-for="control in controls"
      :key="control.name"
      :control="control"
      :forceValidation="forceValidation"
      @change="valueChange"
      @blur="onBlur"
      @validate="onValidate"
    >
      <template v-slot:customField="props">
        <div
          v-for="slot in deNormalizedScopedSlots"
          :key="slot"
          class="custom-form-wrapper"
        >
          <slot
            v-if="props.control.name === slot"
            :name="slot"
            :control="normalizedControls[slot]"
            :onChange="props.onChange"
            :onBlur="props.onBlur"
          ></slot>
        </div>
      </template>
    </dynamic-input>
  </form>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, watch } from 'vue';

import DynamicInput from '../dynamic-input/DynamicInput.vue';

import { DynamicForm } from '@/core/models';
import { useDynamicForm } from '@/composables/useDynamicForm';
import { dynamicFormsSymbol } from '@/useApi';

const props = {
  form: {
    type: Object as PropType<DynamicForm>,
    required: true,
  },
};

const components = {
  DynamicInput,
};

/* const AVAILABLE_THEMES = ['default', 'material'];
 */
export default defineComponent({
  name: 'asDynamicForm',
  props,
  components,
  setup(props, ctx) {
    const { options } = inject(dynamicFormsSymbol);
    const {
      controls,
      valueChange,
      formValues,
      handleSubmit,
      isValid,
      errors,
      deNormalizedScopedSlots,
      normalizedControls,
      formattedOptions,
      onBlur,
      onValidate,
      forceValidation,
      detectChanges,
      onOptionsChanged,
    } = useDynamicForm(props.form as DynamicForm, ctx, options);

    watch(
      () => props.form.fields,
      fields => {
        detectChanges(fields);
      },
      {
        deep: true,
      },
    );

    watch(
      () => props.form.options,
      options => {
        onOptionsChanged(options);
      },
      {
        deep: true,
      },
    );
    return {
      controls,
      valueChange,
      formValues,
      handleSubmit,
      isValid,
      errors,
      deNormalizedScopedSlots,
      normalizedControls,
      formattedOptions,
      onBlur,
      onValidate,
      forceValidation,
    };
  },
});
</script>
