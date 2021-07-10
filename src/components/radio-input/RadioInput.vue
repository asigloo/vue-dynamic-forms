<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl, RadioInput } from '/@/core/models';
import { useInputEvents } from '/@/composables/useInputEvents';
import { useInputValidation } from '/@/composables/useValidation';

const props = {
  control: Object as PropType<FormControl<RadioInput>>,
  forceValidation: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'asRadioInput',
  inheritAttrs: false,
  props,
  setup(props, { emit }) {
    const { onCheck, onInput, onFocus, onBlur, getRadioClasses } =
      useInputEvents(props, emit);

    const { errorMessages, isPendingValidation } = useInputValidation(
      props,
      emit,
    );

    const renderRadios = props?.control?.options?.map(option => {
      return h('div', { class: 'radio-input' }, [
        h('input', {
          name: props?.control?.name || '',
          type: props?.control?.type,
          id: option.key,
          disabled: option.disabled || props?.control?.disabled,
          checked: props.control.value === option.key,
          class: ['radio-control'],
          value: option.key,
          onFocus,
          onBlur,
          onInput,
          onCheck,
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
          class: getRadioClasses.value,
          tabIndex: -1,
          role: 'group',
        },
        renderRadios,
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
