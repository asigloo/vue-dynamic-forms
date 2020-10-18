<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl, NumberInput } from '@/core/models';
import { useInputEvents } from '@/composables/input-events';

const props = {
  control: Object as PropType<FormControl<NumberInput>>,
};

export default defineComponent({
  name: 'asNumberInput',
  props,
  setup(props, { emit }) {
    const { onChange, onFocus, onBlur } = useInputEvents(props, emit);

    return () =>
      h('input', {
        id: props.control.name,
        name: props?.control?.name || '',
        type: props?.control?.type,
        class: ['form-control'],
        value: props?.control?.value,
        min: props?.control?.min,
        max: props?.control?.max,
        step: props?.control?.step,
        disabled: props?.control?.disabled,
        placeholder: props?.control?.placeholder,
        required: props.control.required,
        readonly: props?.control.readonly,
        autocomplete: props.control.autocomplete,
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
