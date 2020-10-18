<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl, TextAreaInput } from '@/core/models';
import { useInputEvents } from '@/composables/input-events';
const props = {
  control: Object as PropType<FormControl<TextAreaInput>>,
};

export default defineComponent({
  name: 'asTextAreaInput',
  props,
  setup(props, { emit }) {
    const { onChange, onFocus, onBlur } = useInputEvents(props, emit);

    return () =>
      h('textarea', {
        id: props.control.name,
        name: props?.control?.name || '',
        class: ['form-control'],
        value: props?.control?.value,
        rows: props?.control?.rows,
        cols: props?.control?.cols,
        disabled: props?.control?.disabled,
        placeholder: props?.control?.placeholder,
        required: props.control.required,
        autocomplete: props.control.autocomplete,
        readonly: props?.control.readonly,
        ariaLabel: props.control.ariaLabel,
        ariaLabelledBy: props.control.ariaLabelledBy,
        ariaRequired: props.control.required,
        onFocus,
        onBlur,
        onChange,
      });
  },
});
</script>

<style></style>
