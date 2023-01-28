<template>
  <div class="gwin-platform-nav">
    <div
      v-for="(item, index) in navState.navList"
      :key="item.name"
      :class="{ active: index === navState.currentIndex }"
      @click="switchNav(index, item.path)"
    >
      <i></i>
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import { navState, useNavMethod } from './nav'

const { switchNav, setCurrentIndex, pageInquiry } = useNavMethod()

onMounted(async () => {
  setCurrentIndex()
  await pageInquiry()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('nav') {
  width: 55%;
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  div {
    display: flex;
    cursor: pointer;
    padding: 8px 16px;
    align-items: center;
    &:hover,
    &.active {
      color: #2f51ff;
    }
    &.active {
      background: #ffffff;
      border-radius: 8px 8px 0px 0px;
      box-shadow: 0px -4px 6px 0px rgba(178, 191, 210, 0.5);
    }
    i {
      width: 20px;
      height: 20px;
      margin-right: 4px;
    }
    &:nth-child(1) {
      i {
        background: url('@/assets/img/nav/icon-form.png') no-repeat 0 0;
        background-size: 100%;
      }
      &:hover,
      &.active {
        i {
          background-image: url('@/assets/img/nav/icon-form-active.png');
        }
      }
    }
    &:nth-child(2) {
      i {
        background: url('@/assets/img/nav/icon-button.png') no-repeat 0 0;
        background-size: 100%;
      }
      &:hover,
      &.active {
        i {
          background-image: url('@/assets/img/nav/icon-button-active.png');
        }
      }
    }
    &:nth-child(3) {
      i {
        background: url('@/assets/img/nav/icon-table.png') no-repeat 0 0;
        background-size: 100%;
      }
      &:hover,
      &.active {
        i {
          background-image: url('@/assets/img/nav/icon-table-active.png');
        }
      }
    }
    &:nth-child(4) {
      i {
        background: url('@/assets/img/nav/icon-basic.png') no-repeat 0 0;
        background-size: 100%;
      }
      &:hover,
      &.active {
        i {
          background-image: url('@/assets/img/nav/icon-basic-active.png');
        }
      }
    }
    &:nth-child(5) {
      i {
        background: url('@/assets/img/nav/icon-code.png') no-repeat 0 0;
        background-size: 100%;
      }
      &:hover,
      &.active {
        i {
          background-image: url('@/assets/img/nav/icon-code-active.png');
        }
      }
    }
  }
}
</style>
