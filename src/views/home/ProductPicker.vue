<template>
  <p>行情类型 :</p>
  <el-select name="product" v-model="selProd" clearable placeholder="Select">
    <el-option v-for="p in products" :key="p.label" :label="p.name" :value="p.label" />
  </el-select>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHqyStore } from '@/stores/modules/app'

const { products, selProd } = storeToRefs(useHqyStore())
</script>
