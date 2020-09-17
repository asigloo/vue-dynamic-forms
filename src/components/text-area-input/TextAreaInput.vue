<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl } from '@/core/models';
import { useInputEvents } from '@/composables/input-events';
const props = {
  control: Object as PropType<FormControl<any>>,
};

export default defineComponent({
  name: 'asTextAreaInput',
  props,
  setup(props, { emit }) {
    const { onChange, onFocus, onBlur } = useInputEvents(props?.control, emit);

    return () =>
      h('textarea', {
        name: props?.control?.name || '',
        disabled: props?.control?.disabled,
        placeholder: props?.control?.placeholder,
        class: ['form-control'],
        value: props?.control?.value,
        rows: props?.control?.rows,
        cols: props?.control?.cols,
        onFocus,
        onBlur,
        onChange,
      });
  },
});
</script>

<style></style>
