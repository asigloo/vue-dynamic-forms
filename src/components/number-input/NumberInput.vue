<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl, NumberInput } from '@/core/models';
import { useInputEvents } from '@/composables/input-events';
import { useInputValidation } from '@/composables/use-validation';

const props = {
  control: Object as PropType<FormControl<NumberInput>>,
};

export default defineComponent({
  name: 'asNumberInput',
  props,
  setup(props, { emit }) {
    const { onInput, onFocus, onBlur } = useInputEvents(props, emit);
    const { isRequired } = useInputValidation(props, emit);

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
        required: isRequired.value,
        readonly: props?.control.readonly,
        autocomplete: props.control.autocomplete,
        ariaLabel: props.control.ariaLabel,
        ariaLabelledBy: props.control.ariaLabelledBy,
        ariaRequired: isRequired.value,
        onFocus,
        onBlur,
        onInput,
      });
  },
});
</script>

<style></style>
