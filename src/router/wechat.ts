import Router from '@koa/router';
import { DefaultState, Context } from 'koa';
import { valid, processMsg } from '../controller/wechat';

const router = new Router<DefaultState, Context>({});

router.get('/', valid).post('/', processMsg);

export default router;
