import Vue from 'vue';
import App from './App.vue';
import './styles/main.scss';

import VueDynamicForms from '../../src/index'; // Dev
// import VueDynamicForms from '@asigloo/vue-dynamic-forms' // Prod

Vue.config.productionTip = false;
Vue.use(VueDynamicForms);

new Vue({ render: h => h(App) }).$mount('#app');
