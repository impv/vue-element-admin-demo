declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue-meta' {
  import Vue, { PluginObject } from 'vue'

  export default {} as PluginObject<{}>
}
