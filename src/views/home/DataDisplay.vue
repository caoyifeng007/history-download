<template>
  <div>
    <el-checkbox-group v-model="selData1" v-show="isFtr || !isCategoryProd">
      <div class="flex flex-wrap">
        <template v-for="item in disData1" :key="item.label">
          <el-checkbox checked :label="item.label">
            {{ item.name }}
          </el-checkbox>
        </template>
      </div>
    </el-checkbox-group>

    <el-checkbox-group v-model="selData2" v-show="isOpt">
      <div class="flex flex-wrap">
        <template v-for="item in disData2" :key="item.label">
          <el-checkbox checked :label="item.label">
            {{ item.name }}
          </el-checkbox>
        </template>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHqyStore } from '@/stores/modules/app'

const { disData1, disData2, selData1, selData2, isCategoryProd, isFtr, isOpt } = storeToRefs(
  useHqyStore()
)
</script>
