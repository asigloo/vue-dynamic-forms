<template>
  <div class="input-radio">
    <div
      class="form-check"
      :class="{ 'form-check-inline': formControl.inline }"
      v-for="opt in formControl.options"
      :key="opt.name"
    >
      <input
        class="form-check-input"
        type="radio"
        :id="opt.value"
        v-model="formControl.value"
        :value="opt.value"
        :disabled="opt.disabled"
      />
      <label class="form-check-label" :for="opt.value">
        {{ opt.text }}
      </label>
    </div>
  </div>
</template>
<script src="./InputRadio.js"></script>
