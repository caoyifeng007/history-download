<template>
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
import { ref } from 'vue'
import router from '@/router'

import { useHqyStore } from '@/stores'
import axIns from '@/request'
import type { ILoginResp } from '@/request'

const account = ref('')
const password = ref('')

const hqyStore = useHqyStore()

async function login() {
  const res = await axIns.post<ILoginResp>('/login', {
    account: account.value,
    password: password.value,
  })

  if (res.validate != 'ok') {
    console.log('账号密码有误')
    return
  }

  hqyStore.displayDataInit(res)

  router.push({ path: '/home' })
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
