<template>
  <el-radio-group v-show="isCategoryProd" v-model="category">
    <el-radio-button label="ftr" size="large" class="home-futures">ๆ่ดง</el-radio-button>
    <el-radio-button label="opt" size="large" class="home-option">ๆๆ</el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHqyStore } from '@/stores/modules/app'

const { category, isCategoryProd } = storeToRefs(useHqyStore())
</script>
