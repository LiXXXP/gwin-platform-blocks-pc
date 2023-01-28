<template>
  <div class="gwin-platform-application">
    <!-- 页面左侧菜单 -->
    <Menu></Menu>
    <!-- 页面预览区域 -->
    <Preview></Preview>
  </div>
</template>

<script lang="ts" setup>
// 子组件
import Menu from '@/views/application/menu/index.vue' // 菜单
import Preview from '@/views/application/preview/index.vue' // 预览
import { useRouter, RouteLocationNormalized } from 'vue-router'

const router = useRouter()

router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  if (to.path.includes('application')) {
    window.location.reload()
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('application') {
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
}
</style>
