import { Request, Response } from '@gwin/networking'
import {
  GroupAdditionParam,
  GroupDeletingParam,
  GroupListInquiryParam,
  GroupMaintenanceParam,
  PageAdditionParam,
  PageDeletingParam,
  PageListInquiryParam,
  PageNameMaintenanceParam,
  PageMoveMaintenanceParam
} from './interface'

class MenuApi {
  /**
   * 分组新增
   */
  async groupAddition(params: GroupAdditionParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/GroupAddition',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  /**
   * 分组删除
   */
  async groupDeleting(params: GroupDeletingParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/GroupDeleting',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  /**
   * 分组列表查询
   */
  async groupListInquiry(params: GroupListInquiryParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/GroupListInquiry',
      params: params,
      isLoading: false,
      isMessage: true
    })
    return await request.start()
  }

  /**
   * 分组重命名
   */
  async groupMaintenance(params: GroupMaintenanceParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/GroupMaintenance',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  /**
   * 页面新增
   */
  async pageAddition(params: PageAdditionParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/PageAddition',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  /**
   * 页面删除
   */
  async pageDeleting(params: PageDeletingParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/PageDeleting',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  /**
   * 页面列表查询
   */
  async pageListInquiry(params: PageListInquiryParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/PageListInquiry',
      params: params,
      isLoading: false,
      isMessage: true
    })
    return await request.start()
  }

  /**
   * 页面重命名
   */
  async pageNameMaintenance(params: PageNameMaintenanceParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/PageNameMaintenance',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  /**
   * 页面移动
   */
  async pageMoveMaintenance(params: PageMoveMaintenanceParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/PageMoveMaintenance',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}

export default new MenuApi()
