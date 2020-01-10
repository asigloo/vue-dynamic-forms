<template>
  <input
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
</template>
<script src="./InputText.js"></script>
