import { App, InjectionKey } from 'vue';
import { FormOptions } from './core/models';
export interface DynamicFormsOptions {
    autoValidate?: boolean;
    form?: FormOptions;
}
export interface DynamicFormsPlugin {
    options?: DynamicFormsOptions;
    install(app: App): void;
}
export declare const dynamicFormsSymbol: InjectionKey<DynamicFormsPlugin>;
export declare function useDynamicForms(): DynamicFormsPlugin;
export declare function createDynamicForms(options?: DynamicFormsOptions): DynamicFormsPlugin;
