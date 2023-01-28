import { reactive } from 'vue'
import { AddState } from './interface'
import { designState } from '@/views/design/use-design-config'
import { contentState } from '@/views/design/basic/components/content/content'
import { configState } from '@/views/design/basic/components/config/config'

export const addState = reactive<AddState>({
  addDialog: {
    isShow: false,
    name: '',
    path: ''
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
      path: ''
    }
    contentState.copyKey = ''
  }

  /**
   * 新建 api
   */
  const onAddApi = async () => {
    if (addState.addDialog.name) {
      if (configState.config === 'apis') {
        designState.tablePageConfig.apis[addState.addDialog.name] = {
          key: addState.addDialog.name,
          path: addState.addDialog.path,
          method: 'post',
          config: {
            type: 'admin'
          }
        }
      } else {
        designState.tablePageConfig.variables[addState.addDialog.name] = {
          key: addState.addDialog.name
        }
      }
      contentState.currentIndex = addState.addDialog.name
      addState.addDialog.isShow = false
    }
  }

  return {
    onOpenAddDialog,
    onAddApi
  }
}
