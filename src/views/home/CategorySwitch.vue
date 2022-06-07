<template>
  <el-radio-group v-show="isCategoryProd" v-model="category" class="home-futures-or-option">
    <el-radio-button label="ftr" size="large" class="home-futures">期货</el-radio-button>
    <el-radio-button label="opt" size="large" class="home-option">期权</el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHqyStore } from '@/stores/modules/app'

const { category, isCategoryProd } = storeToRefs(useHqyStore())
</script>
