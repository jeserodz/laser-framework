import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import * as moment from 'moment';
import { User, Token } from '../models';
import { UserSignupDto, UserLoginDto } from '../utils/types';
import { Errors } from '../utils/errors';

export class UserService {
  static async create(data: UserSignupDto): Promise<User> {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = bcrypt.hashSync(data.password, 10);
    await user.save();
    return user;
  }

  static async authenticate(data: UserLoginDto): Promise<Token> {
    const user = await User.findOne({ where: { email: data.email } } );

    if (!user) {
      throw Errors.User.NOT_FOUND;
    }

    if (!bcrypt.compareSync(data.password, user.password)) {
      throw Errors.User.INVALID_CREDENTIALS;
    }

    const token = new Token();
    token.userId = user.id;
    token.uuid = uuid.v4();
    token.issuedDate = new Date();
    token.expirationDate = moment().add(30, 'days').toDate();
    await token.save();
    return token;
  }
}
