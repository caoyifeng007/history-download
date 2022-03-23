<template>
  <el-row :gutter="20" justify="center" align="middle">
    <el-col :span="2">
      <span class="indicator">席位号</span>
    </el-col>

    <el-col :span="6">
      <el-input v-model="account" placeholder="请输入席位号" maxlength="10" show-word-limit />
    </el-col>
  </el-row>

  <el-row :gutter="20" justify="center" align="middle">
    <el-col :span="2">
      <span class="indicator">密码</span>
    </el-col>

    <el-col :span="6">
      <el-input v-model="password" placeholder="请输入密码" type="password" show-password />
    </el-col>
  </el-row>

  <el-row justify="center" align="middle">
    <el-col>
      <el-button type="primary" @click="login">登录</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'

import axIns from '@/request'
import type { ILoginResp } from '@/request'
import toast from '@/util/message'
import { useResetDatas } from '@/util/resetDatas'
import { localToken, datas } from '@/stores/globalDatas'

useResetDatas()
const account = ref('')
const password = ref('')

async function login() {
  const res = await axIns.post<ILoginResp>('/login', {
    account: account.value,
    password: password.value,
  })

  const { validate, token, data, error } = res

  if (validate != 'ok') {
    let msg = ''
    for (let k in error) {
      msg += error[k]
    }
    toast.error(msg)
    return
  }

  if (token) {
    localToken.value = token
  }

  console.log('服务端返回数据: ', data)
  datas.value = data

  router.push({ path: '/home' })
}
</script>

<style scoped>
.indicator {
  display: inline-block;
  text-align: right;
  width: 100%;
}
.el-col {
  border-radius: 4px;
}
.el-input /deep/ .el-input__suffix {
  align-items: center;
}
.el-row {
  margin-bottom: 20px;
}
</style>
