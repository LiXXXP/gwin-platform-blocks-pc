<template>
  <header class="gwin-platform-header">
    <i class="gwin-platform-header__back" @click="goBack"></i>
    <div v-if="headerState.iconUri" class="gwin-platform-header__app">
      <img :src="handleAppIconPath(headerState.iconUri)" class="gwin-platform-apply__svg" />
      <el-tooltip
        class="box-item"
        effect="light"
        :content="route.path === '/application' ? headerState.appName : headerState.pageName"
        placement="bottom-end"
      >
        <p>{{ route.path === '/application' ? headerState.appName : headerState.pageName }}</p>
      </el-tooltip>
    </div>
    <el-button v-if="route.path === '/application'" round size="small" @click="onOpenLoginDialog">授权登录</el-button>
    <slot name="designNav"></slot>
  </header>
  <LoginDialog></LoginDialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { headerState } from '@/views/common/header/header'
import { loginState, useLoginMethod } from '@/views/common/login/login'

import LoginDialog from '@/views/common/login/index.vue'

const route = useRoute()
const router = useRouter()

const { captchaCodeInquiry } = useLoginMethod()

const handleAppIconPath = (index: string) => {
  const url = new URL(`../../../assets/img/app/${index}`, import.meta.url).href
  return url
}

/**
 * 授权登录
 */
const onOpenLoginDialog = () => {
  if (Cookies.get('adminChannel') !== 'null' && Cookies.get('adminEntityId') !== 'null') {
    loginState.isShow = true
    loginState.loginForm = {
      phone: '',
      password: '',
      code: '',
      baseUrl: '',
      captchaId: ''
    }
    captchaCodeInquiry()
  } else {
    ElMessage.error('请填写 channel 和 entityId ')
  }
}

/**
 * 返回首页
 */
const goBack = () => {
  if (route.path === '/application') {
    router.push({
      path: '/'
    })
  } else {
    router.push({
      path: '/application',
      query: {
        appId: headerState.appId
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('header') {
  width: 100%;
  height: 50px;
  display: flex;
  padding: 0 24px;
  overflow: hidden;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  @include e('back') {
    width: 14px;
    height: 14px;
    cursor: pointer;
    margin-right: 24px;
    border: 2px solid #888;
    border-left-width: 0;
    border-bottom-width: 0;
    transform: matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
  }
  @include e('app') {
    display: flex;
    align-items: center;
    margin-right: 20px;
    p {
      max-width: 120px;
      color: #31373d;
      font-size: 20px;
      white-space: nowrap;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
@include b('apply') {
  @include e('svg') {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
}
</style>
