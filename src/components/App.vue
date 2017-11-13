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
            <transition name="page" mode="out-in">
              <router-view :key="this.$router.path"></router-view>
            </transition>
          </div>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@import "~scss/mixins";

.login-fade {
  @include fade(0.5s);
}

.page {
  @include fade();
}

.empty {
  display: block;
  height: 1px;
  width: 1px;
}

.main {
  position: relative;
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
  @include centering();
}
</style>
