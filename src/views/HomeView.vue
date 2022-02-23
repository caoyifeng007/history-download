<template>
  <el-row>
    <p class="home-title">数据类型 :</p>
    <el-radio-group v-model="timeLevel" class="home-radio m-l-20">
      <el-radio :label="TimeLevels.DayLevel" size="default" border class="home-day">
        <el-icon :size="20"> <Finished /> </el-icon>日终历史数据</el-radio
      >
      <el-radio :label="TimeLevels.SnapLevel" size="default" border class="home-snap">
        <el-icon :size="20"> <Camera /> </el-icon>快照历史数据</el-radio
      >
      <el-radio :label="TimeLevels.MinuteLevel" size="default" border class="home-minute"
        ><el-icon :size="20"> <Edit /> </el-icon>分钟历史数据</el-radio
      >
    </el-radio-group>
  </el-row>
  <el-divider />
  <el-row>
    <div class="home-data-div d-f">
      <p class="home-title">下载日期 :</p>
      <div class="m-l-20 m-t-20 home-data" v-show="!rangePicker">
        <el-date-picker
          key="day"
          v-model="date"
          type="dates"
          placeholder="请选择日期"
          value-format="YYYY/MM/DD"
          :disabled-date="disabledDate"
        />
      </div>
      <div class="m-l-20 m-t-20 home-data" v-show="rangePicker">
        <el-date-picker
          style="width: 500px"
          key="minute"
          v-model="date"
          type="daterange"
          format="YYYY-MM-DD"
          value-format="YYYY/MM/DD"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :disabled-date="disabledDate"
        />
      </div>
    </div>
    <el-radio-group v-model="rangePicker" class="m-l-40 home-data-type">
      <el-radio :label="true" size="small" @click="date = ''">范围日期</el-radio>
      <el-radio :label="false" size="small" @click="date = ''">特定日期</el-radio>
    </el-radio-group>

    <p class="home-title m-l-21">行情类型 :</p>
    <el-select v-model="product" clearable placeholder="Select" class="m-t-20 m-l-10">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-row>
  <div class="m-t-50"></div>
  <el-row>
    <el-radio-group
      v-show="product == Products.Basic || product == Products.Deep || product == Products.Day"
      v-model="category"
      class="home-futures-or-option"
    >
      <el-radio-button label="期货" size="large" class="home-futures">期货</el-radio-button>
      <el-radio-button label="期权" size="large" class="home-option">期权</el-radio-button>
    </el-radio-group>
  </el-row>
  <el-row>
    <el-checkbox-group v-model="selectedDatas" class="home-datas">
      <el-space wrap :size="0">
        <template v-for="data in displayDatas">
          <el-checkbox
            v-if="category == data.category || data.category == 'none'"
            style="width: 9rem"
            class="datas"
            checked
            :key="data.item"
            :label="data.item"
          >
            {{ data.item }}
          </el-checkbox>
        </template>
      </el-space>
    </el-checkbox-group>
  </el-row>
  <div class="m-t-50"></div>
  <el-divider />

  <el-row class="home-button">
    <el-button type="primary" @click="download">分表下载</el-button>
  </el-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Edit, Camera, Finished } from '@element-plus/icons-vue'

import axIns from '@/request'
import type { IDataResp } from '@/request'

import { useDatePicker } from '@/hooks/useDatePicker'
import { useDataSources } from '@/hooks/useDataSources'
import { useDisplayDatas } from '@/hooks/useDisplayDatas'
import { TimeLevels } from '@/commons/enums'

import { useHqyStore } from '@/stores'

const hqyStore = useHqyStore()
const { timeLevel, date, rangePicker, product, category, selectedDatas } = storeToRefs(hqyStore)

const { disabledDate } = useDatePicker()

const { options, Products } = useDataSources(timeLevel, product)

const { displayDatas } = useDisplayDatas(product)

const download = () => {
  let reqParams
  if (rangePicker.value) {
    reqParams = {
      picker: 'minutePicker',
    }
  } else {
    reqParams = {
      picker: 'dayPicker',
    }
  }
  axIns
    .get<IDataResp>('/download', {
      params: reqParams,
    })
    .then((res) => {
      if (res.validate == 'ok') {
        console.log('response data is', res.durl)

        const formNode = document.createElement('form')
        formNode.setAttribute('action', res.durl)

        document.body.appendChild(formNode)
        formNode.submit()
      }
    })
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
</style>
<style>
.home-radio .el-radio.is-bordered {
  background: #d8d8d8;
  color: #8f3132;
}
.home-radio .el-radio.is-bordered.is-checked {
  background: #8f3132;
}
.home-radio .el-radio__input.is-checked + .el-radio__label {
  color: #fff !important;
}
.home-radio .el-radio__inner {
  border-radius: 0;
  width: 20px;
  height: 20px;
  border: none;
}
.home-radio .el-radio__inner {
  background-color: transparent;
}
.home-radio .el-radio__input.is-checked .el-radio__inner {
  background: #8f3132;
}
.home-radio .el-radio__input.is-checked .el-radio__inner::after {
  background: #8f3132;
}
.home-radio .el-radio {
  position: relative;
}
.home-radio .el-icon {
  position: absolute;
  left: 9px;
}
.home-radio .el-radio.is-bordered.is-checked .el-icon {
  color: #fff;
}
.home-data .el-date-editor--dates .el-icon {
  margin-top: 8px;
}
.home-data .el-range-editor.is-active {
  border-color: #8f3132;
}
.home-data .el-input__inner:focus {
  border-color: #8f3132;
}
.home-data-type .el-radio__input.is-checked + .el-radio__label {
  color: #8f3132;
}
.home-data-type .el-radio__input.is-checked .el-radio__inner {
  border-color: #8f3132;
  background: #8f3132;
}

.home-futures span {
  width: 225px;
  font-size: 20px;
  clip-path: polygon(0 0, 93% 0, 100% 100%, 0% 100%);
}
.home-option span {
  width: 240px;
  font-size: 20px;
  clip-path: polygon(0 0, 93% 0, 100% 100%, 7% 100%);
  margin-left: -12px;
}
.home-futures-or-option .el-radio-button__original-radio:checked + .el-radio-button__inner {
  color: #fff;
  background: #8f3132;
}
.home-futures-or-option .el-radio-button .el-radio-button__inner {
  color: #000;
  background: #d8d8d8;
}
.home-datas .datas {
  width: 226px !important;
  text-align: center;
  display: block;
  line-height: 38px;
  height: 38px;
  color: #fff;
  background: #cc8586;
}
.home-button .el-button {
  background: #8f3132;
  color: #fff;
}
.home-datas .datas {
  border: 1px solid #fff;
}
.datas .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #fff;
  border-color: #8f3132;
}
.datas .el-checkbox__inner::after {
  border-color: #8f3132;
}
.home-datas .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #fff;
}
.home-datas .is-checked {
  background-color: #8f3132;
}
</style>
