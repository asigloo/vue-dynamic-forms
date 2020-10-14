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
        disabled: props.control.disabled,
        placeholder: props.control.placeholder,
        required: props.control.required,
        ariaRequired: props.control.required,
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
