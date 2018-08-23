// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
Vue.config.productionTip = false


var config = {
  apiKey: "AIzaSyBDGF2s3hTLzppzzh0Q0I-0w6NRmVJeuv8",
  authDomain: "fir-vue-923f5.firebaseapp.com",
  databaseURL: "https://fir-vue-923f5.firebaseio.com",
  projectId: "fir-vue-923f5",
  storageBucket: "fir-vue-923f5.appspot.com",
  messagingSenderId: "648064351531"
};

firebase.initializeApp(config);

window.firebase=firebase;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
