<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import User, { validateName } from '../../types/User'

@Component({
  props: {
    value: {
      type: Object,
      required: true
    }
  }
})
export default class NameForm extends Vue {
  private value: User
  private name = this.value.name
  private error = ''

  private validateName() {
    this.error = validateName({
      ...this.value,
      name: this.name
    })
  }

  private get isValid() {
    return this.name !== '' && this.error === ''
  }

  private next() {
    if (!this.isValid) {
      return
    }

    this.$emit('input', {
      ...this.value,
      name: this.name
    })

    this.$emit('next')
  }
}
</script>

<template>
  <div>
    <label class="label">
      Who are you ?
    </label>
    <el-input
      type="text"
      v-model.trim="name"
      @input="validateName"
      @blur="validateName"
      @keyup.native.enter="next"
    />
    <p class="error">{{error}}</p>
    <el-button
      class="button"
      type="primary"
      @click="next"
      :disabled="!isValid"
    >
      Next
    </el-button>
  </div>
</template>

<style scoped>
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

  color: #f00;
}

.button {
  margin-top: 2em;
  float: right;
}
</style>
