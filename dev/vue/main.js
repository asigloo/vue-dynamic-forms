import Vue from 'vue';
import App from './App.vue';
import './styles/main.scss';
import vSelect from 'vue-select';
import VueDynamicForms from '../../dist/as-dynamic-forms.esm'; // Dev
// import VueDynamicForms from '@asigloo/vue-dynamic-forms' // Prod

Vue.config.productionTip = false;
Vue.use(VueDynamicForms);
Vue.component('v-select', vSelect);

new Vue({ render: h => h(App) }).$mount('#app');
