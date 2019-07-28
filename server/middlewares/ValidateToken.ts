import { Request, Response, NextFunction } from 'express';
import * as status from 'statuses';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../services';
import { jwtConfig } from '../config/jwt';

export async function ValidateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization;
    const jwtToken = auth.replace('Bearer ', '');
    const jwtPayload = jwt.verify(jwtToken, jwtConfig.secret);
    const token = await AuthService.verifyToken(jwtPayload);
    req.user = token.user;
    next();
  } catch(error) {
    res.status(status('Unauthorized')).json(error.toString());
  }
}
