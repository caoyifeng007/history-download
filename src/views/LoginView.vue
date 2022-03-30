<template>
  <div class="max-w-md mt-32 mx-auto bg-white p-8 rounded-xl shadow-2xl space-y-6">
    <div class="justify-center items-center flex flex-row space-x-4">
      <span class="text-right w-1/6">席位号</span>
      <div class="rounded-lg w-3/5 relative">
        <el-input class="" name="account" v-model="account" placeholder="请输入席位号" />
        <span class="text-red-500 font-bold absolute -bottom-6 left-0">{{ accountError }}</span>
      </div>
    </div>

    <div class="justify-center items-center flex flex-row space-x-4">
      <span class="text-right w-1/6">密码</span>
      <div class="rounded-lg w-3/5 relative">
        <el-input
          class="rounded-lg"
          name="password"
          v-model="password"
          placeholder="请输入密码"
          type="password"
          show-password
        />
        <span class="text-red-500 font-bold absolute -bottom-6 left-0">{{ passwordError }}</span>
      </div>
    </div>

    <el-button
      class="mx-auto bg-black py-2 px-5 text-white block rounded-lg transform hover:scale-110 hover:bg-blue-400 transition"
      @click="check"
    >
      登录</el-button
    >
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
