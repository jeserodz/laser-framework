const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
import { AuthService } from '../services';
import { jwtConfig } from './jwt';

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.secret,
};

passport.use('jwt', new JWTStrategy(opts, async (jwtPayload, done) => {
  try {
    const token = await AuthService.verifyToken(jwtPayload);
    const user = token.user;
    done(null, user);
  } catch (error) {
    done(null, false, error.toString());
  }
}))
