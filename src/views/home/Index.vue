<template>
  <el-row>
    <TimeLv />
  </el-row>
  <el-divider />
  <el-row>
    <DatePicker />
    <ProductPicker />
  </el-row>
  <div class="m-t-50"></div>

  <el-row>
    <CategorySwitch />
  </el-row>
  <DataDisplay />
  <div class="m-t-50"></div>
  <el-divider />

  <el-row class="home-button">
    <el-button type="primary" @click="check">分表下载</el-button>
  </el-row>
</template>

<script setup lang="ts">
import TimeLv from '@/views/home/TimeLv.vue'
import DatePicker from '@/views/home/DatePicker.vue'
import ProductPicker from '@/views/home/ProductPicker.vue'
import DataDisplay from '@/views/home/DataDisplay.vue'
import CategorySwitch from '@/views/home/CategorySwitch.vue'

import router from '@/router'
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
    // router.push({ path: '/' })
  }
}
</script>

<style scoped>
.home-title {
  font-size: 20px;
  color: #333;
  font-weight: 700;
}
.m-l-10 {
  margin-left: 10px;
}
.m-l-20 {
  margin-left: 20px;
}
.m-t-20 {
  margin-top: 20px;
}
.m-t-50 {
  margin-top: 50px;
}
.m-l-40 {
  margin-left: 40px;
}
.m-l-21 {
  margin-left: 6%;
}
.d-f {
  display: flex;
}
.home-data-div {
  width: 615px;
}

.home-radio /deep/ .el-radio.is-bordered {
  background: #d8d8d8;
  color: #8f3132;
}
.home-radio /deep/ .el-radio.is-bordered.is-checked {
  background: #8f3132;
}
.home-radio /deep/ .el-radio__input.is-checked + .el-radio__label {
  color: #fff !important;
}
.home-radio /deep/ .el-radio__inner {
  border-radius: 0;
  width: 20px;
  height: 20px;
  border: none;
}
.home-radio /deep/ .el-radio__inner {
  background-color: transparent;
}
.home-radio /deep/ .el-radio__input.is-checked .el-radio__inner {
  background: #8f3132;
}
.home-radio /deep/ .el-radio__input.is-checked .el-radio__inner::after {
  background: #8f3132;
}
.home-radio /deep/ .el-radio {
  position: relative;
}
.home-radio /deep/ .el-icon {
  position: absolute;
  left: 9px;
}
.home-radio .el-radio.is-bordered.is-checked /deep/ .el-icon {
  color: #fff;
}
.home-data .el-date-editor--dates /deep/ .el-icon {
  margin-top: 8px;
}
.home-data /deep/ .el-range-editor.is-active {
  border-color: #8f3132;
}
.home-data /deep/ .el-input__inner:focus {
  border-color: #8f3132;
}
.home-data-type /deep/ .el-radio__input.is-checked + .el-radio__label {
  color: #8f3132;
}
.home-data-type .el-radio__input.is-checked /deep/ .el-radio__inner {
  border-color: #8f3132;
  background: #8f3132;
}

.home-futures /deep/ span {
  width: 225px;
  font-size: 20px;
  clip-path: polygon(0 0, 93% 0, 100% 100%, 0% 100%);
}
.home-option /deep/ span {
  width: 240px;
  font-size: 20px;
  clip-path: polygon(0 0, 93% 0, 100% 100%, 7% 100%);
  margin-left: -12px;
}
.home-futures-or-option /deep/ .el-radio-button__original-radio:checked + .el-radio-button__inner {
  color: #fff;
  background: #8f3132;
}
.home-futures-or-option .el-radio-button /deep/ .el-radio-button__inner {
  color: #000;
  background: #d8d8d8;
}
.home-datas /deep/ .datas {
  width: 226px !important;
  text-align: center;
  display: block;
  line-height: 38px;
  height: 38px;
  color: #fff;
  background: #cc8586;
}
.home-button /deep/ .el-button {
  background: #8f3132;
  color: #fff;
}
.home-datas /deep/ .datas {
  border: 1px solid #fff;
}
.datas .el-checkbox__input.is-checked /deep/ .el-checkbox__inner {
  background-color: #fff;
  border-color: #8f3132;
}
.datas /deep/ .el-checkbox__inner::after {
  border-color: #8f3132;
}
.home-datas /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #fff;
}
.home-datas /deep/ .is-checked {
  background-color: #8f3132;
}
</style>
