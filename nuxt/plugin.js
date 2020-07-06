
import Vue from 'vue'
import VueDynamicForms from '@asigloo/vue-dynamic-forms';

Vue.use(VueDynamicForms, <%= serialize(options.dynamicFormsOptions) %>)
