<template>
  <div class="gwin-platform-preview">
    <div v-for="item in appState.tabelPageList" :key="item.id">
      <div v-if="item.id === appState.pageCurrentId">
        <ad-table-page
          v-if="Object.keys(appState.tablePageConfig)?.length"
          :table-page-config="appState.tablePageConfig"
        ></ad-table-page>
        <div v-else class="gwin-platform-none">
          <i></i>
          <p>请先设计页面哦！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { appState } from '@/views/application/use-application-config'
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('preview') {
  padding: 20px;
  overflow: overlay;
  margin-left: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #fff;
  width: calc(100vw - 300px);
  height: calc(100vh - 90px);
  box-shadow: 0px 10px 20px 0px rgba(195, 200, 222, 0.1);
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(144, 147, 153, 0.5);
  }
}
@include b('none') {
  display: flex;
  color: #606a78;
  font-size: 14px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  i {
    width: 320px;
    height: 220px;
    margin: 130px 0 44px;
    background: url('@/assets/img/table/create.png') no-repeat 0 0;
    background-size: 100%;
  }
}
</style>
