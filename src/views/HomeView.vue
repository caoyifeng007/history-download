<template>
  <el-row>
    <p class="home-title">数据类型 :</p>
    <el-radio-group v-model="values.timeLevel" name="timeLevel" class="home-radio m-l-20">
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
      <div class="m-l-20 m-t-20 home-data" v-show="!values.rangePicker">
        <el-date-picker
          key="day"
          v-model="values.date"
          type="dates"
          placeholder="请选择日期"
          value-format="YYYY-MM-DD"
          :disabled-date="disabledDate"
        />
      </div>
      <div class="m-l-20 m-t-20 home-data" v-show="values.rangePicker">
        <el-date-picker
          style="width: 500px"
          key="minute"
          v-model="values.date"
          type="daterange"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :disabled-date="disabledDate"
        />
      </div>
    </div>
    <el-radio-group name="rangePicker" v-model="values.rangePicker" class="m-l-40 home-data-type">
      <el-radio :label="true" size="small">范围日期</el-radio>
      <el-radio :label="false" size="small">特定日期</el-radio>
    </el-radio-group>

    <p class="home-title m-l-21">行情类型 :</p>
    <el-select
      name="product"
      v-model="values.product"
      clearable
      placeholder="Select"
      class="m-t-20 m-l-10"
    >
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
      v-show="isDayProduct || isL1Product || isL2Product"
      v-model="category"
      class="home-futures-or-option"
    >
      <el-radio-button label="ftr" size="large" class="home-futures">期货</el-radio-button>
      <el-radio-button label="opt" size="large" class="home-option">期权</el-radio-button>
    </el-radio-group>
  </el-row>
  <el-row>
    <el-checkbox-group
      v-model="selectedFtrDatas"
      v-show="currentGroup == ItemGroup.FtrItem"
      class="home-datas"
    >
      <el-space wrap :size="0">
        <template v-for="data in displayFtrDatas" :key="data">
          <el-checkbox style="width: 9rem" class="datas" checked :label="data">
            {{ data }}
          </el-checkbox>
        </template>
      </el-space>
    </el-checkbox-group>
    <el-checkbox-group
      v-model="selectedOptDatas"
      v-show="currentGroup == ItemGroup.OptItem"
      class="home-datas"
    >
      <el-space wrap :size="0">
        <template v-for="data in displayOptDatas" :key="data">
          <el-checkbox style="width: 9rem" class="datas" checked :label="data">
            {{ data }}
          </el-checkbox>
        </template>
      </el-space>
    </el-checkbox-group>
    <el-checkbox-group
      v-model="selectedIdxDatas"
      v-show="currentGroup == ItemGroup.IdxItem"
      class="home-datas"
    >
      <el-space wrap :size="0">
        <template v-for="data in displayIdxDatas" :key="data">
          <el-checkbox style="width: 9rem" class="datas" checked :label="data">
            {{ data }}
          </el-checkbox>
        </template>
      </el-space>
    </el-checkbox-group>
    <el-checkbox-group
      v-model="selectedOtcDatas"
      v-show="currentGroup == ItemGroup.OtcItem"
      class="home-datas"
    >
      <el-space wrap :size="0">
        <template v-for="data in displayOtcDatas" :key="data">
          <el-checkbox style="width: 9rem" class="datas" checked :label="data">
            {{ data }}
          </el-checkbox>
        </template>
      </el-space>
    </el-checkbox-group>
  </el-row>

  <div class="m-t-50"></div>
  <el-divider />

  <el-row class="home-button">
    <el-button type="primary" @click="check">分表下载</el-button>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { storeToRefs, getActivePinia } from 'pinia'
import 'element-plus/es/components/message/style/css'
import { Edit, Camera, Finished } from '@element-plus/icons-vue'
import Qs from 'qs'

import axIns from '@/request'
import type { IDataResp } from '@/request'
import { ItemGroup, Products, TimeLevels } from '@/commons/enums'

import { useDatePicker } from '@/hooks/useDatePicker'
import { useDownloadValidate } from '@/hooks/useValidate'
import { useDownloadOptionListen } from '@/hooks/useOptionListen'
import toast from '@/hooks/useNotification'
import { ValidationError } from 'yup'

import { useHqyStore } from '@/stores'
// vue和ts中获得store的时间点不同
// import { hqyStore } from '@/main'
const hqyStore = useHqyStore(getActivePinia())

const { disabledDate } = useDatePicker()
const { downloadSchema, values } = useDownloadValidate()
useDownloadOptionListen(values, hqyStore)

const {
  category,
  options,
  displayFtrDatas,
  displayOptDatas,
  displayIdxDatas,
  displayOtcDatas,
  currentGroup,
  isDayProduct,
  isL1Product,
  isL2Product,

  selectedFtrDatas,
  selectedOptDatas,
  selectedIdxDatas,
  selectedOtcDatas,
} = storeToRefs(hqyStore)

async function check() {
  try {
    await downloadSchema.validate(
      {
        date: values.date,
        product: values.product,
        rangePicker: values.rangePicker,
        timeLevel: values.timeLevel,
      },
      { abortEarly: false }
    )
  } catch (e) {
    const err = e as ValidationError
    console.log(err.errors)
    toast.warning(err.errors[0])
    return
  }

  if (
    values.product == Products.Basic ||
    values.product == Products.Deep ||
    values.product == Products.Day
  ) {
    if (selectedFtrDatas.value.length <= 0 && selectedOptDatas.value.length <= 0) {
      toast.warning('请选择品种')
      return
    }
  } else if (values.product == Products.Index) {
    if (selectedIdxDatas.value.length <= 0) {
      toast.warning('请选择品种')
      return
    }
  } else if (values.product == Products.Otc) {
    if (selectedIdxDatas.value.length <= 0) {
      toast.warning('请选择品种')
      return
    }
  }

  // download()
}

async function download() {
  let selDatas
  if (currentGroup.value == ItemGroup.IdxItem) {
    selDatas = {
      items: selectedIdxDatas.value,
    }
  } else if (currentGroup.value == ItemGroup.OtcItem) {
    selDatas = {
      items: selectedOtcDatas.value,
    }
  } else {
    selDatas = {
      ftr: selectedFtrDatas.value,
      opt: selectedOptDatas.value,
    }
  }
  const res = await axIns.get<IDataResp>('/download', {
    params: {
      timeLevel: values.timeLevel,
      date: values.date,
      rangePicker: values.rangePicker,
      product: values.product,
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
    router.push({ path: '/' })
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
.home-radio /deep/ .el-radio.is-bordered.is-checked .el-icon {
  color: #fff;
}
.home-data /deep/ .el-date-editor--dates .el-icon {
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
.home-data-type /deep/ .el-radio__input.is-checked .el-radio__inner {
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
.home-futures-or-option /deep/ .el-radio-button .el-radio-button__inner {
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
.datas /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
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
