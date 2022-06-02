<template>
  <div>
    <span>下载日期 :</span>
    <div v-show="!isRangePicker">
      <el-date-picker
        v-model="values.date"
        type="dates"
        placeholder="请选择日期"
        value-format="YYYY-MM-DD"
        :disabled-date="disabledDate"
      />
    </div>
    <div v-show="isRangePicker">
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
  </div>
  <el-radio-group name="rangePicker" v-model="isRangePicker">
    <el-radio :label="true" size="small">范围日期</el-radio>
    <el-radio :label="false" size="small">特定日期</el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDownloadValidate } from '@/hooks/useValidate'

const isRangePicker = ref<boolean>(false)

const { values } = useDownloadValidate()

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
</script>
