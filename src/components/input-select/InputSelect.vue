<template>
  <select
    :id="formControl.name"
    v-model="formControl.value"
    :name="formControl.name"
    class="form-control"
  >
    <option v-for="opt in formControl.options" :key="opt.value">
      {{ opt.text }}
    </option>
  </select>
</template>
<script src="./InputSelect.js"></script>
