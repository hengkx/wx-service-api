import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import jwt from 'koa-jwt';
import cors from '@koa/cors';
import responseFormat from './middleware/responseFormat';
import authorize from './middleware/authorize';
import routes from './router';
import config from './config';

const app = new Koa();

app.use(async (ctx, next) => {
  // 响应开始时间
  const start = Date.now();
  // 响应间隔时间
  let ms;
  try {
    // 开始进入到下一个中间件
    await next();

    ms = Date.now() - start;
    // 记录响应日志
    // logger.logResponse(ctx, ms);
  } catch (error) {
    ms = Date.now() - start;
  }
});

app.use(cors());

app.use(responseFormat('^/api'));

// app.use(
//   jwt({ secret: 'finance' }).unless({
//     path: [
//       /^\/api\/miniprogram\/account/,
//       /^\/api\/account/,
//       /^\/api\/quote/,
//       /^\/api\/tushare/,
//       /^\/img/,
//     ],
//   }),
// );

app.use(authorize);

app.use(bodyParser());

app.use(routes.routes());

app.on('error', (err, ctx) => {
  console.log(err);
});

app.listen(config.port);
