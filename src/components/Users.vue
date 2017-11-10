<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import User from '../types/User'

import { State } from '../store'
import { GetUsers } from '../store/modules/users'

@Component
export default class Users extends Vue {
  private isLoading = false

  private get users(): User[] {
    return (this.$store.state as State).users.users
  }

  public created() {
    this.isLoading = true

    this.$store.dispatch(GetUsers).then(() => {
      this.isLoading = false
    }).catch(err => {
      this.$message.error(`Failed to load users: ${err.message}`)
    })
  }
}
</script>

<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.name">{{user}}</li>
    </ul>
  </div>
</template>

<style scoped>

</style>
