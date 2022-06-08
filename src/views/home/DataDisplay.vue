<template>
  <el-row>
    <el-checkbox-group v-model="selData1" v-show="isFtr || !isCategoryProd" class="home-datas">
      <el-space wrap :size="0">
        <template v-for="item in disData1" :key="item.label">
          <el-checkbox style="width: 9rem" class="datas" checked :label="item.label">
            {{ item.name }}
          </el-checkbox>
        </template>
      </el-space>
    </el-checkbox-group>

    <el-checkbox-group v-model="selData2" v-show="isOpt" class="home-datas">
      <el-space wrap :size="0">
        <template v-for="item in disData2" :key="item.label">
          <el-checkbox style="width: 9rem" class="datas" checked :label="item.label">
            {{ item.name }}
          </el-checkbox>
        </template>
      </el-space>
    </el-checkbox-group>
  </el-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHqyStore } from '@/stores/modules/app'

const { disData1, disData2, selData1, selData2, isCategoryProd, isFtr, isOpt } = storeToRefs(
  useHqyStore()
)
</script>
