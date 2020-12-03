<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl, TextAreaInput } from '@/core/models';
import { useInputEvents } from '@/composables/input-events';
import { useInputValidation } from '@/composables/use-validation';
const props = {
  control: Object as PropType<FormControl<TextAreaInput>>,
};

export default defineComponent({
  name: 'asTextAreaInput',
  props,
  setup(props, { emit }) {
    const { onInput, onFocus, onBlur } = useInputEvents(props, emit);
    const {
      isRequired,
      errorMessages,
      isPendingValidation,
    } = useInputValidation(props, emit);

    return () => [
      h('textarea', {
        id: props.control.name,
        name: props.control.name || '',
        class: ['form-control'],
        value: props.control.value,
        rows: props.control.rows,
        cols: props.control.cols,
        disabled: props.control.disabled,
        placeholder: props.control.placeholder,
        required: isRequired.value,
        autocomplete: props.control.autocomplete,
        readonly: props.control.readonly,
        ariaLabel: props.control.ariaLabel,
        ariaLabelledBy: props.control.ariaLabelledBy,
        ariaRequired: isRequired.value,
        onFocus,
        onBlur,
        onInput,
      }),
      isPendingValidation.value
        ? null
        : h(
            'div',
            {
              class: 'form-errors',
            },
            errorMessages.value.map(error =>
              h('p', { class: 'form-error' }, error),
            ),
          ),
    ];
  },
});
</script>

<style></style>
