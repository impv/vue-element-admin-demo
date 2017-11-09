<script lang="ts">
/**
 * Login component
 */
import ElementUI from 'element-ui'
import Vue from 'vue'
import Component from 'vue-class-component'

import {ObtainToken} from '../store/modules/token'

@Component
export default class Login extends Vue {
  private username = ''
  private password = ''
  private isLoading = false

  private get isAbleToLogin(): boolean {
    return this.username !== '' && this.password !== ''
  }

  private login(): void {
    if (!this.isAbleToLogin) {
      return
    }

    const { username, password } = this

    this.isLoading = true

    this.$store.dispatch(ObtainToken, { username, password }).then(() => {
      this.$message.success('ログインしました')
    }).catch(err => {
      this.$message.error(err.message)

      this.isLoading = false
    })
  }
}
</script>

<template>
  <el-row>
    <el-col :xs="2" :sm="6" :md="8" :lg="9">
      <div class="empty"></div>
    </el-col>
    <el-col :xs="20" :sm="12" :md="8" :lg="6">
      <div class="login-col">
        <div class="login-panel">
          <h1 class="title">VueElementAdminDemo</h1>
          <el-input
            v-model.trim="username"
            @keyup.enter.native="login"
            :disabled="isLoading"
            class="input"
            type="text"
          >
            <template slot="prepend">ユーザ名</template>
          </el-input>
          <el-input
            v-model.trim="password"
            @keyup.enter.native="login"
            :disabled="isLoading"
            class="input"
            type="password"
          >
            <template slot="prepend">パスワード</template>
          </el-input>
          <el-button
            :disabled="!isAbleToLogin"
            :loading="isLoading"
            @click="login"
            class="login"
            type="primary"
          >
            ログイン
          </el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.title {
  font-family: 'Josefin Sans';
  font-size: 1.4em;
  margin-bottom: 1em;
}

.empty {
  height: 1px;
  width: 1px;
}

.login-col {
  position: relative;
  height: 100vh;
}

.login-panel {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  padding: 1em;
  text-align: center;
  width: 100%;

  border: 1px solid #ccc;
  border-radius: 5px;
}

.login {
  margin-top: 1em;
}

.input {
  margin-bottom: 1em;
}
</style>
