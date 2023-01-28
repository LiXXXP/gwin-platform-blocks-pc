import { TablePageConfig } from '@gwin/admin-ui'

export interface DesignState {
  tablePageConfig: TablePageConfig | any
  oldTablePageConfig: TablePageConfig | any
  apis: Apis[]
  variables: Apis[]
  forms: Apis[]
}

interface Apis {
  label: string
  value: string
}
