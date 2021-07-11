<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import {
  ColorInput,
  EmailInput,
  FormControl,
  PasswordInput,
  TextInput,
  UrlInput,
} from '/@/core/models';
import { useInputEvents } from '/@/composables/useInputEvents';
import { useInputValidation } from '/@/composables/useValidation';

const props = {
  control: Object as PropType<
    FormControl<TextInput | EmailInput | PasswordInput | UrlInput | ColorInput>
  >,
  forceValidation: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'asTextInput',
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
        disabled: props.control.disabled,
        placeholder: props.control.placeholder,
        required: isRequired.value,
        readonly: props.control.readonly,
        autocomplete: props.control.autocomplete,
        ariaRequired: isRequired.value,
        ariaLabel: props.control.ariaLabel,
        ariaLabelledBy: props.control.ariaLabelledBy,
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
