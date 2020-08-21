<script lang="ts">
import { defineComponent, h, PropType, ref, toRefs, reactive } from 'vue';
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
  setup(props) {
    let component;
    return () => {
      switch (props?.control?.type) {
        case 'text':
        case 'email':
        case 'password':
        case 'url':
          component = h(TextInput, {
            control: props.control,
          });
          break;
        case 'select':
          component = h(SelectInput, {
            control: props.control,
          });
          break;

        default:
          break;
      }
      return h(
        'div',
        {
          class: ['dynamic-input', 'form-group'],
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
