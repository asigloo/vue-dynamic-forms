<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl, CheckboxInput } from '@/core/models';
import { useInputEvents } from '@/composables/input-events';

const props = {
  control: Object as PropType<FormControl<CheckboxInput>>,
};

export default defineComponent({
  name: 'asCheckboxInput',
  props,
  setup(props, { emit }) {
    const { onChange, onFocus, onBlur } = useInputEvents(props, emit);
    const renderCheckbox = [
      h('input', {
        name: props?.control?.name || '',
        type: props?.control?.type,
        id: props?.control?.name,
        disabled: props?.control?.disabled,
        class: ['checkbox-control'],
        value: props?.control?.value,
        checked: props?.control?.value,
        onFocus,
        onBlur,
        onChange,
      }),
      h(
        'label',
        {
          class: ['checkbox-label'],
          for: props?.control?.name,
        },
        props?.control?.label,
      ),
    ];

    return () => [
      h(
        'div',
        {
          class: 'checkbox-group',
          tabIndex: -1,
          role: 'group',
        },
        renderCheckbox,
      ),
    ];
  },
});
</script>
