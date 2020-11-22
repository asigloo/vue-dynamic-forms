<script lang="ts">
import { defineComponent, h, PropType, computed } from 'vue';
import { FormControl, SelectInput } from '@/core/models';
import { useInputEvents } from '@/composables/input-events';
import { isObject } from '@/core/utils/helpers';

const props = {
  control: Object as PropType<FormControl<SelectInput>>,
};

export default defineComponent({
  name: 'asSelectInput',
  props,
  setup(props, { emit }) {
    return () => {
      const { onChange, onFocus, onBlur } = useInputEvents(props, emit);

      const formattedOptions = computed(() => {
        if (isObject(props?.control?.options)) {
          return Object.values(props?.control?.options);
        }
        return props?.control?.options;
      });

      const options = formattedOptions.value.map(({ key, value, disabled }) =>
        h('option', { key, value: key, disabled }, value),
      );
      return h(
        'select',
        {
          id: props.control.name,
          name: props?.control?.name || '',
          class: ['form-control'],
          value: props?.control?.value,
          disabled: props?.control?.disabled,
          placeholder: props?.control?.placeholder,
          required: props.control.required,
          readonly: props?.control.readonly,
          ariaLabel: props.control.ariaLabel,
          ariaLabelledBy: props.control.ariaLabelledBy,
          ariaRequired: props.control.required,
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
