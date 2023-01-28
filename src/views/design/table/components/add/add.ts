import { reactive } from 'vue'
import { AddState } from './interface'
import { designState } from '@/views/design/use-design-config'
import { contentState } from '@/views/design/table/components/content/content'

export const addState = reactive<AddState>({
  addDialog: {
    isShow: false,
    name: '',
    prop: ''
  }
})

export const useAddMethod = () => {
  /**
   * 打开新建 api 弹窗
   */
  const onOpenAddDialog = () => {
    addState.addDialog = {
      isShow: true,
      name: '',
      prop: ''
    }
  }

  /**
   * 新建 api
   */
  const onAddApi = async () => {
    if (addState.addDialog.name) {
      designState.tablePageConfig.tableConfig.columns.push({
        prop: addState.addDialog.prop,
        label: addState.addDialog.name,
        variableMap: {}
      })
      contentState.currentIndex = designState.tablePageConfig.tableConfig.columns.length - 1
      addState.addDialog.isShow = false
    }
  }

  return {
    onOpenAddDialog,
    onAddApi
  }
}
