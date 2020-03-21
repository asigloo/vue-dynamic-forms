import Vue from 'vue';
import App from './App.vue';
import './styles/main.scss';
/* import VueDynamicForms from '../dist/as-dynamic-forms.common';
 */
import VueDynamicForms from '../src/main';
Vue.config.productionTip = false;
Vue.use(VueDynamicForms);

new Vue({ render: h => h(App) }).$mount('#app');
