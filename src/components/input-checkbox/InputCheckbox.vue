<template>
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      :id="formControl.name"
      v-model="formControl.value"
      :disabled="formControl.disabled"
    />
    <label class="form-check-label" :for="formControl.name">
      {{ formControl.label }}
    </label>
  </div>
</template>
<script src="./InputCheckbox.js"></script>
