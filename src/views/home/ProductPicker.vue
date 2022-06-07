<template>
  <p>行情类型 :</p>
  <el-select name="product" v-model="selProd" clearable @change="change" placeholder="Select">
    <el-option v-for="p in products" :key="p.label" :label="p.name" :value="p.label" />
  </el-select>
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
  console.log('isCategoryProd: ', isCategoryProd)

  if (isCategoryProd) {
    items.forEach((item) => {
      if (item.item_type == 1) {
        disData1.value.push(item)
      } else if (item.item_type == 2) {
        disData2.value.push(item)
      } else if (item.item_type == 0) {
        disData1.value.push(item)
        disData2.value.push(item)
      }
    })
  } else {
    items.forEach((item) => {
      disData1.value.push(item)
    })
  }
}
</script>
