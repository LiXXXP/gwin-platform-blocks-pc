import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageApi from '@/api/page'
import { designState } from '@/views/design/use-design-config'
import { attrState } from '@/views/design/form/components/attr/attr'
import { tableAttrState } from '@/views/design/table/components/attr/attr'
import { headerState } from '@/views/common/header/header'

export const navState = reactive({
  currentIndex: 0,
  navList: [
    {
      name: '基本配置',
      path: '/design/basic'
    },
    {
      name: '表单设计',
      path: '/design/form'
    },
    {
      name: '搜索按钮组设计',
      path: '/design/button'
    },
    {
      name: '表格设计',
      path: '/design/table'
    },
    {
      name: '编辑源码',
      path: '/design/code'
    }
  ],
  columnItemkeys: {
    map: '',
    tsx: '',
    tags: '',
    type: '',
    href: '',
    prop: '',
    label: '',
    width: '',
    auto: true,
    render: '',
    maxWidth: '',
    sortable: '',
    handleType: '',
    variableMap: '',
    isVariableMap: true,
    isSearchForm: '',
    tagsVariables: '',
    dateTimeFormate: '',
    showOverflowTooltip: true
  }
})

export const useNavMethod = () => {
  const route = useRoute()
  const router = useRouter()
  /**
   * 页面查询
   */
  const pageInquiry = async () => {
    init()
    const res = await PageApi.pageInquiry({ id: <string>route.query?.id })
    headerState.iconUri = res.body.iconUri
    headerState.pageName = res.body.name
    headerState.appId = res.body.appId
    attrState.formRule = {
      key: '',
      page: res.body.name,
      group: res.body.groupName
    }
    if (res.body.content) {
      designState.tablePageConfig = JSON.parse(res.body.content)
      designState.oldTablePageConfig = JSON.parse(res.body.content)

      // 接口 api
      getApis('apis')

      // 变量 api
      getApis('variables')

      // 表单 api
      getApis('forms')

      // 表格其他配置 回显
      getColumnItemKey()
    }
  }

  /**
   * init
   */
  const init = () => {
    designState.tablePageConfig = {
      forms: {},
      apis: {},
      variables: {},
      buttonGroup: [],
      tableConfig: {
        columns: [],
        actions: [],
        config: '',
        isTablePagination: true
      },
      isMountedSearch: true
    }
  }

  /**
   * keys
   * 判断是否和 ColumnItem 的 key 是否相同
   * 不相同的话赋值给 其他配置项
   */
  const getColumnItemKey = () => {
    const columns = designState.tablePageConfig.tableConfig?.columns
    for (const i in columns) {
      for (const k in columns[i]) {
        if (!navState.columnItemkeys.hasOwnProperty(k)) {
          tableAttrState.otherConfig[parseInt(i)][k] = columns[i][k]
        }
      }
    }
  }

  /**
   * apis
   */
  const getApis = (vars: string) => {
    const config = designState.tablePageConfig[vars]
    if (!config) return
    const configKeys = Object.keys(designState.tablePageConfig[vars])
    designState[vars] = configKeys.map((item) => {
      if (vars === 'forms') {
        return {
          label: item,
          value: item
        }
      }
      return {
        label: item,
        value: designState.tablePageConfig[vars][item].key
      }
    })
  }

  /**
   * 设置当前 nav active
   */
  const setCurrentIndex = () => {
    const index = navState.navList.findIndex((item) => item.path === route.path)
    navState.currentIndex = index
  }

  /**
   * tab 切换
   * @param index
   * @param path
   */
  const switchNav = (index: number, path: string) => {
    navState.currentIndex = index
    router.push({
      path: path,
      query: route.query
    })
  }
  return {
    pageInquiry,
    setCurrentIndex,
    switchNav,
    getApis
  }
}
