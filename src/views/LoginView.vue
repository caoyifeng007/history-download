<template>
  <el-row justify="center" align="middle">
    <el-col :span="2" class="indicate-bar">
      <span class="right-text">席位号</span>
    </el-col>

    <el-col :span="6">
      <el-input v-model="account" placeholder="请输入席位号" maxlength="10" show-word-limit
    /></el-col>
  </el-row>

  <el-row justify="center" align="middle">
    <el-col :span="2" class="indicate-bar">
      <span class="right-text">密码</span>
    </el-col>

    <el-col :span="6">
      <el-input v-model="password" placeholder="请输入密码" type="password" show-password />
    </el-col>
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

import cacheUtil from '@/util/cache'
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

  const { validate, token, data } = res
  if (validate != 'ok') {
    console.log('账号密码有误')
    return
  }

  cacheUtil.setCache('token', token)

  hqyStore.displayDataInit(data)

  router.push({ path: '/home' })
}
</script>

<style scoped>
/* .indicate-bar {
  width: 5%;
} */
.right-text {
  text-align: right;
  width: 5%;
}
.el-col {
  border-radius: 4px;
}

.el-row {
  margin-bottom: 20px;
}
/* .el-row {
  height: 100%;
} */
</style>
