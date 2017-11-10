import { RouteConfig } from 'vue-router'

import Dashboard from '../components/Dashboard.vue'
import Users from '../components/Users.vue'

const routes: RouteConfig[] = [
  {path: '/', component: Dashboard },
  {path: '/users', component: Users }
]

export default routes
