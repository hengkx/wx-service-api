import * as Koa from 'koa';
import crypto from 'crypto';
import getRawBody from 'raw-body';
import xml2js from 'xml2js';
import { User } from '../sequelize';

/**
 * 检查签名
 */
const checkSignature = function(query: any, token: string) {
  const signature = query.signature;
  const timestamp = query.timestamp;
  const nonce = query.nonce;

  const shasum = crypto.createHash('sha1');
  const arr = [token, timestamp, nonce].sort();
  shasum.update(arr.join(''));

  return shasum.digest('hex') === signature;
};

export async function valid(ctx: Koa.Context) {
  ctx.body = checkSignature(ctx.query, 'hengkx') && ctx.query.echostr;
}

export async function processMsg(ctx: Koa.Context) {
  if (checkSignature(ctx.query, 'hengkx')) {
    const rawBody = await getRawBody(ctx.req, {
      length: ctx.request.length,
      limit: '1mb',
      encoding: ctx.request.charset || 'utf-8',
    });
    const {
      ToUserName,
      FromUserName,
      MsgType,
      Content,
      MsgId,
      CreateTime,
      EventKey,
      Event,
      ...others
    } = await xml2js.parseStringPromise(rawBody, {
      trim: true,
      explicitArray: false,
      explicitRoot: false,
    });
    console.log(FromUserName, Event, others);
    if (Event === 'TEMPLATESENDJOBFINISH') {
      return;
    }
    const res = {
      Content,
      MsgType,
      CreateTime: new Date().getTime(),
      ToUserName: FromUserName,
      FromUserName: ToUserName,
    };
    if (MsgType === 'event' && Event === 'SCAN') {
      res.MsgType = 'text';

      let user = await User.findOne({ where: { deviceId: EventKey } });
      if (user === null) {
        user = await User.create({ deviceId: EventKey, openId: FromUserName });
      } else {
        user.openId = FromUserName;
        await user.save();
      }

      res.Content = `${EventKey} 绑定成功`;
    }
    const builder = new xml2js.Builder({ rootName: 'xml' });
    const xml = builder.buildObject(res);
    ctx.body = xml;
  }
}
