<template>
  <span class="indicator">席位号</span>

  <el-input name="account" v-model="account" placeholder="请输入席位号" />
  <span class="warn">{{ accountError }}</span>

  <span class="indicator">密码</span>

  <el-input
    name="password"
    v-model="password"
    placeholder="请输入密码"
    type="password"
    show-password
  />
  <span class="warn">{{ passwordError }}</span>
  <el-button type="primary" @click="check">登录</el-button>
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
