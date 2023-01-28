import { Request, Response } from '@gwin/networking'
import { AppListInquiryParam, AppAdditionParam, AppDeletingParam, AppMaintenanceParam } from './interface'

class AppApi {
  /**
   * 应用列表查询
   */
  async appListInquiry(params: AppListInquiryParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/AppListInquiry',
      params: params,
      isLoading: false,
      isMessage: true,
      isError: false
    })
    return await request.start()
  }

  /**
   * 应用新增
   */
  async appAddition(params: AppAdditionParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/AppAddition',
      params: params,
      isLoading: false,
      isMessage: true,
      isError: false
    })
    return await request.start()
  }

  /**
   * 应用删除
   */
  async appDeleting(params: AppDeletingParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/AppDeleting',
      params: params,
      isLoading: false,
      isMessage: true,
      isError: false
    })
    return await request.start()
  }

  /**
   * 应用维护
   */
  async appMaintenance(params: AppMaintenanceParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/AppMaintenance',
      params: params,
      isLoading: false,
      isMessage: true,
      isError: false
    })
    return await request.start()
  }
}

export default new AppApi()
