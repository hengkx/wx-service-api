import * as Koa from 'koa';
import ApiError from '../errors/ApiError';

const responseFormat = async (ctx: Koa.Context) => {
  // 如果有返回数据，将返回数据添加到data中
  if (ctx.body) {
    ctx.body = {
      code: 0,
      message: 'success',
      data: ctx.body,
    };
  } else {
    ctx.body = {
      code: 0,
      message: 'success',
    };
  }
};

const urlFilter = (pattern: string) => async (ctx: Koa.Context, next: any) => {
  const reg = new RegExp(pattern);
  try {
    // 先去执行路由
    await next();
  } catch (error) {
    // 如果异常类型是API异常并且通过正则验证的url，将错误信息添加到响应体中返回。
    if (error instanceof ApiError && reg.test(ctx.originalUrl)) {
      ctx.status = 200;
      if (ctx.body) {
        ctx.body = {
          code: error.code,
          message: error.message,
          data: ctx.body,
        };
      } else {
        ctx.body = {
          code: error.code,
          message: error.message,
        };
      }
    } else {
      if (error.message === 'Authentication Error') {
        return (ctx.body = { code: 401 });
      }
      ctx.body = { code: -1, message: error.message };
    }
    // 继续抛，让外层中间件处理日志
    throw error;
  }

  // 通过正则的url进行格式化处理
  if (reg.test(ctx.originalUrl)) {
    await responseFormat(ctx);
  }
  return;
};

export default urlFilter;
