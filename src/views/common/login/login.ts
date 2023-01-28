import { reactive } from 'vue'
import md5 from 'js-md5'
import Cookies from 'js-cookie'
import loginApi from '@/api/login'

export const loginState = reactive({
  isShow: false,
  loginForm: {
    phone: '',
    password: '',
    code: '',
    baseUrl: '',
    captchaId: ''
  },
  errorMsg: ''
})

export const useLoginMethod = () => {
  /**
   * 验证码
   */
  const captchaCodeInquiry = async () => {
    await loginApi.captchaCodeInquiry({}).then((res: any) => {
      if (res.status.errorCode === '0') {
        loginState.loginForm.baseUrl = `data:image/jpeg;base64,${res.body.captchaCodeBase64}`
        loginState.loginForm.captchaId = res.body.captchaId
      }
    })
  }

  /**
   * 登录
   */
  const onLogin = async () => {
    if (!loginState.loginForm.phone) {
      loginState.errorMsg = '手机号不能为空'
      return
    }
    if (!loginState.loginForm.password) {
      loginState.errorMsg = '密码不能为空'
      return
    }
    if (!loginState.loginForm.code) {
      loginState.errorMsg = '验证码不能为空'
      return
    }
    if (!/^1[3|4|5|7|8]\d{9}$/.test(loginState.loginForm.phone)) {
      loginState.errorMsg = '手机号格式不正确，请输入正确的手机号'
      return
    }

    const params = {
      account: loginState.loginForm.phone,
      captchaCode: loginState.loginForm.code,
      captchaId: loginState.loginForm.captchaId,
      password: md5(loginState.loginForm.password)
    }
    await loginApi
      .login(params)
      .then((res: any) => {
        Cookies.set('adminUserId', res.body.userId)
        Cookies.set('adminToken', res.body.accessToken)
        loginState.isShow = false
      })
      .catch((err) => {
        if (err.response.status.errorCode !== 0) {
          loginState.errorMsg = err.response.status.replyText
          captchaCodeInquiry()
        }
      })
  }
  return {
    captchaCodeInquiry,
    onLogin
  }
}
