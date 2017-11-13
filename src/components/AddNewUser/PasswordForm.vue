<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import User, { validatePassword } from '../../types/User'

@Component({
  props: {
    value: {
      type: Object,
      required: true
    }
  }
})
export default class PasswordForm extends Vue {
  private value: User
  private password = ''
  private error = ''

  private validatePassword() {
    this.error = validatePassword({
      ...this.value,
      password: this.password
    })
  }

  private get isValid() {
    return this.password !== '' && this.error === ''
  }

  private next() {
    this.$emit('input', {
      ...this.value,
      password: this.password
    })

    this.$emit('next')
  }

  private prev() {
    this.$emit('prev')
  }
}
</script>

<template>
  <div>
    <label class="label">
      Please type your secret password.
    </label>
    <el-input
      type="password"
      v-model.trim="password"
      @input="validatePassword"
      @blur="validatePassword"
      @keyup.native.enter="next"
    />
    <p class="error">{{error}}</p>
    <p class="buttons">
      <el-button
        class="prev"
        @click="prev"
      >
        Prev
      </el-button>
      <el-button
        class="next"
        type="primary"
        @click="next"
        :disabled="!isValid"
      >
        Next
      </el-button>
    </p>
  </div>
</template>

<style scoped lang="scss">
@import "~scss/vars";

.label {
  display: block;
  font-size: 1.3em;
  margin-bottom: 1em;

  color: #666;

  font-weight: bold;
}

.error {
  height: 1em;
  font-size: 0.8em;

  color: $color-error;
}

.buttons {
  margin-top: 2em;
}

.next {
  float: right;
}
</style>
