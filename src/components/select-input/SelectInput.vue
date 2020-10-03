<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl, SelectInput } from '../../core/models';
import { useInputEvents } from '../../composables/input-events';

const props = {
  control: Object as PropType<FormControl<SelectInput>>,
};

export default defineComponent({
  name: 'asSelectInput',
  props,
  setup(props, { emit }) {
    return () => {
      const { onChange, onFocus, onBlur } = useInputEvents(props, emit);

      const options = props?.control?.options?.map(({ key, value, disabled }) =>
        h('option', { key, value: key, disabled }, value),
      );
      return h(
        'select',
        {
          name: props?.control?.name || '',
          disabled: props?.control?.disabled,
          placeholder: props?.control?.placeholder,
          class: ['form-control'],
          value: props?.control?.value,
          onFocus,
          onBlur,
          onChange,
        },
        options,
      );
    };
  },
});
</script>

<style></style>
