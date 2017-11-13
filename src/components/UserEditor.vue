<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { State } from '../store'

import User, {
  validateAge,
  validateName,
  validatePassword
} from '../types/User'

@Component({
  props: {
    initialData: {
      type: Object,
      required: true
    }
  }
})
export default class UserEditor extends Vue {
  private initialData: User
  private item: User = this.initialData

  private errors = {
    name: '',
    password: '',
    age: ''
  }

  private get isLoading(): boolean {
    return !this.initialData
  }

  private get isValid(): boolean {
    return !this.errors.name &&
      !this.errors.password &&
      !this.errors.age
  }

  private submit() {
    this.$emit('submit', this.item)
  }

  private validateName() {
    const otherUsers = this.$store.getters.getUsersExpect(this.initialData)

    this.errors.name = validateName(this.item as User, otherUsers)
  }

  private validateAge() {
    this.errors.age = validateAge(this.item as User)
  }

  private validatePassword() {
    this.errors.password = validatePassword(this.item as User)
  }
}
</script>

<template>
  <el-main>
    <label class="label">Name</label>
    <el-input
      v-model.trim="item.name"
      @input="validateName"
      @blur="validateName"
    />
    <p class="error" :class="!errors.name && 'hidden'">{{errors.name}}</p>
    <label class="label">Age</label>
    <el-input-number
      v-model="item.age"
      :min="0"
      :max="150"
      :step="1"
      @input="validateAge"
      @blur="validateAge"
    />
    <p class="error" :class="!errors.age && 'hidden'">{{errors.age}}</p>
    <label class="label">Password</label>
    <el-input
      v-model="item.password"
      type="password"
      @input="validatePassword"
      @blur="validatePassword"
    />
    <p class="error" :class="!errors.password && 'hidden'">{{errors.password}}</p>
    <el-button
      @click="submit"
      type="primary"
      :disabled="!isValid"
    >
      Save
    </el-button>
  </el-main>
</template>

<style lang="scss" scoped>
@import "~scss/vars";

.label {
  display: block;
  margin-bottom: 0.5em;
  font-size: 0.9em;

  color: #777;
}

.error {
  font-size: 0.9em;
  height: 1em;

  color: $color-error;

  transition: opacity 0.1s;

  &.hidden {
    opacity: 0;
  }
}
</style>
