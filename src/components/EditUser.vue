<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import User from '../types/User'

import { GetUsers, UpdateUser } from '../store/modules/users'

import UserEditor from './UserEditor.vue'

@Component({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  components: { UserEditor }
})
export default class EditUser extends Vue {
  private name: string

  private get user(): User {
    return this.$store.getters.getUserByName(this.name)
  }

  public created() {
    this.$store.dispatch(GetUsers)
  }

  private updateUser(user: User): void {
    const payload: UpdateUser = {
      name: this.name,
      user: this.user
    }

    this.$store.dispatch(UpdateUser, payload).then(() => {
      this.$message.success('Update successfully')

      this.$router.push('/users')
    }).catch(err => {
      this.$message.error('Failed to update user')
    })
  }
}
</script>

<template>
  <el-main
    v-if="!user"
    v-loading="true"
  />
  <UserEditor
    v-else
    :initialData="user"
    @submit="updateUser"
  />
</template>

<style lang="scss" scoped>
</style>
