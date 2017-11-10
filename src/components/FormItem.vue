<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    error: String,
    label: String
  }
})
export default class FormItem extends Vue {}
</script>

<template>
  <el-form-item :label="label" :class="error ? 'is-error' : ''">
    <slot/>
    <p v-if="error" class="error">{{error}}</p>
  </el-form-item>
</template>

<style scoped>
.error {
  margin-bottom: 0;
  font-size: 0.9em;
  line-height: 1.1em;
  color: #fa5555;
}
</style>
