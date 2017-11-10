<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import User, { isValid, validatePassword } from '../../types/User'

import { AddUser } from '../../store/modules/users'

import NameForm from './NameForm.vue'
import PasswordForm from './PasswordForm.vue'

@Component({
  components: { NameForm, PasswordForm }
})
export default class AddNewUser extends Vue {
  private currentStep = 1

  private user: User = {
    name: '',
    password: ''
  }

  private get isValid(): boolean {
    return isValid(this.user)
  }

  private add() {
    this.$store.dispatch(AddUser, { user: this.user } as AddUser).then(() => {
      this.$router.push('/users')
    }).catch(err => {
      this.$message.error(err.message)
    })
  }

  private nextStep() {
    this.currentStep += 1
  }

  private prevStep() {
    this.currentStep -= 1
  }
}
</script>

<template>
  <el-row>
    <el-col :span="2">
      <div class="empty"></div>
    </el-col>
    <el-col :span="20" class="main">
      <el-steps
        class="steps"
        :active="currentStep - 1"
        finish-status="success"
        simple
      >
        <el-step title="Step 1"/>
        <el-step title="Step 2"/>
      </el-steps>
      <el-col :span="4">
        <div class="empty"></div>
      </el-col>
      <el-col :span="16">
        <NameForm
          v-model="user"
          v-if="currentStep === 1"
          @next="nextStep"
        />
        <PasswordForm
          v-model="user"
          v-if="currentStep === 2"
          @prev="prevStep"
          @next="add"
        />
      </el-col>
    </el-col>
  </el-row>
</template>

<style scoped>
.empty {
  height: 1px;
}

.main {
  height: 100vh;
  box-sizing: border-box;
  padding: 2em;
}

.steps {
  margin-bottom: 5em;
}
</style>
