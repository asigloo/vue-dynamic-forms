<template>
  <div
    class="input-radio"
    :class="{ 'input-radio--inline': formControl.inline }"
  >
    <div
      class="input-radio__base"
      v-for="opt in formControl.options"
      :key="opt.name"
    >
      <input
        class="input-radio__input"
        type="radio"
        :id="opt.value"
        v-model="formControl.value"
        :value="opt.value"
        :disabled="opt.disabled"
      />
      <label class="input-radio__label" :for="opt.value">
        {{ opt.text }}
      </label>
    </div>
  </div>
</template>
<script src="./InputRadio.js"></script>
