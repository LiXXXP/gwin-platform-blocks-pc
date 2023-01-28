import { reactive } from 'vue'
import { ConfigState } from './interface'

export const configState = reactive<ConfigState>({
  list: [
    {
      name: '数据列',
      key: 'columns',
      className: 'gwin-platform-icons__data'
    },
    {
      name: '操作列',
      key: 'actions',
      className: 'gwin-platform-icons__handle'
    },
    {
      name: '其他配置',
      key: 'config',
      className: 'gwin-platform-icons__other'
    }
  ],
  configIndex: 0
})

export const useConfigMethod = () => {
  /**
   * 选择操作的选项
   * @param index
   */
  const onClickConfig = (index: number) => {
    configState.configIndex = index
  }

  return { onClickConfig }
}
