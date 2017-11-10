<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import User, { validateAge } from '../../types/User'

@Component({
  props: {
    value: {
      type: Object,
      required: true
    }
  }
})
export default class AgeForm extends Vue {
  private value: User
  private age = this.value.age
  private name = this.value.name
  private error = ''

  private validateAge() {
    this.error = validateAge({
      ...this.value,
      age: this.age
    })
  }

  private get isValid() {
    return this.error === ''
  }

  private next() {
    this.$emit('input', {
      ...this.value,
      age: this.age
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
      Hi, {{name}}. How old are you ?
    </label>
    <el-input
      type="number"
      v-model.trim="age"
      @input="validateAge"
      @blur="validateAge"
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

.buttons {
  margin-top: 2em;
}

.next {
  float: right;
}
</style>
