import { reactive } from 'vue'
import { DesignState } from './interface'

export const designState = reactive<DesignState & Record<string, any>>({
  tablePageConfig: {
    forms: {},
    apis: {},
    variables: {},
    buttonGroup: [],
    tableConfig: {
      columns: [],
      actions: [],
      config: '',
      isTablePagination: true
    },
    isMountedSearch: true
  },
  oldTablePageConfig: {},
  apis: [], // 接口数组
  variables: [], // 变量数组
  forms: [] // 表单数组
})
