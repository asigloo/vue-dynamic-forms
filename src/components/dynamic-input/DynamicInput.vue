<template>
  <div
    class="dynamic-input form-group"
    :class="{ 'form-group--error': hasErrors }"
  >
    <label
      class="form-label"
      :for="formControl.name"
      v-if="formControl.type !== 'checkbox'"
    >
      {{ formControl.label }}
    </label>
    <input-text
      v-if="
        formControl.type === 'text' ||
        formControl.type === 'email' ||
        formControl.type === 'password' ||
        formControl.type === 'number'
      "
      :formControl="formControl"
      @change="valueChange"
    />
    <input-textarea
      v-if="formControl.type === 'textarea'"
      :formControl="formControl"
      @change="valueChange"
    />
    <input-select
      v-if="formControl.type === 'select'"
      :formControl="formControl"
      @change="valueChange"
    />
    <input-checkbox
      v-if="formControl.type === 'checkbox'"
      :formControl="formControl"
      @change="valueChange"
    />
    <input-radio
      v-if="formControl.type === 'radio'"
      :formControl="formControl"
      @change="valueChange"
    />
    <slot
      :name="'custom-field'"
      :control="formControl"
      :valueChange="valueChange"
      :onFocus="onFocus"
      :onBlur="onBlur"
    />
    <div v-if="hasErrors">
      <p
        v-for="(errorText, $index) in errorMessages"
        :key="`${$index}`"
        class="error"
      >
        {{ errorText }}
      </p>
    </div>
  </div>
</template>
<script src="./DynamicInput.js"></script>
