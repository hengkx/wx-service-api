import * as Koa from 'koa';
import moment from 'moment';
import { sendMsgTpl, sendMsg } from '../service/wechat';

export async function receive(ctx: Koa.Context) {
  const { openId, tel, content, time, ...others } = ctx.request.body;
  const res = await sendMsgTpl({
    touser: openId,
    template_id: 'UAM3XfsH8wcBktFk34HVypEQSOHCLwKaKgN8j1uJnPk',
    data: {
      keyword1: {
        value: tel,
      },
      keyword2: {
        value: moment(time).format('YYYY-MM-DD HH:mm:ss'),
      },
      remark: {
        value: content,
      },
    },
  });
  if (content.length > 182) {
    await sendMsg({
      touser: openId,
      msgtype: 'text',
      text: {
        content,
      },
    });
  }
  ctx.body = res;
}
