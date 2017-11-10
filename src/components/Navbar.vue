<script lang="ts">
/**
 * Navbar component
 */
import Vue from 'vue'
import Component from 'vue-class-component'

import { ClearToken } from '../store/modules/token'

@Component
export default class Navbar extends Vue {
  private logout(): void {
    this.$store.dispatch(ClearToken).then(() => {
      this.$message.info('Logged out')
    })
  }
}
</script>

<template>
  <el-menu
    class="menu"
    background-color="#1F218B"
    text-color="#fff"
    router
  >
    <el-menu-item index="/">Dashboard</el-menu-item>
    <el-submenu index="">
      <template slot="title">
        <span>User</span>
      </template>
      <el-menu-item index="/users">List</el-menu-item>
      <el-menu-item index="/users/new">Register</el-menu-item>
    </el-submenu>
    <el-menu-item index="" @click="logout">Logout</el-menu-item>
  </el-menu>
</template>

<style scoped>
.menu {
  height: 100vh;
}
</style>
