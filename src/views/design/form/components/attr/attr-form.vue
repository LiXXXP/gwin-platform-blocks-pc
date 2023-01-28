<template>
  <div class="gwin-platform-attr-form">
    <el-form
      ref="ruleFormRef"
      :model="attrState.formRule"
      label-position="top"
      size="default"
      class="gwin-platform-form"
    >
      <el-form-item label="表单key" prop="key" :rules="{ required: true, message: '请填写表单的key', trigger: 'blur' }">
        <el-input v-model="attrState.formRule.key" disabled />
      </el-form-item>
      <el-form-item label="所属页面">
        <el-input v-model="attrState.formRule.page" disabled />
      </el-form-item>
      <el-form-item label="所属分组">
        <el-input v-model="attrState.formRule.group" disabled />
      </el-form-item>
      <el-popconfirm v-if="attrState.formRule.key" title="Are you sure to delete this?" @confirm="onDelete">
        <template #reference>
          <el-button :icon="Delete" round class="gwin-platform-del-btn">删除表单</el-button>
        </template>
      </el-popconfirm>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue'
import { attrState, useAttrMethod } from './attr'
const { onDelete } = useAttrMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.gwin-platform-form {
  padding: 20px;
}
@include b('del-btn') {
  width: 100%;
  margin-top: 30px;
  height: 36px;
}
</style>
