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
  <Login v-if="!isLoggedIn"/>
  <div v-else>
    <el-row>
      <el-col :span="4">
        <Navbar/>
      </el-col>
      <el-col :span="20">
        <div class="content">
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
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.empty {
  display: block;
  height: 1px;
  width: 1px;
}

.alert {
  margin-bottom: 1em;
}

.content {
  height: 100vh;
  width: 100%;
  overflow: auto;
}
</style>
