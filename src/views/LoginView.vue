<template>
  <div class="max-w-screen-xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
    <div class="max-w-screen-lg mx-auto flex space-x-4">
      <span class="w-1/5">席位号</span>
      <div class="rounded-lg w-4/5">
        <el-input name="account" v-model="account" placeholder="请输入席位号" />
        <span>{{ accountError }}</span>
      </div>
    </div>

    <div class="flex">
      <span>密码</span>
      <el-input
        name="password"
        v-model="password"
        placeholder="请输入密码"
        type="password"
        show-password
      />
      <span>{{ passwordError }}</span>
    </div>
    <el-button type="primary" @click="check">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

import axIns from '@/request'
import type { ILoginResp } from '@/request'

import toast from '@/hooks/useNotification'
import { useResetDatas } from '@/hooks/useResetDatas'
import { useLoginValidate } from '@/hooks/useValidate'

import { localToken, datas } from '@/stores/globalDatas'

useResetDatas()
const { loginSchema, account, accountError, password, passwordError } = useLoginValidate()

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

function check() {
  loginSchema
    .validate({
      account: account.value,
      password: password.value,
    })
    .then(() => {
      login()
    })
}
</script>
