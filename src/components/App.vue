<script lang="ts">
/**
 * Application's root component
 */
import Vue from 'vue'
import Component from 'vue-class-component'

import {State} from '../store'

import Login from './Login.vue'
import Navbar from './Navbar.vue'

@Component({
  components: {Login, Navbar}
})
export default class App extends Vue {
  name = 'John'

  get isLoggedIn (): boolean {
    return !!(this.$store.state as State).token.token
  }
}
</script>

<template>
  <transition name="login-fade" mode="out-in">
    <Login v-if="!isLoggedIn"/>
    <div v-else>
      <el-row>
        <el-col :span="4">
          <Navbar/>
        </el-col>
        <el-col :span="20">
          <div class="main">
            <el-main>
              <el-card>
                <el-alert
                  class="alert"
                  type="info"
                  :title="`Hello, ${name}!`"
                  :closable="false"
                />
                <el-input
                  v-model="name"
                />
              </el-card>
            </el-main>
          </div>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>

<style scoped>
.login-fade-enter-active, .login-fade-leave-active {
  transition: opacity 0.5s;
}

.login-fade-enter, .login-fade-leave {
  opacity: 0;
}

.empty {
  display: block;
  height: 1px;
  width: 1px;
}

.alert {
  margin-bottom: 1em;
}

.main {
  width: 100%;
  height: 100vh;

  overflow: auto;
}
</style>
