<template>
  <!-- <transition
    enter-active-class="duration-500 ease-in-out"
    enter-from-class="translate-x-6 opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="duration-500 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-6 opacity-0"
  >
    <div v-show="t">111</div>
  </transition> -->
  <transition
    type="animation"
    enter-active-class="animate-wiggle"
    leave-active-class="animate-wigglere"
  >
    <div v-show="t" class="inline-block">111</div>
  </transition>
  <br />
  <button @click="t = !t">hit</button>
  <!-- <div class="animate-wiggle">123</div> -->

  <el-config-provider :locale="zhCn">
    <div class="p-4 min-h-screen bg-gray-50">
      <router-view />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ref, reactive, computed } from 'vue'
import { useHead } from '@vueuse/head'

const t = ref(false)
const title = import.meta.env.VITE_APP_TITLE
const siteData = reactive({
  title,
  description: `My beautiful website`,
})

useHead({
  // Can be static or computed
  title: computed(() => siteData.title),
  meta: [
    {
      name: `description`,
      content: computed(() => siteData.description),
    },
  ],
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
