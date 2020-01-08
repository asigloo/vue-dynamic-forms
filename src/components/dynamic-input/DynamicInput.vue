<template>
  <div
    class="dynamic-input form-group"
    :class="{ 'form-group--error': hasErrors }"
  >
    <label class="form-label" :for="formControl.name">
      {{ formControl.label }}
    </label>
    <input
      v-if="
        formControl.type === 'text' ||
          formControl.type === 'email' ||
          formControl.type === 'password' ||
          formControl.type === 'number'
      "
      :id="formControl.name"
      v-model="formControl.value"
      :name="formControl.name"
      class="form-control"
      :type="formControl.type"
      :placeholder="formControl.placeholder"
      @change="valueChange()"
      @focus="onFocus()"
      @blur="onBlur()"
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
