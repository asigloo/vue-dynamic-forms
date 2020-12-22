<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl, CheckboxInput } from '@/core/models';
import { useInputEvents } from '@/composables/input-events';
import { useInputValidation } from '@/composables/use-validation';

const props = {
  control: Object as PropType<FormControl<CheckboxInput>>,
  forceValidation: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'asCheckboxInput',
  inheritAttrs: false,
  props,
  setup(props, { emit }) {
    const { onCheck, onFocus, onBlur } = useInputEvents(props, emit);

    const { errorMessages, isPendingValidation } = useInputValidation(
      props,
      emit,
    );

    const renderCheckbox = [
      h('input', {
        name: props.control.name || '',
        type: props.control.type,
        id: props.control.name,
        disabled: props.control.disabled,
        class: ['checkbox-control'],
        value: props.control.value,
        checked: props.control.value,
        onFocus,
        onBlur,
        onChange: onCheck,
      }),
      h(
        'label',
        {
          class: ['checkbox-label'],
          for: props.control.name,
        },
        props.control.label,
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
