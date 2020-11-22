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

    const {
      name,
      type,
      value,
      disabled,
      placeholder,
      required,
      readonly,
      autocomplete,
      ariaLabel,
      ariaLabelledBy,
    } = props.control;
    return () =>
      h('input', {
        id: name,
        name,
        type,
        class: ['form-control'],
        value,
        disabled,
        placeholder,
        required,
        readonly,
        autocomplete,
        ariaRequired: required,
        ariaLabel,
        ariaLabelledBy,
        onFocus,
        onBlur,
        onChange,
      });
  },
});
</script>

<style></style>
