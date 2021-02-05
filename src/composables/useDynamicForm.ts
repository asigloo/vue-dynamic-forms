import { diff } from 'deep-object-diff';
import {
  FieldTypes,
  FormControl,
  InputType,
  FormChanges,
  ValidationEvent,
  InputEvent,
  DynamicForm,
  FormFields,
  FormOptions,
} from '@/core/models';
import {
  computed,
  ComputedRef,
  nextTick,
  onMounted,
  ref,
  Ref,
  toRaw,
} from 'vue';
import { deepClone, hasValue, removeEmpty } from '@/core/utils/helpers';
import { FieldControl } from '@/core/factories';
import { useDebounceFn } from './useDebounce';
import { DynamicFormsOptions } from '@/dynamicForms';

interface DynamicFormComposition {
  controls: Ref<FormControl<InputType>[]>;
  forceValidation: Ref<boolean>;
  formValues: ComputedRef<(string | { [key: string]: boolean })[]>;
  formOptions: Ref<FormOptions>;
  errors: ComputedRef<Record<string, unknown>>;
  isValid: ComputedRef<boolean>;
  normalizedControls: ComputedRef<Record<string, unknown>>;
  deNormalizedScopedSlots: ComputedRef<string[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formattedOptions: ComputedRef<any>;
  valueChange: (event: InputEvent) => void;
  onBlur: (event: InputEvent) => void;
  onValidate: (event: ValidationEvent) => void;
  handleSubmit: () => void;
  validateAll: () => void;
  mapControls: (empty?: boolean) => void;
  findControlByName: (name: string | unknown) => FormControl<InputType>;
  resetForm: () => void;
  detectChanges: (fields: FormFields) => void;
  onOptionsChanged: (options: FormOptions) => void;
}

export function useDynamicForm(
  form: DynamicForm,
  ctx: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    slots: {};
    emit: (arg0: string, arg1: { [x: string]: string | number }) => void;
  },
  options?: DynamicFormsOptions,
): DynamicFormComposition {
  let cache = deepClone(toRaw(form.fields));

  const controls: Ref<FormControl<InputType>[]> = ref([]);
  const formOptions: Ref<FormOptions> = ref({
    ...options?.form,
    ...form?.options,
    resetAfterSubmit: true,
  });
  const forceValidation = ref(false);

  const deNormalizedScopedSlots = computed(() => Object.keys(ctx.slots));

  const normalizedControls = computed(() => {
    const normalizedControls = {};
    controls.value.forEach(element => {
      normalizedControls[element.name] = element;
    });
    return normalizedControls;
  });

  const isValid = computed(() => {
    const hasInvalidControls = controls.value.some(control => !control.valid);
    return !hasInvalidControls;
  });

  const formValues = computed(() => {
    return removeEmpty(
      controls.value.reduce((prev, curr) => {
        const obj = {};
        obj[curr.name] =
          curr.type === FieldTypes.NUMBER
            ? parseFloat(`${curr.value}`)
            : curr.value;
        return {
          ...prev,
          ...obj,
        };
      }, {}),
    );
  });

  const errors = computed(() => {
    return controls.value
      ? controls.value.reduce((prev, curr) => {
          const errors = Object.keys(curr.errors || {}) || [];
          if (errors.length > 0) {
            const error = {};
            error[curr.name] = curr.errors;
            return {
              ...prev,
              ...error,
            };
          }
          return prev;
        }, {})
      : {};
  });

  const formattedOptions = computed(() => {
    const opts = formOptions.value;

    if (opts) {
      const {
        customClass,
        customStyles,
        method,
        netlify,
        netlifyHoneypot,
        autocomplete,
      } = opts;
      return {
        class: customClass,
        style: customStyles,
        method,
        'data-netlify': netlify,
        'data-netlify-honeypot': netlifyHoneypot,
        autocomplete: autocomplete ? 'on' : 'off',
      };
    } else {
      return;
    }
  });

  function mapControls(empty = false) {
    const controlArray =
      Object.entries(form?.fields).map(([key, field]: [string, InputType]) =>
        empty
          ? FieldControl({
              ...field,
              name: key,
              value: field.type === FieldTypes.CHECKBOX ? false : null,
            })
          : FieldControl({
              ...field,
              name: key,
            }),
      ) || [];
    if (form.fieldOrder) {
      controls.value = controlArray.sort(
        (a: FormControl<InputType>, b: FormControl<InputType>) =>
          form.fieldOrder.indexOf(a.name) - form.fieldOrder.indexOf(b.name),
      );
    } else {
      controls.value = controlArray;
    }
  }

  function findControlByName(name: string | unknown) {
    const updatedCtrl = controls.value.find(control => control.name === name);
    return updatedCtrl;
  }

  function emitChanges(changes: FormChanges) {
    ctx.emit('change', changes);
  }

  const debounceEmitChanges = useDebounceFn(emitChanges, 300);

  function valueChange(event: InputEvent) {
    if (hasValue(event.value)) {
      const updatedCtrl = findControlByName(event.name);
      if (updatedCtrl) {
        updatedCtrl.value = event.value as string;
        updatedCtrl.dirty = true;
      }
      debounceEmitChanges(formValues.value);
    }
  }

  function onBlur({ name }: InputEvent) {
    const updatedCtrl = findControlByName(name);
    if (updatedCtrl) {
      updatedCtrl.touched = true;
    }
  }

  function onValidate({ name, errors, valid }: ValidationEvent) {
    const updatedCtrl = findControlByName(name);
    if (updatedCtrl) {
      updatedCtrl.errors = removeEmpty({
        ...updatedCtrl.errors,
        ...errors,
      });
      updatedCtrl.valid = valid;
    }
  }

  function detectChanges(fields) {
    const changes = diff(cache, deepClone(fields));
    Object.entries(changes).forEach(([key, value]) => {
      const ctrl = findControlByName(key);
      if (ctrl) {
        Object.entries(value).forEach(([change, newValue]) => {
          if (change === 'options' || change === 'validations') {
            Object.entries(newValue).forEach(([optKey, optValue]) => {
              ctrl[change][optKey] = {
                ...ctrl[change][optKey],
                ...optValue,
              };
            });
          } else {
            ctrl[change] = newValue;
          }
        });
      }
    });
    cache = deepClone(toRaw(fields));
  }

  function onOptionsChanged(changes) {
    Object.assign(formOptions.value, changes);
  }

  function resetForm() {
    mapControls(true);
    forceValidation.value = false;
  }

  async function handleSubmit() {
    validateAll();

    await nextTick();

    if (isValid.value) {
      ctx.emit('submitted', formValues.value);
      if (formOptions.value.resetAfterSubmit) {
        resetForm();
      }
    } else {
      ctx.emit('error', errors.value);
    }
  }

  function validateAll() {
    forceValidation.value = true;
  }

  onMounted(() => {
    mapControls();
  });

  return {
    controls,
    mapControls,
    valueChange,
    formValues,
    formOptions,
    handleSubmit,
    isValid,
    errors,
    deNormalizedScopedSlots,
    normalizedControls,
    formattedOptions,
    onBlur,
    onValidate,
    forceValidation,
    validateAll,
    findControlByName,
    resetForm,
    detectChanges,
    onOptionsChanged,
  };
}
