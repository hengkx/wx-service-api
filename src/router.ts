import Router from '@koa/router';
import { DefaultState, Context } from 'koa';
import wxRouter from './router/wechat';
import accountRouter from './router/account';
import smsRouter from './router/sms';

import ApiError from './errors/ApiError';

const router = new Router<DefaultState, Context>({});

router.use(smsRouter.routes());
router.use(accountRouter.routes());
router.use(wxRouter.routes());

router.all('*', async ctx => {
  // throw new ApiError('NOT_FOUND');
});

export default router;
