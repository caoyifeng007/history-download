<template>
  <el-row :gutter="20" justify="center" align="middle">
    <el-col :span="2">
      <span class="indicator">席位号</span>
    </el-col>

    <el-col :span="4" class="col-parent">
      <el-input name="account" v-model="account" placeholder="请输入席位号" />
      <span class="warn">{{ accountError }}</span>
    </el-col>
  </el-row>

  <el-row :gutter="20" justify="center" align="middle">
    <el-col :span="2">
      <span class="indicator">密码</span>
    </el-col>

    <el-col :span="4" class="col-parent">
      <el-input
        name="password"
        v-model="password"
        placeholder="请输入密码"
        type="password"
        show-password
      />
      <span class="warn">{{ passwordError }}</span>
    </el-col>
  </el-row>

  <el-row justify="center" align="middle">
    <el-col :span="2">
      <el-button type="primary" @click="check">登录</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import router from '@/router'

import axIns from '@/request'
import type { ILoginResp } from '@/request'

import toast from '@/hooks/useNotification'
import { useResetDatas } from '@/hooks/useResetDatas'
import { useLoginValidate } from '@/hooks/useValidate'

import { localToken, datas } from '@/stores/globalDatas'

import { setToken } from '@/util/auth'

useResetDatas()
const { loginSchema, account, accountError, password, passwordError } = useLoginValidate()

async function login() {
  const loginRes = await axIns.post<ILoginResp>('/login', {
    accountid: account.value,
    password: password.value,
  })

  if (loginRes.validate != 'ok') {
    // let msg = ''
    // for (let k in error) {
    //   msg += error[k]
    // }
    toast.error(loginRes.error)
    return
  }

  if (loginRes.token) {
    setToken(loginRes.token)
  }

  const timelvRes = await axIns.get<ITimelvResp>('/timelv')

  console.log('服务端返回的timelvs: ', timelvRes.timelvs)
  timelvs.value = timelvRes.timelvs

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

<style scoped>
.indicator {
  display: inline-block;
  text-align: right;
  width: 100%;
}
.el-col {
  border-radius: 4px;
}
.col-parent {
  position: relative;
}
.warn {
  top: 110%;
  color: red;
  left: 14px;
  position: absolute;
}
.el-row {
  margin-bottom: 40px;
}
</style>
