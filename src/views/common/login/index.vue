<template>
  <el-dialog v-model="loginState.isShow" width="480px" top="26vh" custom-class="gwin-platform-dialog">
    <template #title>
      <div class="gwin-platform-login__title">授权登录</div>
    </template>
    <div class="gwin-platform-login__row">
      <p>手机号</p>
      <el-input
        v-model="loginState.loginForm.phone"
        style="width: 60%"
        placeholder="请输入手机号"
        name="phone"
        type="number"
        maxlength="11"
        tabindex="1"
        auto-complete="on"
      ></el-input>
    </div>
    <div class="gwin-platform-login__row">
      <p>密码</p>
      <el-input
        v-model="loginState.loginForm.password"
        style="width: 60%"
        placeholder="请输入密码"
        type="password"
        tabindex="2"
        auto-complete="on"
      ></el-input>
    </div>
    <div class="gwin-platform-login__row">
      <p>验证码</p>
      <div class="gwin-platform-code">
        <el-input
          ref="security"
          v-model="loginState.loginForm.code"
          style="width: 60%"
          placeholder="请输入验证码"
          name="security"
          type="text"
        ></el-input>
        <img :src="loginState.loginForm.baseUrl" class="captcha-code" @click="captchaCodeInquiry" />
      </div>
    </div>
    <div class="gwin-platform-error">{{ loginState.errorMsg }}</div>
    <div class="gwin-platform-login__footer">
      <div @click="loginState.isShow = false">取消</div>
      <div class="gwin-platform-login__footer--blue" @click="onLogin">授权</div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { loginState, useLoginMethod } from './login'
const { captchaCodeInquiry, onLogin } = useLoginMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('login') {
  @include e('title') {
    color: #1a2234;
    font-size: 20px;
    font-weight: 500;
  }
  @include e('row') {
    margin-bottom: 20px;
    p {
      color: #1a2234;
      font-size: 14px;
      margin-bottom: 14px;
    }
  }
  @include e('footer') {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-top: 30px;
    div {
      width: 88px;
      height: 40px;
      cursor: pointer;
      font-size: 14px;
      color: #1a2234;
      line-height: 40px;
      text-align: center;
      border-radius: 20px;
      background-color: #fff;
      border: 1px solid #f7f7f8;
      &:hover {
        background-color: #f7f7f8;
      }
    }
    @include m('blue') {
      margin-left: 8px;
      color: #fff !important;
      border: 1px solid #2f51ff !important;
      background-color: #2f51ff !important;
      &:hover {
        border: 1px solid #5d78ff !important;
        background-color: #5d78ff !important;
      }
    }
  }
}
@include b('code') {
  display: flex;
  align-items: center;
  img {
    height: 32px;
    margin-left: 20px;
    cursor: pointer;
  }
}
@include b('error') {
  font-size: 12px;
  color: #ff5555;
}
</style>
