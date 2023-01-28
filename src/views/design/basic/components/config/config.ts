import { reactive } from 'vue'
import { ConfigState } from './interface'

export const configState = reactive<ConfigState>({
  config: 'apis',
  list: [
    {
      name: '接口配置',
      key: 'apis',
      className: 'gwin-platform-icons__api'
    },
    {
      name: '变量配置',
      key: 'variables',
      className: 'gwin-platform-icons__var'
    }
  ]
})

export const useConfigMethod = () => {
  /**
   * 切换配置选项
   * @param val
   */
  const onClickConfig = (val: string) => {
    configState.config = val
  }
  return {
    configState,
    onClickConfig
  }
}
