<template>
  <div class="input-checkbox">
    <input
      class="input-checkbox__input"
      type="checkbox"
      :id="formControl.name"
      v-model="formControl.value"
      :disabled="formControl.disabled"
    />
    <label class="input-checkbox__label" :for="formControl.name">
      {{ formControl.label }}
    </label>
  </div>
</template>
<script src="./InputCheckbox.js"></script>
