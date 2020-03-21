export type ApiErrorConfig =
  | 'UNKNOWN_ERROR'
  | 'UN_AUTHORIZE'
  | 'INVALID_EMAIL'
  | 'USER_NAME_OR_PASSWORD_ERROR'
  | 'SYNC_AUTH_ERROR'
  | 'USER_NOT_EXIST'
  | 'NOT_FOUND'
  | 'WX_MINI_NOT_BIND_USER'
  | 'WX_MINI_EXIST_BIND_USER';

export default {
  UNKNOWN_ERROR: { code: -1, message: '系统错误' },
  UN_AUTHORIZE: { code: 401, message: '未授权' },
  NOT_FOUND: { code: 404, message: '未找到' },
  SYNC_AUTH_ERROR: { code: 9999, message: '同步授权错误，请检查输入信息' },
  INVALID_EMAIL: { code: 1000, message: '邮箱格式错误' },
  ACCOUNT_NOT_ACTIVATED: { code: 2000, message: '帐号未激活，请先激活帐号在使用' },
  USER_NAME_OR_PASSWORD_ERROR: { code: 2001, message: '用户名或密码不正确' },
  USER_NOT_EXIST: { code: 2002, message: '用户不存在' },
  ACCOUNT_PASSWORD_IS_NULL: { code: 2003, message: '用户密码为空' },
  ACCOUNT_PASSWORD_DECRYPT_ERROR: { code: 2004, message: '密码解密失败，必须使用指定方式加密' },
  ACCOUNT_PASSWORD_INVALID: { code: 2005, message: '密码无效' },
  EMAIL_EXISTS: { code: 2006, message: '邮箱已存在' },
  ACTIVE_INFO_INVALID: { code: 2007, message: '激活信息无效' },
  SEND_EMAIL_ERROR: { code: 2008, message: '发送邮件失败' },
  PROJECT_NOT_FOUND: { code: 2008, message: '项目不存在' },
  INTERFACE_NOT_FOUND: { code: 2008, message: '接口不存在' },
  WX_MINI_NOT_BIND_USER: { code: 80000, message: '没有绑定用户' },
  WX_MINI_EXIST_BIND_USER: { code: 80001, message: '该微信已绑定用户' },
};
