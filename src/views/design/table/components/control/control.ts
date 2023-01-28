import { reactive } from 'vue'
import { designState } from '@/views/design/use-design-config'
import { contentState } from '@/views/design/table/components/content/content'
import { ControlState } from './interface'

export const controlState = reactive<ControlState>({
  list: [
    {
      name: '编辑',
      key: 'edit',
      text: true,
      type: 'primary',
      interactionType: 'popup',
      url: new URL(`../../../../../assets/img/table/icon-edit.png`, import.meta.url).href
    },
    {
      name: '删除',
      key: 'delete',
      text: true,
      type: 'primary',
      interactionType: 'confirm',
      url: new URL(`../../../../../assets/img/table/icon-delete.png`, import.meta.url).href
    },
    {
      name: '上架/下架',
      key: 'up',
      text: true,
      type: 'primary',
      interactionType: '',
      url: new URL(`../../../../../assets/img/table/icon-shop.png`, import.meta.url).href
    },
    {
      name: '默认按钮',
      key: 'default',
      text: true,
      type: 'primary',
      interactionType: '',
      url: new URL(`../../../../../assets/img/button/icon-default.png`, import.meta.url).href
    },
    {
      name: '自定义渲染',
      key: 'custom',
      text: true,
      type: 'primary',
      interactionType: '',
      url: new URL(`../../../../../assets/img/button/icon-custom.png`, import.meta.url).href
    }
  ]
})

export const useControlMethod = () => {
  /**
   * 控件 拖拽结束
   */
  const onEnd = (evt: any) => {
    designState.tablePageConfig.tableConfig.actions.push({
      key: controlState.list[evt.oldIndex].key,
      label: controlState.list[evt.oldIndex].name,
      text: controlState.list[evt.oldIndex].text,
      type: controlState.list[evt.oldIndex].type,
      interactionType: controlState.list[evt.oldIndex].interactionType,
      onCallback: [],
      size: 'default'
    })
    contentState.currentIndex = designState.tablePageConfig.tableConfig.actions.length - 1
  }

  return {
    onEnd
  }
}
