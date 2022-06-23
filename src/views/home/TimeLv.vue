<template>
  <div class="border-b-2 divide-gray-500 flex items-center m-8 p-8 flex-wrap">
    <p class="mr-4">数据类型 :</p>
    <el-radio-group v-model="values.timeLevel" name="timeLevel" @change="timelvChange">
      <template v-for="lv in timelvs" :key="lv.TimelvLabel">
        <el-radio :label="lv.FCode" border>
          {{ lv.FValue }}
        </el-radio>
      </template>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { timelvs } from '@/stores/globalDatas'
import { type IProductResp } from '@/request'
import axIns from '@/request'

import { useDownloadValidate } from '@/hooks/useValidate'
import { storeToRefs } from 'pinia'
import { useHqyStore } from '@/stores/modules/app'

const { products, selProd, disData1, disData2 } = storeToRefs(useHqyStore())
const { values } = useDownloadValidate()

async function timelvChange() {
  disData1.value = []
  disData2.value = []
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

<style scoped lang="less">
.el-radio {
  @apply w-32 h-8 p-0 flex items-center justify-center font-serif;
  &.is-checked {
    @apply bg-black border-gray-500;
    :deep(.el-radio__label) {
      @apply text-white;
    }
  }
  :deep(.el-radio__label) {
    @apply pl-0;
  }
  :deep(.el-radio__input) {
    @apply hidden;
  }
}
</style>
