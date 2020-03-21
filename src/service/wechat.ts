import requestPromise from 'request-promise';
import config from '../config';
import { Cache } from '../sequelize';

const rp = requestPromise.defaults({ json: true });

const { appId, appSecret } = config.wechat;

const baseUrl = 'https://api.weixin.qq.com';

export async function getAccessToken() {
  let cache = await Cache.findOne({ where: { type: 'wechat_access_token' } });
  if (!cache || cache.expireTime < Date.now() / 1000) {
    const url = `${baseUrl}/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
    const { access_token } = await rp.get(url);
    if (cache === null) {
      cache = await Cache.create({
        type: 'wechat_access_token',
        value: access_token,
        expireTime: Date.now() / 1000 + 7000,
      });
    } else {
      cache.value = access_token;
      cache.expireTime = Date.now() / 1000 + 7000;
      await cache.save();
    }
  }
  return cache.value;
}

export async function getQrStrScene(str: string, expireSeconds = 3000) {
  const accessToken = await getAccessToken();
  const qrCodeUrl = `${baseUrl}/cgi-bin/qrcode/create?access_token=${accessToken}`;
  const res = await rp.post(qrCodeUrl, {
    body: {
      expire_seconds: expireSeconds,
      action_name: 'QR_STR_SCENE',
      action_info: {
        scene: {
          scene_str: str,
        },
      },
    },
  });
  return res;
}

export async function sendMsgTpl(data: any) {
  const accessToken = await getAccessToken();
  const url = `${baseUrl}/cgi-bin/message/template/send?access_token=${accessToken}`;
  const res = await rp.post(url, {
    body: data,
  });
  return res;
}

export async function sendMsg(data: any) {
  const accessToken = await getAccessToken();
  const url = `${baseUrl}/cgi-bin/message/custom/send?access_token=${accessToken}`;
  const res = await rp.post(url, {
    body: data,
  });
  return res;
}
