<template>
  <ul class="features">
    <li v-for="feature in features" class="feature">
      <h3 class="title">{{ feature.title }}</h3>
      <p class="text">{{ feature.text }}</p>
    </li>
  </ul>
</template>

<script>
import features from '../data/features';

export default {
  name: 'Features',
  data: () => ({
    features,
  }),
};
</script>

<style lang="scss">
.features {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: -15px;
  margin-right: -15px;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.feature {
  padding: 15px;
  width: 45%;
}
</style>
