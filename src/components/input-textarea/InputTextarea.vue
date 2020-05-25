<template>
  <textarea
    :id="formControl.name"
    v-model="formControl.value"
    :name="formControl.name"
    class="form-control"
    :cols="formControl.cols"
    :rows="formControl.rows"
    @change="valueChange()"
    @focus="onFocus()"
    @blur="onBlur()"
  ></textarea>
</template>
<script src="./InputTextarea.js"></script>
