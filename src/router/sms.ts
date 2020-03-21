import Router from '@koa/router';
import { DefaultState, Context } from 'koa';
import { receive } from '../controller/sms';

const router = new Router<DefaultState, Context>({
  prefix: '/api/sms',
});

router.post('/receive', receive);

export default router;
