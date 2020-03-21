import * as jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError';

const authorize = async (ctx: any, next: any) => {
  const token = ctx.header.authorization;
  if (token) {
    try {
      const decode = await jwt.verify(token.split(' ')[1], 'finance');
      ctx.user = (<any>decode).data;
    } catch (error) {
      // if (!/^\/api\/account/.exec(ctx.url)) {
      //   throw new ApiError('UN_AUTHORIZE');
      // }
    }
  }

  return next().catch((err: any) => {
    if (err.status === 401) {
      throw new ApiError('UN_AUTHORIZE');
    } else {
      console.log(err);
      throw err;
    }
  });
};

export default authorize;
