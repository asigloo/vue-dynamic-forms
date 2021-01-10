import { computed, createApp, defineComponent } from 'vue';
import {
  TextField,
  createDynamicForms,
  SelectField,
  CheckboxField,
  CustomField,
  FieldControl,
} from '../../';
import { mount } from '@vue/test-utils';

import DynamicForm from '../dynamic-form/DynamicForm.vue';
import DynamicInput from '../dynamic-input/DynamicInput.vue';

const vdf = createDynamicForms({
  autoValidate: true,
  form: {
    netlify: true,
    method: 'POST',
  },
});

const App = defineComponent({
  template: `
    <div id="app">
    <dynamic-form
        :form="form"
    >
      <template
        v-slot:customField1="{ control, onChange, onFocus, onBlur }"
      >
        <div class="avocado-field">
          <input
            :id="control.name"
            v-if="control"
            class="form-control"
            v-model="control.value"
            :type="control.type"
            :name="control.name"
          />
          <i>🥑</i>
        </div>
      </template>
    </dynamic-form>
    </div>
  `,
  components: {
    DynamicForm,
  },
  setup() {
    const form = computed(() => ({
      id: 'basic-demo',
      fields: {
        username: TextField({
          label: 'Username',
        }),
        games: SelectField({
          label: 'Games',
          options: [
            {
              value: 'the-last-of-us',
              label: 'The Last of Us II',
            },
            {
              value: 'death-stranding',
              label: 'Death Stranding',
            },
            {
              value: 'nier-automata',
              label: 'Nier Automata',
            },
          ],
        }),
        checkIfAwesome: CheckboxField({
          label: 'Remember Me',
        }),
        customField1: CustomField({
          label: 'Custom Field',
        }),
      },
      options: {
        customClass: 'flex flex-wrap',
      },
    }));

    return {
      form,
    };
  },
});

const app = createApp(App);
app.use(vdf);

describe('DynamicForm', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(App, {
      global: {
        plugins: [vdf],
      },
    });
  });

  it('renders an dynamic form element', () => {
    const form = cmp.find('.dynamic-form');
    expect(form.exists()).toBe(true);
  });

  it('renders dynamic input components based on the fields prop', () => {
    const inputs = cmp.findAllComponents(DynamicInput);
    expect(inputs.length).toBe(4);
  });

  it('renders a dynamic input component with a control as prop', () => {
    const input = cmp.findComponent(DynamicInput);
    expect(input.props('control')).toStrictEqual(
      FieldControl({
        name: 'username',
        ...TextField({
          label: 'Username',
        }),
      }),
    );
  });

  it('render a form element with id', () => {
    const form = cmp.find('.dynamic-form');
    expect(form.attributes('id')).toBe('basic-demo');
  });

  it('render a form element with name equal to form id', () => {
    const form = cmp.find('.dynamic-form');
    expect(form.attributes('name')).toBe('basic-demo');
  });

  it('render a form element with formatted options from plugin', () => {
    const form = cmp.find('.dynamic-form');
    expect(form.attributes('method')).toBe('POST');
    expect(form.attributes('data-netlify')).toBe('true');
  });

  it('render a slot with customfields', () => {
    const custom = cmp.find('slot');

    expect(custom.exists()).toBe(true);
    expect(custom.attributes('name')).toContain('customField');
  });
});
