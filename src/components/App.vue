<script>
export default {
  data () {
    return {
      name: 'John'
    }
  },
  metaInfo: {
    titleTemplate: '%s | Vue Element Admin Demo',
    title: 'Dashboard'
  }
}
</script>

<template>
  <div>
    <el-row>
      <el-col :span="4">
        <span class="empty"></span>
      </el-col>
      <el-col :span="16">
        <div class="content">
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
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.empty {
  display: block;
  height: 1px;
  width: 1px;
}

.alert {
  margin-bottom: 1em;
}
</style>
