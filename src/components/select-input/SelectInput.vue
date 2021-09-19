<script lang="ts">
import { defineComponent, h, PropType, computed } from 'vue'
import { FormControl, SelectInput } from '/@/core/models'
import { useInputEvents } from '/@/composables/useInputEvents'
import { isObject } from '/@/core/utils/helpers'
import { useInputValidation } from '/@/composables/useValidation'

const props = {
  control: Object as PropType<FormControl<SelectInput>>,
  forceValidation: {
    type: Boolean,
    default: false,
  },
}

export default defineComponent({
  name: 'asSelectInput',
  inheritAttrs: false,
  props,
  setup(props, { emit }) {
    return () => {
      const { onInput, onChange, onFocus, onBlur, getClasses } = useInputEvents(
        props,
        emit,
      )
      const { isRequired, errorMessages, isPendingValidation } =
        useInputValidation(props, emit)

      const formattedOptions = computed(() => {
        if (isObject(props?.control?.options)) {
          return Object.values(props?.control?.options)
        }
        return props?.control?.options
      })

      const options = formattedOptions?.value?.map(option =>
        h(
          'option',
          {
            key: option[props.control.optionValue],
            value: option[props.control.optionValue],
            disabled: option.disabled,
          },
          option[props.control.optionLabel],
        ),
      )
      return [
        h(
          'select',
          {
            id: props.control.name,
            name: props.control.name || '',
            class: getClasses.value,
            value: props.control.value,
            disabled: props.control.disabled,
            placeholder: props.control.placeholder,
            required: isRequired.value,
            readonly: props.control.readonly,
            ariaLabel: props.control.ariaLabel,
            ariaLabelledBy: props.control.ariaLabelledBy,
            ariaRequired: isRequired.value,
            onFocus,
            onBlur,
            onInput,
            onChange,
          },
          options,
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
      ]
    }
  },
})
</script>

<style></style>
