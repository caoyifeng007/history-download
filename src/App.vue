<template>
  <el-config-provider :locale="zhCn">
    <div class="p-4 min-h-screen bg-gray-50">
      <router-view />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { reactive, computed } from 'vue'
import { useHead } from '@vueuse/head'

const title = import.meta.env.VITE_APP_TITLE
const siteData = reactive({
  title,
  description: `DCE history download`,
})

useHead({
  // Can be static or computed
  title: computed(() => siteData.title),
  meta: [
    {
      name: `description`,
      content: computed(() => siteData.description),
    },
  ],
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
:root {
  --el-color-primary: #303133;
  color: var(--el-color-primary);
}
</style>
