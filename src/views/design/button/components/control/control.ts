import { reactive } from 'vue'
import { designState } from '@/views/design/use-design-config'
import { contentState } from '@/views/design/button/components/content/content'
import { ButtonItem } from '@gwin/admin-ui'
import { ControlState } from './interface'

export const controlState = reactive<ControlState>({
  list: [
    {
      name: '重置',
      key: 'reset',
      text: true,
      type: 'primary',
      url: new URL(`../../../../../assets/img/button/icon-reset.png`, import.meta.url).href
    },
    {
      name: '查询',
      key: 'search',
      text: false,
      type: '',
      style: {
        color: '#3860f4',
        'border-color': '#3860f4'
      },
      url: new URL(`../../../../../assets/img/button/icon-search.png`, import.meta.url).href
    },
    {
      name: '新增',
      key: 'create',
      text: false,
      type: 'primary',
      url: new URL(`../../../../../assets/img/button/icon-add.png`, import.meta.url).href
    },
    {
      name: '导出',
      key: 'export',
      text: false,
      type: 'primary',
      url: new URL(`../../../../../assets/img/button/icon-export.png`, import.meta.url).href
    },
    {
      name: '导入',
      key: 'import',
      text: false,
      type: 'primary',
      url: new URL(`../../../../../assets/img/button/icon-import.png`, import.meta.url).href
    },
    {
      name: '自定义渲染',
      key: 'custom',
      text: false,
      type: 'primary',
      url: new URL(`../../../../../assets/img/button/icon-custom.png`, import.meta.url).href
    },
    {
      name: '默认按钮',
      key: 'default',
      text: false,
      type: 'primary',
      url: new URL(`../../../../../assets/img/button/icon-default.png`, import.meta.url).href
    }
  ]
})

export const useControlMethod = () => {
  /**
   * 控件 拖拽结束
   */
  const onEnd = (evt: any) => {
    designState.tablePageConfig.buttonGroup.push(<ButtonItem>{
      key: controlState.list[evt.oldIndex].key,
      label: controlState.list[evt.oldIndex].name,
      text: controlState.list[evt.oldIndex].text,
      type: controlState.list[evt.oldIndex].type,
      style: controlState.list[evt.oldIndex].style,
      size: 'default'
    })
    contentState.currentIndex = designState.tablePageConfig.buttonGroup.length - 1
  }

  return {
    onEnd
  }
}
