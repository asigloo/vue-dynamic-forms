<template>
  <div class="dynamic-form" v-if="fields">
    <form
      v-if="fields.length > 0 && !showFeedback"
      :id="id"
      :name="id"
      :class="classes"
      :method="method"
      novalidate
      @submit.prevent="handleSubmit()"
    >
      <input type="hidden" name="form-name" :value="id" />
      <dynamic-input
        v-for="field in controls"
        :key="field.name"
        :form-control="field"
      />
    </form>
    <div v-if="showFeedback" class="dynamic-form__feedback">
      {{ feedbackText }}
    </div>
  </div>
</template>
<script src="./DynamicForm.js"></script>
