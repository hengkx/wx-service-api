import * as Koa from 'koa';
import { getQrStrScene } from '../service/wechat';
import { User } from '../sequelize';

export async function getInfo(ctx: Koa.Context) {
  const { deviceId } = ctx.query;
  const user = await User.findOne({ where: { deviceId } });
  if (user === null) {
    const res = await getQrStrScene(deviceId);
    ctx.body = res;
  } else {
    ctx.body = user;
  }
}

export async function check(ctx: Koa.Context) {
  const { deviceId } = ctx.query;
  const user = await User.findOne({ where: { deviceId }, raw: true });
  ctx.body = user;
}
