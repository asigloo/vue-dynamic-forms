export * from './validators';
declare const _default: {
    required: (value: import("../models").ControlValue) => import("../models").ValidationErrors;
    min: (min: number) => (value: import("../models").ControlValue) => import("../models").ValidationErrors;
    max: (max: number) => (value: import("../models").ControlValue) => import("../models").ValidationErrors;
    email: (value: import("../models").ControlValue) => import("../models").ValidationErrors;
    minLength: (minLength: number) => (value: import("../models").ControlValue) => import("../models").ValidationErrors;
    maxLength: (maxLength: number) => (value: import("../models").ControlValue) => import("../models").ValidationErrors;
    pattern: (pattern: string) => import("../models").ValidatorFn;
    url: (value: import("../models").ControlValue) => import("../models").ValidationErrors;
};
export default _default;
