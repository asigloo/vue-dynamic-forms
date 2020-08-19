import formModels from './form-control.model';
import validators from './validators';

export * from './form-control.model';
export * from './validators';

export default {
  ...validators,
  ...formModels,
};
