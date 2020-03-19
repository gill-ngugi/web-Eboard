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
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Briefcase',
      name: 'Briefcase',
      component: Briefcase,
      meta: {
        requiresAuth: true
      }
    },  
    {
      path: '/Meeting Packs',
      name: 'Meeting Packs',
      component: MeetingPacks,
      meta: {
        requiresAuth: true
      }
    },  
    {
      path: '/Meetings',
      name: 'Meetings',
      component: Meetings,
      meta: {
        requiresAuth: true
      }
    },  
    {
      path: '/Resources',
      name: 'Resources',
      component: Resources,
      meta: {
        requiresAuth: true
      }
    },  
    {
      path: '/Approvals',
      name: 'Approvals',
      component: Approvals,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Compliance',
      name: 'Compliance',
      component: Compliance,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Evaluation',
      name: 'Evaluation',
      component: Evaluation,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Discussion',
      name: 'Discussion',
      component: Discussion,
      meta: {
        requiresAuth: true
      }
    },  
    {
      path: '/Plans',
      name: 'Plans',
      component: Plans,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Conference',
      name: 'Conference',
      component: Conference,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Elections',
      name: 'Elections',
      component: Elections,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Risk Management',
      name: 'Risk Management',
      component: RiskManagement,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/TestLayout',
      name: 'TestLayout',
      component: TestLayout,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(store.getters.isLoggedIn){
      next()
      return
    }
    next('/login')
  }
  else{
    next()
  }
})

export default router
