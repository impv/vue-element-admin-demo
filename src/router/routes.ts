import { RouteConfig } from 'vue-router'

import AddNewUser from '../components/AddNewUser/index.vue'
import Dashboard from '../components/Dashboard.vue'
import Users from '../components/Users.vue'

const routes: RouteConfig[] = [
  { path: '/', component: Dashboard },
  { path: '/users', component: Users },
  { path: '/users/new', component: AddNewUser }
]

export default routes
