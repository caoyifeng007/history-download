<template>
  <div class="flex items-center">
    <p class="mr-4">行情类型 :</p>
    <el-select name="product" v-model="selProd" clearable @change="change" placeholder="请选择">
      <el-option v-for="p in products" :key="p.FCode" :label="p.FValue" :value="p.FCode" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHqyStore } from '@/stores/modules/app'
import axIns from '@/request'
import { type IItemResp } from '@/request'

const { isCategoryProd, timeLevel, products, selProd, disData1, disData2 } = storeToRefs(
  useHqyStore()
)

const change = async () => {
  disData1.value = []
  disData2.value = []

  const itemResp = await axIns.get<IItemResp>('/items', {
    params: {
      timelv: timeLevel.value,
      product: selProd.value,
    },
  })

  console.log('itemResp: ', itemResp)
  if (itemResp == null) {
    return
  }
  const items = itemResp.items

  console.log(items)

  for (const item of items.Data) {
    if (isCategoryProd.value) {
      if (item.VarietyType == 1) {
        disData1.value.push(item)
      } else if (item.VarietyType == 2) {
        disData2.value.push(item)
      }
    } else {
      disData1.value.push(item)
    }
  }
}
</script>
