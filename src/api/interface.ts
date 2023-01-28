export interface AppListInquiryParam {
  teamId: string
}

export interface AppAdditionParam {
  appName: string
  iconUri: string
  teamId: string
  userId: string | undefined
}

export interface AppDeletingParam {
  id: string
}

export interface AppMaintenanceParam {
  appName: string
  iconUri?: string
  id: string
}

export interface GroupAdditionParam {
  appId: string
  name: string
  parentId?: string
  sortNo?: string
}

export interface GroupDeletingParam {
  id: string
}

export interface GroupListInquiryParam {
  appId: string
}

export interface GroupMaintenanceParam {
  id: string
  name: string
}

export interface PageAdditionParam {
  content?: string
  groupId: string
  name: string
  parentId?: string
  sortNo?: string
}

export interface PageDeletingParam {
  id: string
}

export interface PageInquiryParam {
  id: string
}

export interface PageListInquiryParam {
  appId: string
  groupId: string
}

export interface PageMaintenanceParam {
  content: any
  id: string
}

export interface PageNameMaintenanceParam {
  id: string
  name: string
}

export interface PageMoveMaintenanceParam {
  appId: string
  groupId: string
  id: string
  parentId?: string
  sortNo?: number
}
