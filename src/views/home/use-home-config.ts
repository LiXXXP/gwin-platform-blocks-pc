import { reactive } from 'vue'
import { HomeState } from './interface'

export const homeState = reactive<HomeState>({
  applyList: [], // 已创建应该列表
  createDialog: {
    // 新建应用弹窗
    isShow: false, // 是否显示
    appName: '', // 应用名称
    entityId: '',
    channel: ''
  },
  modifyDialog: {
    // 修改应用名称弹窗
    isShow: false, // 是否显示
    appName: '', // 应用名称
    index: 0, // 修改的 index
    entityId: '',
    channel: ''
  },
  deleteDialog: {
    // 删除框
    isShow: false,
    isChecked: false,
    appName: '', // 应用名称
    index: 0 // 修改的 index
  }
})
