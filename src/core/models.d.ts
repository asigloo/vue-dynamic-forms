export declare type InputType = TextInput | NumberInput | SelectInput | TextAreaInput | CheckboxInput | RadioInput | EmailInput | PasswordInput | RadioInput | ColorInput | UrlInput | CustomInput;
export declare type MustHave<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export declare type FormFields = {
    [key: string]: InputType;
};
export declare type FormChanges = {
    [key: string]: string | number | null | undefined;
};
export interface DynamicForm {
    id: string;
    fields: FormFields;
    fieldOrder?: string[];
    options?: FormOptions;
}
export declare enum ValidationTriggerTypes {
    BLUR = "blur",
    CHANGE = "change"
}
export interface ValidationTrigger {
    type: ValidationTriggerTypes;
    threshold: number;
}
export interface ErrorMessage {
    text: string;
    value: boolean | null;
}
export declare type ValidationErrors = {
    [key: string]: any;
};
export declare type BindingObject = {
    [key: string]: never;
};
export interface ValidatorFn {
    (value: ControlValue | undefined): ValidationErrors | null;
}
export declare type ControlValue = string | number | boolean;
export interface FormValidator {
    validator: ValidatorFn;
    text: string;
    type?: string;
}
export interface InputEvent {
    name: string;
    value?: unknown;
}
export declare type ValidationEvent = InputEvent & {
    errors: ValidationErrors;
    valid: boolean;
};
export interface InputBase {
    name?: string;
    label?: string;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    disabled?: boolean;
    customClass?: string | string[] | BindingObject | BindingObject[] | unknown;
    customStyles?: string | string[] | BindingObject | BindingObject[] | unknown;
    placeholder?: string;
    autocomplete?: string;
    readonly?: boolean;
    validations?: FormValidator[];
    validationTrigger?: ValidationTrigger;
}
export declare type TextInput = InputBase & {
    type: FieldTypes.TEXT;
    value?: string;
};
export declare type NumberInput = InputBase & {
    type: FieldTypes.NUMBER;
    value: number;
    min: number;
    max: number;
    step: number;
};
export declare type SelectInput<T = boolean | string> = InputBase & {
    type: FieldTypes.SELECT;
    value: T;
    optionValue: string;
    optionLabel: string;
    options?: {
        label: string;
        value: string;
        disabled?: boolean;
    }[];
};
export declare type TextAreaInput = InputBase & {
    type: FieldTypes.TEXTAREA;
    value: string;
    cols?: number;
    rows?: number;
};
export declare type CheckboxInput = InputBase & {
    type: FieldTypes.CHECKBOX;
    value: boolean;
};
export declare type CustomInput = InputBase & {
    type: FieldTypes.CUSTOM;
    value: boolean | string | number;
};
export declare type EmailInput = InputBase & {
    type: FieldTypes.EMAIL;
    value: string;
};
export declare type PasswordInput = InputBase & {
    type: FieldTypes.PASSWORD;
    value: string;
};
export declare type ColorInput = InputBase & {
    type: FieldTypes.COLOR;
    value: string;
};
export declare type UrlInput = InputBase & {
    type: FieldTypes.URL;
    value: string;
};
export declare type RadioInput = InputBase & {
    type: FieldTypes.RADIO;
    value: string;
    options?: {
        key: string;
        value: string;
        disabled?: boolean;
    }[];
};
export declare type FormControl<T extends InputType> = T & {
    valid: boolean;
    dirty: boolean;
    touched: boolean;
    errors: ValidationErrors | null;
};
export interface FormOptions {
    customClass?: string | string[] | BindingObject | BindingObject[] | unknown;
    customStyles?: string | string[] | BindingObject | BindingObject[] | unknown;
    method?: string;
    netlify?: boolean;
    netlifyHoneypot?: string;
    autocomplete?: boolean | string;
    resetAfterSubmit?: boolean;
}
export declare enum FieldTypes {
    TEXT = "text",
    TEXTAREA = "textarea",
    SELECT = "select",
    NUMBER = "number",
    EMAIL = "email",
    URL = "url",
    PASSWORD = "password",
    CHECKBOX = "checkbox",
    RADIO = "radio",
    CUSTOM = "custom-field",
    COLOR = "color"
}
