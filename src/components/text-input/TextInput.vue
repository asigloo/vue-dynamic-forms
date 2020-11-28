<script lang="ts">
import { defineComponent, h, PropType, ref } from 'vue';
import {
  ColorInput,
  EmailInput,
  FormControl,
  PasswordInput,
  TextInput,
  UrlInput,
} from '@/core/models';
import { useInputEvents } from '@/composables/input-events';
import { useInputValidation } from '@/composables/use-validation';

const props = {
  control: Object as PropType<
    FormControl<TextInput | EmailInput | PasswordInput | UrlInput | ColorInput>
  >,
};

export default defineComponent({
  name: 'asTextInput',
  props,
  setup(props, { emit }) {
    const { onInput, onFocus, onBlur, getClasses } = useInputEvents(
      props,
      emit,
    );
    const { isRequired } = useInputValidation(props, emit);

    return () =>
      h('input', {
        id: props.control.name,
        name: props.control.name || '',
        type: props.control.type,
        class: getClasses.value,
        value: props.control.value,
        disabled: props.control.disabled,
        placeholder: props.control.placeholder,
        required: isRequired.value,
        readonly: props?.control.readonly,
        autocomplete: props.control.autocomplete,
        ariaRequired: isRequired.value,
        ariaLabel: props.control.ariaLabel,
        ariaLabelledBy: props.control.ariaLabelledBy,
        onFocus,
        onBlur,
        onInput,
      });
  },
});
</script>

<style></style>
