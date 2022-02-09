<template>
  <el-row>
    数据类型:
    <el-radio-group v-model="selectedTimeGrade">
      <el-radio label="DayPicker" size="default" border>日终数据</el-radio>
      <el-radio label="MinutePicker" size="default" border>分钟数据</el-radio>
      <el-radio label="SnapPicker" size="default" border>快照历史数据</el-radio>
    </el-radio-group>
  </el-row>
  <el-divider />
  <el-row>
    下载日期:
    <el-date-picker
      v-if="!selectedPicker"
      key="day"
      v-model="selectedDays"
      type="dates"
      placeholder="请选择日期"
      value-format="YYYY/MM/DD"
      :disabled-date="disabledDate"
      :shortcuts="shortcuts"
    />
    <el-date-picker
      v-if="selectedPicker"
      key="minute"
      v-model="selectedDayRange"
      type="daterange"
      format="YYYY-MM-DD"
      value-format="YYYY/MM/DD"
      range-separator="To"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :disabled-date="disabledDate"
    />
    <el-radio-group v-model="selectedPicker">
      <el-radio :label="true" size="small">范围日期</el-radio>
      <el-radio :label="false" size="small">特定日期</el-radio>
    </el-radio-group>

    行情类型:
    <el-select v-model="selectedSource" clearable placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-row>
  <el-row>
    <el-radio-group
      v-show="
        selectedSource == 'basicInfo' || selectedSource == 'deepInfo' || selectedSource == 'dayInfo'
      "
      v-model="selectedType"
    >
      <el-radio-button label="期货" size="large">期货</el-radio-button>
      <el-radio-button label="期权" size="large">期权</el-radio-button>
    </el-radio-group>
  </el-row>
  <el-row>
    <el-checkbox-group v-model="selectedDatas">
      <el-space wrap :size="0">
        <template v-for="item in displayDatas">
          <el-checkbox
            v-if="selectedType == item.futureType || item.futureType == 'none'"
            style="width: 11rem"
            checked
            :key="item.name"
            :label="item.name"
          >
            {{ item.name }}
          </el-checkbox>
        </template>
      </el-space>
    </el-checkbox-group>
  </el-row>
  <el-divider />
  <el-row>
    <el-col>
      <el-button type="primary" @click="download">分表下载</el-button>
      <el-button type="primary" @click="tt">test</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import axIns from '@/request'
import { ref } from 'vue'

import { useDatePicker } from '@/hooks/useDatePicker'
import { useDataSources } from '@/hooks/useDataSources'
import { useDisplayDatas } from '@/hooks/useDisplayDatas'
import { useTimeGrade } from '@/hooks/useTimeGrade'

const { selectedDays, selectedDayRange, shortcuts, disabledDate, selectedPicker } = useDatePicker()

const { selectedSource, options } = useDataSources()

const { displayDatas, selectedDatas } = useDisplayDatas()

const { selectedTimeGrade } = useTimeGrade()

const selectedType = ref('')

const download = () => {
  let reqParams
  if (selectedTimeGrade.value == 'DayPicker') {
    reqParams = {
      picker: 'minutePicker',
      startTime: selectedDayRange.value[0],
      endTime: selectedDayRange.value[1],
    }
  } else {
    reqParams = {
      picker: 'dayPicker',
      selectedDate: selectedDays.value,
    }
  }
  axIns
    .get('/download', {
      params: reqParams,
    })
    .then(({ status, data }) => {
      if (status == 200 && data.validate == 'ok') {
        console.log('response data is', data)

        const formNode = document.createElement('form')
        formNode.setAttribute('action', data.dUrl)

        document.body.appendChild(formNode)
        formNode.submit()
      }
    })
}

const tt = () => {
  console.log(selectedDays.value)
  console.log(selectedDayRange.value)
  console.log(selectedSource.value)
  console.log(selectedDatas.value)
}
</script>

<style scoped></style>
