<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import { FormControl } from '@/core/models';

const props = {
  control: Object as PropType<FormControl<any>>,
};

export default defineComponent({
  name: 'asSelectInput',
  props,
  setup(props) {
    return () => {
      const options = props?.control?.options?.map(({ key, value, disabled }) =>
        h('option', { key, value, disabled }, value),
      );
      return h(
        'select',
        {
          name: props?.control?.name || '',
          type: props?.control?.type,
          value: props?.control?.value,
          disabled: props?.control?.disabled,
          placeholder: props?.control?.placeholder,
          class: ['form-control'],
        },
        options,
      );
    };
  },
});
</script>

<style></style>
