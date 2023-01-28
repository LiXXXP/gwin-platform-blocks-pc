import { Request, Response } from '@gwin/networking'
import { PageInquiryParam, PageMaintenanceParam } from './interface'

class PageApi {
  /**
   * 页面查询
   */
  async pageInquiry(params: PageInquiryParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/PageInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  /**
   * 页面维护
   */
  async pageMaintenance(params: PageMaintenanceParam): Promise<Response> {
    const request = new Request({
      url: '/api/lcp/v1/PageMaintenance',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}

export default new PageApi()
