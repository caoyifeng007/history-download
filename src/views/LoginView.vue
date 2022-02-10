<template>
  <el-icon :size="20">
    <edit></edit>
    <aim />
  </el-icon>
  <el-row justify="center" align="middle">
    <el-col :xs="22" :sm="22" :md="22" :lg="6" :xl="6">
      <el-input
        v-model="account"
        placeholder="请输入席位号"
        maxlength="10"
        show-word-limit
        clearable
    /></el-col>
  </el-row>

  <el-row justify="center" align="middle">
    <el-col :xs="22" :sm="22" :md="22" :lg="6" :xl="6">
      <el-input
        v-model="password"
        placeholder="请输入密码"
        maxlength="10"
        type="password"
        show-password
        clearable
    /></el-col>
  </el-row>

  <el-row justify="center" align="middle">
    <el-col>
      <el-button type="primary" @click="login">登录</el-button>
    </el-col></el-row
  >
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import router from '@/router'

import axIns from '@/request/index'

let account = ref('')

let password = ref('')

// let msg = ref('')
// onMounted(() => {
//   axIns.get('/ping').then((res) => {
//     msg.value = res.data
//   })
// })

const login = () => {
  axIns.get('/login').then((res) => {
    if (res.data.validate == 'ok') {
      console.log('login success.')

      router.push({ path: '/home' })
    }
  })
}
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}

.el-row {
  margin-bottom: 20px;
}
</style>
