import * as moment from 'moment';
import { Token } from '../models';
import { Errors } from '../utils/errors';

export class AuthService {
  static async verifyToken(jwtPayload: any): Promise<Token> {
    const token = await Token.findOne({
      where: { uuid: jwtPayload.uuid },
      relations: ['user']
    });

    if (!token) {
      throw Errors.Token.NOT_FOUND;
    }

    if (moment().isAfter(token.expirationDate)) {
      throw Errors.Token.EXPIRED;
    }

    return token;
  }
}
