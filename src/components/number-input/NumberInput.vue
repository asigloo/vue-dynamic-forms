<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl, NumberInput } from '/@/core/models';
import { useInputEvents } from '/@/composables/useInputEvents';
import { useInputValidation } from '/@/composables/useValidation';

const props = {
  control: Object as PropType<FormControl<NumberInput>>,
  forceValidation: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'asNumberInput',
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
      h('input', {
        id: props.control.name,
        name: props.control.name || '',
        type: props.control.type,
        class: getClasses.value,
        value: props.control.value,
        min: props.control.min,
        max: props.control.max,
        step: props.control.step,
        disabled: props.control.disabled,
        placeholder: props.control.placeholder,
        required: isRequired.value,
        readonly: props.control.readonly,
        autocomplete: props.control.autocomplete,
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

<style></style>
