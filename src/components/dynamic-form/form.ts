import { InputBase } from '@/core/models';

export interface DynamicForm {
  id: string;
  fields: InputBase[];
  fieldOrder?: string[];
}
