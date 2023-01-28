import { reactive } from 'vue'

export const dialogState = reactive({
  dialogVisible: false,
  moduleValue: '',
  language: 'json',
  key: ''
})

export const useCodeDialog = (emits: any) => {
  /**
   * 确定
   */
  const onConfirm = () => {
    emits('onConfirm', dialogState.moduleValue, dialogState.key)
    dialogState.dialogVisible = false
  }

  const onBlur = (val: string) => {
    if (val) {
      if (dialogState.language === 'json') {
        try {
          dialogState.moduleValue = JSON.parse(val)
        } catch (error) {
          dialogState.moduleValue = val
        }
      } else {
        if (val.includes(')()')) {
          dialogState.moduleValue = val
        } else {
          dialogState.moduleValue = `(${val})()`
        }
      }
    } else {
      dialogState.moduleValue = ''
    }
  }

  return {
    onConfirm,
    onBlur
  }
}
