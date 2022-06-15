<template>
  <div class="mx-auto p-16">
    <TimeLv />

    <div class="flex p-8 m-8 mb-0">
      <DatePicker class="mr-48" />
      <ProductPicker />
    </div>

    <div class="p-8 m-8 mt-0">
      <CategorySwitch />
      <DataDisplay />
    </div>

    <div class="p-8 m-8">
      <el-button type="primary" @click="check">分表下载</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import TimeLv from '@/views/home/TimeLv.vue'
import DatePicker from '@/views/home/DatePicker.vue'
import ProductPicker from '@/views/home/ProductPicker.vue'
import DataDisplay from '@/views/home/DataDisplay.vue'
import CategorySwitch from '@/views/home/CategorySwitch.vue'

import { storeToRefs } from 'pinia'
import { useHqyStore } from '@/stores/modules/app'
import 'element-plus/es/components/message/style/css'
import Qs from 'qs'

import axIns from '@/request'
import { type IDataResp } from '@/request'

import toast from '@/hooks/useNotification'

const { timeLevel, date, rangePicker, selData1, selData2, selProd, isCategoryProd } = storeToRefs(
  useHqyStore()
)

async function check() {
  if (timeLevel.value == '') {
    toast.warning('请选择时间维度')
    return
  }
  if (!date.value || date.value.length == 0) {
    toast.warning('请选择日期')
    return
  }

  if (isCategoryProd) {
    if (selData1.value.length <= 0 && selData2.value.length <= 0) {
      toast.warning('请选择品种')
      return
    }
  } else {
    if (selData1.value.length <= 0) {
      toast.warning('请选择品种')
      return
    }
  }

  download()
}

async function download() {
  let selDatas
  if (!isCategoryProd.value) {
    selDatas = {
      items: selData1.value,
    }
  } else {
    selDatas = {
      ftr: selData1.value,
      opt: selData2.value,
    }
  }
  const res = await axIns.get<IDataResp>('/download', {
    params: {
      timeLevel: timeLevel.value,
      date: date.value,
      rangePicker: rangePicker,
      product: selProd.value,
      ...selDatas,
    },
    paramsSerializer: function (params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    },
  })

  const { validate, dUrl, error } = res

  if (validate == 'ok') {
    console.log('response data is', dUrl)

    if (!dUrl) {
      return
    }
    const formNode = document.createElement('form')
    formNode.setAttribute('action', dUrl)

    document.body.appendChild(formNode)
    formNode.submit()
  } else {
    toast.error(error)
  }
}
</script>
