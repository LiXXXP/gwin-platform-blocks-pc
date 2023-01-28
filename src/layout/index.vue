<template>
  <div style="height: 100%">
    <Header v-if="route.path === '/home'"></Header>
    <DesignHeader v-else>
      <template v-if="route.path.includes('design')" #designNav>
        <DesignNav></DesignNav>
      </template>
    </DesignHeader>
    <div class="gwin-platform-app-main">
      <Content class="gwin-platform-app-content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import Header from './header.vue'
import DesignHeader from '@/views/common/header/index.vue'
import DesignNav from '@/views/common/nav/index.vue'
import Content from './content.vue'
const route = useRoute()
</script>

<style lang="scss" scoped>
@import '../styles/mixin.scss';

@include b(app-main) {
  width: 100%;
  display: flex;
  background-color: #f8fbff;
  position: relative;
  top: 50px;
  left: 0px;
  right: 0px;
}

@include b(app-content) {
  flex: 1;
}
</style>
