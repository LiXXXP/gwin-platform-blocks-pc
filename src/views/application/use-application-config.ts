import { reactive } from 'vue'
import { AppState } from './interface'

export const appState = reactive<AppState>({
  defaultActive: '', // 菜单默认高亮id
  groupList: [], // 菜单分组列表
  pageList: [], // 菜单页面列表
  dialogData: {
    // 弹出层数据
    id: '',
    type: '',
    index: 0,
    i: 0,
    name: ''
  },
  tablePageConfig: {},
  tabelPageList: [],
  pageCurrentId: ''
})
