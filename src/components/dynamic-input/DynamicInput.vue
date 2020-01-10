<template>
  <div
    class="dynamic-input form-group"
    :class="{ 'form-group--error': hasErrors }"
  >
    <label class="form-label" :for="formControl.name">
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
