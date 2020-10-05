import { InputType } from '@/core/models';

export interface DynamicForm {
  id: string;
  fields: InputType[];
  fieldOrder?: string[];
}
