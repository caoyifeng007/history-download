<template>
  <p class="home-title">数据类型 :</p>
  <el-radio-group v-model="values.timeLevel" name="timeLevel" @change="timelvChange">
    <template v-for="lv in timelvs" :key="lv.TimelvLabel">
      <el-radio :label="lv.label" size="default" border> {{ lv.name }}</el-radio>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
import { timelvs } from '@/stores/globalDatas'
import { type IProductResp } from '@/request'
import axIns from '@/request'

import { useDownloadValidate } from '@/hooks/useValidate'
import { storeToRefs } from 'pinia'
import { useHqyStore } from '@/stores/modules/app'

const { products, selProd } = storeToRefs(useHqyStore())
const { values } = useDownloadValidate()

async function timelvChange() {
  selProd.value = ''

  console.log('timelv is : ', values.timeLevel)
  const productsResp = await axIns.get<IProductResp>('/products', {
    params: {
      timelv: values.timeLevel,
    },
  })
  console.log(productsResp)
  products.value = productsResp.products
}
</script>
