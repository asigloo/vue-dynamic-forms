<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl } from '../../core/models';
import { useInputEvents } from '../../composables/input-events';

const props = {
  control: Object as PropType<FormControl<string>>,
};

export default defineComponent({
  name: 'asCheckboxInput',
  props,
  setup(props, { emit }) {
    const { onCheck, onFocus, onBlur } = useInputEvents(props?.control, emit);

    return () => [
      h('input', {
        name: props?.control?.name || '',
        type: props?.control?.type,
        id: props?.control?.name,
        disabled: props?.control?.disabled,
        class: ['checkbox-control'],
        value: props?.control?.value,
        onFocus,
        onBlur,
        onChange: onCheck,
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
  },
});
</script>
