import errorConfig, { ApiErrorConfig } from './apiErrorConfig';

/**
 * 自定义Api异常
 */

class ApiError extends Error {
  code: number;

  // 构造方法
  constructor(errorName: ApiErrorConfig) {
    super();
    // properly capture stack trace in Node.js
    Error.captureStackTrace(this, this.constructor);
    let errorInfo = errorConfig.UNKNOWN_ERROR;
    if (errorConfig.hasOwnProperty(errorName)) {
      errorInfo = errorConfig[errorName];
    }
    // if (!errorInfo) errorInfo = errorConfig.UNKNOWN_ERROR;

    this.name = errorName;
    this.code = errorInfo.code;
    this.message = errorInfo.message;
  }
}

export default ApiError;
