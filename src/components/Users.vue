<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import User from '../types/User'

import { State } from '../store'
import { DeleteUser, GetUsers } from '../store/modules/users'

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

  private editItem(name: string) {
    this.$router.push(`/users/edit/${name}`)
  }

  private deleteItem(user: User) {
    this.$confirm('Are you sure to delete this user?', 'Confirm', {
      type: 'warning'
    }).then(() => {
      this.$store.dispatch(DeleteUser, { user } as DeleteUser).then(() => {
        this.$message.success('Deleted successfully')
      })
    })
  }
}
</script>

<template>
  <el-main>
    <p class="buttons">
      <router-link to="/users/new">
        <el-button
          type="primary"
        >
          New User
        </el-button>
      </router-link>
    </p>
    <el-alert
      v-if="users.length === 0"
      type="info"
      title="There are no users registered"
      show-icon
      :closable="false"
    />
    <el-table
      :data="users"
      border
      :header-row-style="{backgroundColor: '#fafafa'}"
    >
      <el-table-column
        prop="name"
        sortable
        label="Username"
      />
      <el-table-column
        prop="age"
        sortable
        label="Age"
      />
      <el-table-column
        label="Operations"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editItem(scope.row.name)"
          >
            Edit
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteItem(scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<style lang="scss">
</style>
