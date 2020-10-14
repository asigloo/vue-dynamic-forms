<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import {
  ColorInput,
  EmailInput,
  FormControl,
  PasswordInput,
  TextInput,
  UrlInput,
} from '@/core/models';
import { useInputEvents } from '@/composables/input-events';

const props = {
  control: Object as PropType<
    FormControl<TextInput | EmailInput | PasswordInput | UrlInput | ColorInput>
  >,
};

export default defineComponent({
  name: 'asTextInput',
  props,
  setup(props, { emit }) {
    const { onChange, onFocus, onBlur } = useInputEvents(props, emit);

    return () =>
      h('input', {
        id: props.control.name,
        name: props.control.name || '',
        type: props.control.type,
        class: ['form-control'],
        value: props?.control?.value,
        disabled: props.control.disabled,
        placeholder: props.control.placeholder,
        required: props.control.required,
        autocomplete: props.control.autocomplete,
        ariaRequired: props.control.required,
        ariaLabel: props.control.ariaLabel,
        ariaLabelledBy: props.control.ariaLabelledBy,
        onFocus,
        onBlur,
        onChange,
      });
  },
});
</script>

<style></style>
