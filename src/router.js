import Vue from "vue";
import Router from "vue-router";
import store from './store';
import Login from './components/Auth/Login';
import Dashboard from './components/Auth/Dashboard';
import TestLayout from './components/Auth/Test-Layout';
import Briefcase from './components/Briefcase';
import MeetingPacks from './components/MeetingPacks';
import Meetings from './components/Meetings';
import Resources from './components/Resources';
import Approvals from './components/Approvals';
import Compliance from './components/Compliance';
import Evaluation from './components/Evaluation';
import Discussion from './components/Discussion';
import Plans from './components/Plans';
import Conference from './components/Conference';
import Elections from './components/Elections';
import RiskManagement from './components/RiskManagement';

Vue.use(Router);

let router = new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login      
    },
    {
      path: '/dashboard',
      component: Dashboard,
      name: 'dashboard',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next('/');
          } else {
              next();
          }
      }
    },
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: Dashboard,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/Briefcase',
      component: Briefcase,
      name: 'Briefcase',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next('/');
          } else {
              next();
          }
      }
    },
    // {
    //   path: '/Briefcase',
    //   name: 'Briefcase',
    //   component: Briefcase,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },  
    {
      path: '/Meeting Packs',
      component: MeetingPacks,
      name: 'Meeting Packs',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next('/');
          } else {
              next();
          }
      }
    },
    // {
    //   path: '/Meeting Packs',
    //   name: 'Meeting Packs',
    //   component: MeetingPacks,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },  
    {
      path: '/Meetings',
      component: Meetings,
      name: 'Meetings',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next('/');
          } else {
              next();
          }
      }
    },
    // {
    //   path: '/Meetings',
    //   name: 'Meetings',
    //   component: Meetings,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },  
    {
      path: '/Resources',
      component: Resources,
      name: 'Resources',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next('/');
          } else {
              next();
          }
      }
    },
    // {
    //   path: '/Resources',
    //   name: 'Resources',
    //   component: Resources,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },  
    {
      path: '/Approvals',
      component: Approvals,
      name: 'Approvals',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next('/');
          } else {
              next();
          }
      }
    },
    // {
    //   path: '/Approvals',
    //   name: 'Approvals',
    //   component: Approvals,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/Compliance',
      component: Compliance,
      name: 'Compliance',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next('/');
          } else {
              next();
          }
      }
    },
    // {
    //   path: '/Compliance',
    //   name: 'Compliance',
    //   component: Compliance,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/Evaluation',
      component: Evaluation,
      name: 'Evaluation',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next('/');
          } else {
              next();
          }
      }
    },
    // {
    //   path: '/Evaluation',
    //   name: 'Evaluation',
    //   component: Evaluation,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/Discussion',
      component: Discussion,
      name: 'Discussion',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next('/');
          } else {
              next();
          }
      }
    },
    // {
    //   path: '/Discussion',
    //   name: 'Discussion',
    //   component: Discussion,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },  
    {
      path: '/Plans',
      component: Plans,
      name: 'Plans',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next('/');
          } else {
              next();
          }
      }
    },
    // {
    //   path: '/Plans',
    //   name: 'Plans',
    //   component: Plans,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/Conference',
      component: Conference,
      name: 'Conference',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next('/');
          } else {
              next();
          }
      }
    },
    // {
    //   path: '/Conference',
    //   name: 'Conference',
    //   component: Conference,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/Elections',
      component: Elections,
      name: 'Elections',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next('/');
          } else {
              next();
          }
      }
    },
    // {
    //   path: '/Elections',
    //   name: 'Elections',
    //   component: Elections,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/Risk Management',
      component: RiskManagement,
      name: 'Risk Management',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next('/');
          } else {
              next();
          }
      }
    },
    // {
    //   path: '/Risk Management',
    //   name: 'Risk Management',
    //   component: RiskManagement,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/TestLayout',
      component: TestLayout,
      name: 'TestLayout',
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next('/');
          } else {
              next();
          }
      }
    },
    // {
    //   path: '/TestLayout',
    //   name: 'TestLayout',
    //   component: TestLayout,
    //   meta: {
    //     requiresAuth: true
    //   }
    // }
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)){
//     if(store.getters.isLoggedIn){
//       next()
//       return
//     }
//     next('/login')
//   }
//   else{
//       // }
//     next()
//   }
// })

export default router
