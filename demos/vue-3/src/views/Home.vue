<template>
  <div class="home page container">
    <transition-group
      appear
      name="staggered-fade-in"
      tag="ul"
      v-show="demos.length > 0"
      class="flex flex-wrap"
      @before-enter="beforeEnter"
      @enter="enter"
    >
      <li class="p-4 w-full sm:w-1/2" v-for="demo in demos" :key="demo.name">
        <router-link
          :to="demo.route"
          class="p-4 block rounded-md bg-gray-200 text-gray-400 hover:bg-gray-300 hover:text-gray-500 transition-colors"
          ><p>{{ demo.name }}</p>
          <ul class="flex mt-4" v-if="demo.tags?.length > 0">
            <li v-for="(tag, $index) in demo.tags" :key="tag">
              <span :class="['chip', `bg-${colors[$index]}-100`]">{{
                tag
              }}</span>
            </li>
          </ul>
        </router-link>
      </li>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

const STAGGER_DELAY = 200;

export default defineComponent({
  name: 'Home',
  setup() {
    const demos = ref([]);
    const colors = ref(['yellow', 'red', 'blue', 'green', 'yellow', 'gray']);

    setTimeout(() => {
      demos.value = [
        ...demos.value,
        ...[
          {
            name: 'General',
            route: '/general',
          },
          {
            name: 'Text Fields',
            route: '/text-fields',
            tags: ['text-field', 'email-input', 'password-input'],
          },
          {
            name: 'Number Fields',
            route: '/number-fields',
            tags: ['number-field'],
          },
          {
            name: 'Select Fields',
            route: '/select-fields',
            tags: ['select-field'],
          },
          {
            name: 'Textarea Fields',
            route: '/textarea-fields',
            tags: ['textarea-field'],
          },
          {
            name: 'Login',
            route: '/login',
            tags: ['email-input', 'password-input'],
          },
          {
            name: 'Custom Fields',
            route: '/custom-fields',
            tags: ['custom-input'],
          },
        ],
      ];
    }, 1000);

    function beforeEnter(el) {
      el.style.visibility = 'hidden';
    }
    function enter(el) {
      const delay = el.dataset.index * STAGGER_DELAY;
      setTimeout(() => {
        el.classList.add('animate__animated', 'animate__fadeIn');
        el.style.visibility = 'visible';
      }, delay);
    }
    function leave(el) {
      const delay = el.dataset.index * STAGGER_DELAY;
      setTimeout(() => {
        el.classList.add('animate__animated', 'animate__fadeOut');
        el.style.visibility = 'hidden';
      }, delay);
    }

    return {
      demos,
      beforeEnter,
      enter,
      leave,
      colors,
    };
  },
});
</script>
