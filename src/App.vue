<template>
  <el-config-provider :locale="zhCn">
    <el-container>
      <el-header>{{ title }}</el-header>
      <el-main>
        <router-view />
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const title = import.meta.env.VITE_APP_TITLE
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
