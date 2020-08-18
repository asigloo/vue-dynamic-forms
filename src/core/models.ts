export class InputBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  type: string;

  constructor(
    options: {
      value?: T | undefined;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      type?: string;
    } = {},
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.type = options.type || '';
  }
}

export class TextInput extends InputBase<string> {
  type = 'text';
}

export class SelectInput<T> extends InputBase<T> {
  options: { key: string; value: string }[];
  constructor(
    options: {
      value?: T | undefined;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      type?: string;
      options?: { key: string; value: string }[];
    } = {},
  ) {
    super({
      value: options.value,
      key: options.key,
      label: options.label,
      required: options.required,
      order: options.order,
    });
    this.type = 'select';
    this.options = options.options || [];
  }
}
