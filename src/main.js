import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'

createApp(App).use(router).use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  }).mount('#app')
