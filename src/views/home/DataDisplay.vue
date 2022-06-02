<template>
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
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ItemGroup } from '@/commons/enums'
import { useHqyStore } from '@/stores/modules/app'
// vue和ts中获得store的时间点不同
// import { hqyStore } from '@/main'
const appStore = useHqyStore()
const {
  displayFtrDatas,
  displayOptDatas,
  displayIdxDatas,
  displayOtcDatas,
  currentGroup,

  selectedFtrDatas,
  selectedOptDatas,
  selectedIdxDatas,
  selectedOtcDatas,
} = storeToRefs(appStore)
</script>
