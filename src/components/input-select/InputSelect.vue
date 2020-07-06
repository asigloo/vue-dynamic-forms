<template>
  <select
    :id="formControl.id"
    v-model="formControl.value"
    :name="formControl.name"
    class="form-control"
  >
    <option
      v-for="opt in formControl.options"
      :key="opt.text"
      :value="opt.value"
      :disabled="opt.disabled"
    >
      {{ opt.text }}
    </option>
  </select>
</template>
<script src="./InputSelect.js"></script>
