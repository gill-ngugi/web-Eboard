import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Axios from 'axios';
import axios from 'axios';
import App from "./App.vue";
import Slider from '@jeremyhamm/vue-slider';
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes';
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import VueLocalStorage from 'vue-localstorage'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import store from './store';
import router from './router';
import GraphLine3D from 'vue-graph/src/components/line3d.js'
import NoteWidget from 'vue-graph/src/widgets/note.js'
import LegendWidget from 'vue-graph/src/widgets/legends.js'
 
Vue.component(GraphLine3D.name, GraphLine3D);
Vue.component(NoteWidget.name, NoteWidget);
Vue.component(LegendWidget.name, LegendWidget);

// import vueFilterPrettyBytes from 'vue-filter-pretty-bytes';
// import PSPDFKit from "pspdfkit";
// PSPDFKit.load({ });
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.common["Authorization"] = result;
// var options = {headers: { "Content-Type": application.json }};
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
// import router from "./router";
// import store from "./store";
// Vue.use(require('vue-moment'));

// Vue.prototype.$http = Axios;
// const accessToken = localStorage.getItem('access_token')
// if (accessToken) {
//     Vue.prototype.$http.defaults.headers.common['Authorization'] = accessToken
// }
// axios.defaults.baseURL = "http://eserver1.stl-horizon.com/api_v10/frontend/web/";


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Slider);
Vue.use(vueFilterPrettyBytes);
Vue.use(VueMoment, { moment });
Vue.use(VueLocalStorage);
window.axios = axios;

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if(token){
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.component('Gillian', {
  template: `<div><p> I am headed for {{city}} <button @click="changeCity()">Change Name</button></p></div>`,
  data: function(){
    return{
      city: 'Los Angeles'
    }
  },

  methods: {
    changeName:function(){ 
        this.name = 'San Fransisco';
    }
  }
});


const store = new Vuex.Store(
  {
    state: {
        authenticated: false
    },
    mutations: {
        setAuthentication(state, status) {
            state.authenticated = status;
        }
    }
  }
);

// const routery = new VueRouter({
//   mode: 'history',
//   routes,
//   base:'/'
// });

new Vue({
  vuetify,
  router: router,
  store: store,
  render: h => h(App)
}).$mount("#app");
