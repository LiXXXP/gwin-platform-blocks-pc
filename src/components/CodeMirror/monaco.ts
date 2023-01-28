import { onMounted, onBeforeUnmount, reactive, watch } from 'vue'
import { monaco } from './customeMonaco'
import { dialogState } from '@/views/design/components/dialog/dialog'

export const useMonacoEditor = (codeEditBox: any, emits: any, props: any) => {
  let editor: monaco.editor.IStandaloneCodeEditor // editor实例

  const monacoState = reactive({
    value: typeof props.modelValue === 'object' ? JSON.stringify(props.modelValue, null, 2) : props.modelValue
  })

  onMounted(() => {
    initEditor()
  })

  onBeforeUnmount(() => {
    editor && editor.dispose()
  })

  watch(
    () => props.modelValue,
    (n, o) => {
      monacoState.value = typeof n === 'object' ? JSON.stringify(n, null, 2) : n
      editor && editor.setValue(monacoState.value)
    }
  )
  /**
   * init
   */
  const initEditor = () => {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false
    })
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true
    })
    editor = monaco.editor.create(codeEditBox.value as HTMLElement, {
      value: monacoState.value,
      language: props.language,
      automaticLayout: true, // 自适应布局
      renderLineHighlight: 'all', // 行亮
      selectOnLineNumbers: true, // 显示行号
      roundedSelection: false,
      foldingStrategy: 'indentation',
      readOnly: false, // 只读
      cursorStyle: 'line', // 光标样式
      glyphMargin: true, // 字形边缘
      useTabStops: false,
      fontSize: 12, // 字体大小
      scrollBeyondLastLine: false, // 取消代码后面一大段空白
      overviewRulerBorder: false, // 不要滚动条的边框
      tabSize: 2,
      minimap: {
        // 代码小窗口
        enabled: !!props.minHeight
      }
    })

    /**
     * 监听 blur
     */
    editor.onDidBlurEditorText(() => {
      emits('onBlur', editor.getValue())
    })
  }

  /**
   * 代码代码编辑弹窗
   */
  const onOpenCodeDialog = () => {
    dialogState.dialogVisible = true
    dialogState.language = props.language
    dialogState.moduleValue = monacoState.value
    emits('onOpenCodeDialog')
  }

  return {
    initEditor,
    onOpenCodeDialog
  }
}
