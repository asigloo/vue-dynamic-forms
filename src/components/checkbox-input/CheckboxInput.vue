<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl, CheckboxInput } from '/@/core/models';
import { useInputEvents } from '/@/composables/useInputEvents';
import { useInputValidation } from '/@/composables/useValidation';

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
    const { onCheck, onFocus, onBlur, getCheckboxClasses } = useInputEvents(
      props,
      emit,
    );

    const { errorMessages, isPendingValidation, isRequired } =
      useInputValidation(props, emit);

    const requiredStar = h(
      'span',
      {
        ariaHidden: true,
        class: 'form-required-star',
      },
      ' *',
    );

    const renderCheckbox = [
      h('input', {
        name: props.control.name || '',
        type: props.control.type,
        id: props.control.name,
        disabled: props.control.disabled,
        class: 'checkbox-control',
        value: props.control.value,
        checked: props.control.value,
        required: isRequired.value,
        readonly: props.control.readonly,
        ariaRequired: isRequired.value,
        ariaLabel: props.control.ariaLabel,
        ariaLabelledBy: props.control.ariaLabelledBy,
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
        [props.control.label, isRequired.value ? requiredStar : ''],
      ),
    ];

    return () => [
      h(
        'div',
        {
          class: getCheckboxClasses.value,
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
