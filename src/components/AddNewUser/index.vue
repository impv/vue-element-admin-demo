<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import User, { isValid, validateName, validatePassword } from '../../types/User'

import { AddUser } from '../../store/modules/users'

import FormItem from '../FormItem.vue'

@Component({
  components: { FormItem }
})
export default class AddNewUser extends Vue {
  private user: User = {
    name: '',
    password: ''
  }

  private errors: {[key: string]: string } = {
    name: '',
    password: ''
  }

  private get isValid(): boolean {
    return isValid(this.user)
  }

  private validateName() {
    this.errors.name = validateName(this.user)
  }

  private validatePassword() {
    this.errors.password = validatePassword(this.user)
  }

  private add() {
    this.$store.dispatch(AddUser, { user: this.user } as AddUser).then(() => {
      this.$router.push('/users')
    }).catch(err => {
      this.$message.error(err.message)
    })
  }
}
</script>

<template>
  <el-main>
    <el-form>
      <FormItem label="Name" :error="errors.name">
        <el-input
          v-model="user.name"
          @input="validateName"
          @blur="validateName"
          type="text"
        />
      </FormItem>
      <FormItem label="Password" :error="errors.password">
        <el-input
          v-model="user.password"
          @input="validatePassword"
          @blur="validatePassword"
          type="password"
        />
      </FormItem>
      <FormItem>
        <el-button type="primary" @click="add" :disabled="!isValid">
          Register
        </el-button>
      </FormItem>
    </el-form>
  </el-main>
</template>

<style scoped>
</style>
