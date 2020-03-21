import Router from '@koa/router';
import { DefaultState, Context } from 'koa';
import { getInfo, check } from '../controller/account';

const router = new Router<DefaultState, Context>({
  prefix: '/api/account',
});

router.get('/info', getInfo).get('/check', check);

export default router;
