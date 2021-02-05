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
          class="p-4 block rounded-md border border-gray-200 hover:border-green-400 transition-colors"
          ><p>{{ demo.name }}</p>
          <ul class="flex flex-wrap mt-4" v-if="demo.tags?.length > 0">
            <li v-for="tag in demo.tags" :key="tag">
              <span
                :class="['chip inline-block mb-2', `bg-${colorsMap[tag]}-100`]"
                >{{ tag }}</span
              >
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
    const colorsMap = ref({
      'text-field': 'yellow',
      'email-field': 'blue',
      all: 'yellow',
      'password-field': 'green',
      'select-field': 'red',
      'number-field': 'pink',
      'textarea-field': 'purple',
      'custom-field': 'indigo',
      'radio-field': 'yellow',
      'checkbox-field': 'blue',
    });

    setTimeout(() => {
      demos.value = [
        ...demos.value,
        ...[
          {
            name: 'General',
            route: '/general',
            tags: ['all'],
          },
          {
            name: 'Basic',
            route: '/basic',
            tags: ['text-field', 'select-field', 'checkbox-field'],
          },
          {
            name: 'Text Fields',
            route: '/text-fields',
            tags: ['text-field', 'email-field', 'password-field'],
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
            name: 'Checkbox Fields',
            route: '/checkbox-fields',
            tags: ['checkbox-field'],
          },
          {
            name: 'Radio Fields',
            route: '/radio-fields',
            tags: ['radio-field'],
          },
          {
            name: 'Login',
            route: '/login',
            tags: ['email-field', 'password-field'],
          },
          {
            name: 'Custom Fields',
            route: '/custom-fields',
            tags: ['custom-field'],
          },
          {
            name: 'Toggle Visibility',
            route: '/toggle-visibility',
            tags: ['visibility', 'custom-class', 'custom-styles'],
          },
          {
            name: 'Reset after Submit',
            route: '/reset-after-submit',
            tags: ['submit', 'reset-forms'],
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
      colorsMap,
    };
  },
});
</script>
