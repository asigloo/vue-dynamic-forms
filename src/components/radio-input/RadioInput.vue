<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl, RadioInput } from '@/core/models';
import { useInputEvents } from '@/composables/input-events';

const props = {
  control: Object as PropType<FormControl<RadioInput>>,
};

export default defineComponent({
  name: 'asRadioInput',
  props,
  setup(props, { emit }) {
    const { onInput, onFocus, onBlur } = useInputEvents(props, emit);
    const renderRadios = props?.control?.options?.map(option => {
      return h('div', { class: 'radio-input' }, [
        h('input', {
          name: props?.control?.name || '',
          type: props?.control?.type,
          id: option.key,
          disabled: option.disabled,
          class: ['radio-control'],
          value: option.value,
          onFocus,
          onBlur,
          onInput,
        }),
        h(
          'label',
          {
            class: ['radio-label'],
            for: option.key,
          },
          option.value,
        ),
      ]);
    });
    return () => [
      h(
        'div',
        {
          class: 'radio-group',
          tabIndex: -1,
          role: 'group',
        },
        renderRadios,
      ),
    ];
  },
});
</script>
