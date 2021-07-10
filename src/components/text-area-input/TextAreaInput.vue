<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl, TextAreaInput } from '/@/core/models';
import { useInputEvents } from '/@/composables/useInputEvents';
import { useInputValidation } from '/@/composables/useValidation';
const props = {
  control: Object as PropType<FormControl<TextAreaInput>>,
  forceValidation: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'asTextAreaInput',
  inheritAttrs: false,
  props,
  setup(props, { emit }) {
    const { onInput, onChange, onFocus, onBlur, getClasses } = useInputEvents(
      props,
      emit,
    );
    const { isRequired, errorMessages, isPendingValidation } =
      useInputValidation(props, emit);

    return () => [
      h('textarea', {
        id: props.control.name,
        name: props.control.name || '',
        class: getClasses.value,
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
        onChange,
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
