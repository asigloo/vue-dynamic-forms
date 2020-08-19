<template>
  <textarea
    :id="formControl.id"
    v-model="formControl.value"
    :name="formControl.name"
    class="form-control"
    :data-text="hasValue"
    :class="{ 'form-control--value': hasValue }"
    :cols="formControl.cols"
    :rows="formControl.rows"
    @change="valueChange()"
    @focus="onFocus()"
    @blur="onBlur()"
  ></textarea>
</template>
<script src="./InputTextarea.js"></script>
