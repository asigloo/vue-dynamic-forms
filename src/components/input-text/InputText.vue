<template>
  <input
    :id="formControl.name"
    v-model="formControl.value"
    :name="formControl.name"
    class="form-control"
    :data-text="hasValue"
    :class="{ 'form-control--value': hasValue }"
    :type="formControl.type"
    :placeholder="formControl.placeholder"
    :disabled="formControl.disabled"
    @change="valueChange()"
    @focus="onFocus()"
    @blur="onBlur()"
  />
</template>
<script src="./InputText.js"></script>
