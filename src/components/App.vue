<script lang="ts">
/**
 * Application's root component
 */
import Vue from 'vue'
import Component from 'vue-class-component'

import {State} from '../store'

import Login from './Login.vue'

@Component({
  components: {Login},
})
export default class App extends Vue {
  private name = 'John'

  private get isLoggedIn(): boolean {
    return !!(this.$store.state as State).token.token
  }
}
</script>

<template>
  <Login v-if="!isLoggedIn"/>
  <div v-else>
    <el-row>
      <el-col :span="4">
        <span class="empty"></span>
      </el-col>
      <el-col :span="16">
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
</style>
