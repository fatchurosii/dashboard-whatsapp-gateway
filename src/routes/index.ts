import {
  createRouter,
  createWebHistory
} from 'vue-router'
import PanelLoyout from '@layouts/panel-layout.vue';
import Dashboard from "@src/views/Dashboard.vue"
import masterRoutes from "@routes/master";
import reportRoutes from "@routes/report";
import authRoutes from "@routes/authorization";
import {
  useAuthorizationStore
} from '@src/stores/authorization';
import {
  useEnvironmentStore
} from '@src/stores/environment';

function createAppRouter() {
  const environmentStore = useEnvironmentStore();

  const routes = [

    ...authRoutes,
    {
      path: '/',
      component: PanelLoyout,   
      children: [{
          path: '/',
          name: 'dashboard',
          meta: {
            auth: true,
          },
          component: Dashboard
        },
        ...masterRoutes,
        ...reportRoutes
      ]
    }
  ]

  const router = createRouter({
    history: createWebHistory(environmentStore.data.subDirectory),
    routes,
    scrollBehavior() {
      return {
        top: 0,
      };
    },
  });

  router.beforeEach((to, _from, next) => {
    const authorizationStore = useAuthorizationStore();        
    if (to.matched.some((record) => record.meta.auth)) {      
      const token = localStorage.getItem(environmentStore.data.localStorageToken);

      if (!token) {
        return next({
          name: "login",
        });
      }
      
      if (authorizationStore.data.authorized === true) {
        return next()
      }      
      
      if (!authorizationStore.data.authorized) {
        authorizationStore.getProfile(true).then(() => {
          return next()
        }).catch(() => {
          return next({
            name: "login",
          });
        })
      }

      
    } else {     
      return next()
    }
  })

  return router;
}



export default createAppRouter