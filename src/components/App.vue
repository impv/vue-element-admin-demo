<script lang="ts">
/**
 * Application's root component
 */
import Vue from 'vue'
import Component from 'vue-class-component'

import { State } from '../store'
import { LoadLocalToken } from '../store/modules/token'

import Login from './Login.vue'
import Navbar from './Navbar.vue'

@Component({
  components: { Login, Navbar }
})
export default class App extends Vue {
  private isLoadingLocalToken = false

  private get isLoggedIn(): boolean {
    return !!(this.$store.state as State).token.token
  }

  public created() {
    this.loadLocalToken()
  }

  private loadLocalToken() {
    this.isLoadingLocalToken = true

    this.$store.dispatch(LoadLocalToken).then(() => {
      this.isLoadingLocalToken = false
    })
  }
}
</script>

<template>
  <transition name="login-fade" mode="out-in">
    <div v-if="isLoadingLocalToken" class="loading-token">
      <span>Loading...</span>
    </div>
    <Login v-else-if="!isLoggedIn"/>
    <div v-else>
      <el-row>
        <el-col :span="4">
          <Navbar/>
        </el-col>
        <el-col :span="20">
          <div class="main">
            <router-view></router-view>
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

.main {
  width: 100%;
  height: 100vh;

  overflow: auto;
}

.loading-token {
  display: block;
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  color: #333;
}
.loading-token > span {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
