<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl } from '@/core/models';

const props = {
  control: Object as PropType<FormControl<any>>,
};

export default defineComponent({
  name: 'asTextInput',
  props,
  setup(props) {
    return () =>
      h('input', {
        name: props?.control?.name || '',
        type: props?.control?.type,
        disabled: props?.control?.disabled,
        placeholder: props?.control?.placeholder,
      });
  },
});
</script>

<style></style>
