<template>
  <form @submit="onSubmit">
    <el-row :gutter="20" justify="center" align="middle">
      <el-col :span="2">
        <span class="indicator">席位号</span>
      </el-col>

      <el-col :span="6" class="col-parent">
        <el-input name="account" v-model="account" placeholder="请输入席位号" />
        <span class="warn">{{ accountError }}</span>
      </el-col>
    </el-row>

    <el-row :gutter="20" justify="center" align="middle">
      <el-col :span="2">
        <span class="indicator">密码</span>
      </el-col>

      <el-col :span="6" class="col-parent">
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
      <el-col :span="1">
        <!-- <input type="submit" value="登录" /> -->
        <el-button>
          <input type="submit" />
        </el-button>
      </el-col>
    </el-row>
  </form>
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
const { account, accountError, password, passwordError, handleSubmit } = useLoginValidate()

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

const onSubmit = handleSubmit(login)
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
