import Vue from 'vue'
import App from './App.vue'
import './plugins/axios'
import'./plugins/dialog'
import * as Dialog from './dialogs'
Vue.dialog.registerComponent('Confirm', Dialog.confirm)
Vue.dialog.registerComponent('Alert', Dialog.pieAlert)
Vue.dialog.registerComponent('Api', Dialog.pieApi)
Vue.dialog.registerComponent('OpenProject', Dialog.pieOpenProject)
Vue.dialog.registerComponent('Project', Dialog.pieProject)
Vue.dialog.registerComponent('TestCase', Dialog.pieTestCase)
Vue.config.productionTip = false
Vue.directive('init', {
  bind: function(el, binding, vnode) {
  }
});
new Vue({
  render: h => h(App),
}).$mount('#app')
