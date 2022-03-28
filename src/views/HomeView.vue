<template>
  <p>数据类型 :</p>
  <el-radio-group v-model="values.timeLevel" name="timeLevel">
    <el-radio :label="TimeLevels.DayLevel" size="default" border> 日终历史数据 </el-radio>

    <el-radio :label="TimeLevels.SnapLevel" size="default" border> 快照历史数据 </el-radio>

    <el-radio :label="TimeLevels.MinuteLevel" size="default" border> 分钟历史数据 </el-radio>
  </el-radio-group>

  <el-divider />

  <el-row>
    <p>下载日期 :</p>
    <div v-show="!values.rangePicker">
      <el-date-picker
        v-model="values.date"
        type="dates"
        placeholder="请选择日期"
        value-format="YYYY-MM-DD"
        :disabled-date="disabledDate"
      />
    </div>

    <div v-show="values.rangePicker">
      <el-date-picker
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

    <el-radio-group name="rangePicker" v-model="values.rangePicker">
      <el-radio :label="true" size="small">范围日期</el-radio>
      <el-radio :label="false" size="small">特定日期</el-radio>
    </el-radio-group>

    <p>行情类型 :</p>
    <el-select name="product" v-model="values.product" clearable placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-row>

  <el-row>
    <el-radio-group v-show="isDayProduct || isL1Product || isL2Product" v-model="category">
      <el-radio-button label="ftr" size="large">期货</el-radio-button>
      <el-radio-button label="opt" size="large">期权</el-radio-button>
    </el-radio-group>
  </el-row>

  <el-row>
    <el-checkbox-group v-model="selectedFtrDatas" v-show="currentGroup == ItemGroup.FtrItem">
      <el-space wrap :size="0">
        <template v-for="data in displayFtrDatas" :key="data">
          <el-checkbox style="width: 9rem" checked :label="data">
            {{ data }}
          </el-checkbox>
        </template>
      </el-space>
    </el-checkbox-group>

    <el-checkbox-group v-model="selectedOptDatas" v-show="currentGroup == ItemGroup.OptItem">
      <el-space wrap :size="0">
        <template v-for="data in displayOptDatas" :key="data">
          <el-checkbox style="width: 9rem" checked :label="data">
            {{ data }}
          </el-checkbox>
        </template>
      </el-space>
    </el-checkbox-group>

    <el-checkbox-group v-model="selectedIdxDatas" v-show="currentGroup == ItemGroup.IdxItem">
      <el-space wrap :size="0">
        <template v-for="data in displayIdxDatas" :key="data">
          <el-checkbox style="width: 9rem" checked :label="data">
            {{ data }}
          </el-checkbox>
        </template>
      </el-space>
    </el-checkbox-group>

    <el-checkbox-group v-model="selectedOtcDatas" v-show="currentGroup == ItemGroup.OtcItem">
      <el-space wrap :size="0">
        <template v-for="data in displayOtcDatas" :key="data">
          <el-checkbox style="width: 9rem" checked :label="data">
            {{ data }}
          </el-checkbox>
        </template>
      </el-space>
    </el-checkbox-group>
  </el-row>

  <el-divider />

  <el-row>
    <el-button type="primary" @click="check">分表下载</el-button>
  </el-row>
</template>

<script setup lang="ts">
import router from '@/router'
import { storeToRefs, getActivePinia } from 'pinia'
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
