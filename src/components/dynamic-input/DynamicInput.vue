<script lang="ts">
import { defineComponent, h, PropType, computed } from 'vue';
import TextInput from '@/components/text-input/TextInput.vue';
import SelectInput from '@/components/select-input/SelectInput.vue';

import { FormControl } from '@/core/models';

const components = {
  TextInput,
  SelectInput,
};

const props = {
  control: Object as PropType<FormControl<any>>,
};
export default defineComponent({
  name: 'asDynamicInput',
  components,
  props,
  setup(props, { emit }) {
    let component;
    const attributes = computed(() => {
      return {
        control: props.control,
        onChange: function ($event) {
          const value = {};
          value[$event.target.name] = $event.target.value;
          emit('changed', value);
        },
      };
    });

    return () => {
      switch (props?.control?.type) {
        case 'text':
        case 'email':
        case 'password':
        case 'url':
          component = h(TextInput, attributes.value);
          break;
        case 'select':
          component = h(SelectInput, attributes.value);
          break;

        default:
          break;
      }
      return h(
        'div',
        {
          class: ['dynamic-input', 'form-group', props?.control?.customClass],
        },
        [
          component,
          h(
            'label',
            {
              class: 'form-label',
              for: props?.control?.label,
            },
            props?.control?.label,
          ),
        ],
      );
    };
  },
});
</script>

<style></style>
