<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Dashboard extends Vue {
  private name = 'John'
}
</script>

<template>
 <el-main>
   <el-card>
     <el-alert
       class="alert"
       type="info"
       :title="`Hello, ${name}!`"
       :closable="false"
     />
     <el-input
       v-model="name"
     />
   </el-card>
 </el-main>
</template>

<style scoped>
.alert {
  margin-bottom: 1em;
}
</style>
