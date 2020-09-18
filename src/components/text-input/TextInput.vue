<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl } from '../../core/models';
import { useInputEvents } from '../../composables/input-events';
const props = {
  control: Object as PropType<FormControl<any>>,
};

export default defineComponent({
  name: 'asTextInput',
  props,
  setup(props, { emit }) {
    const { onChange, onFocus, onBlur } = useInputEvents(props?.control, emit);

    return () =>
      h('input', {
        name: props?.control?.name || '',
        type: props?.control?.type,
        disabled: props?.control?.disabled,
        placeholder: props?.control?.placeholder,
        class: ['form-control'],
        value: props?.control?.value,
        onFocus,
        onBlur,
        onChange,
      });
  },
});
</script>

<style></style>
