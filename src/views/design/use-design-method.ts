import { useRoute } from 'vue-router'
import PageApi from '@/api/page'
import { designState } from '@/views/design/use-design-config'
import { useNavMethod } from '@/views/common/nav/nav'

export const useDesignMethod = () => {
  const route = useRoute()
  const { getApis } = useNavMethod()

  /**
   * 保存表单
   */
  const onSave = async () => {
    const param = {
      id: <string>route.query?.id,
      content: JSON.stringify(designState.tablePageConfig)
    }
    await PageApi.pageMaintenance(param)
    // 接口 api
    getApis('apis')

    // 变量 api
    getApis('variables')

    // 表单 api
    getApis('forms')
  }
  return {
    onSave
  }
}
