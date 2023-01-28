import { reactive } from 'vue'
import { AddState } from '@/views/design/form/components/add/interface'
import { attrState } from '@/views/design/form/components/attr/attr'
import { designState } from '@/views/design/use-design-config'

export const addState = reactive<AddState>({
  addDialog: {
    isShow: false,
    name: ''
  }
})

export const useAddMethod = () => {
  /**
   * 打开新建表单弹窗
   */
  const onOpenAddDialog = () => {
    addState.addDialog = {
      isShow: true,
      name: ''
    }
  }

  /**
   * 新建表单
   */
  const onAddForm = async () => {
    const name = addState.addDialog.name.replace(/ /g, '')
    if (name && name.length >= 2) {
      designState.tablePageConfig.forms[addState.addDialog.name] = []
      attrState.formRule.key = addState.addDialog.name
      addState.addDialog.isShow = false
    }
  }

  return {
    onOpenAddDialog,
    onAddForm
  }
}
