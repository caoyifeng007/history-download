<template>
  <div>
    <span>下载日期 :</span>
    <div v-show="!rangePicker">
      <el-date-picker
        v-model="date"
        type="dates"
        placeholder="请选择日期"
        value-format="YYYY-MM-DD"
        :disabled-date="disabledDate"
      />
    </div>
    <div v-show="rangePicker">
      <el-date-picker
        v-model="date"
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
  <el-radio-group name="rangePicker" v-model="rangePicker">
    <el-radio :label="true" size="small">范围日期</el-radio>
    <el-radio :label="false" size="small">特定日期</el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHqyStore } from '@/stores/modules/app'

const { date, rangePicker } = storeToRefs(useHqyStore())

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
</script>
