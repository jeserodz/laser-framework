import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import { UserService } from '../services';
import { Validations } from '../utils/validations';
import { jwtConfig } from '../config/jwt';

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      Validations.User.Signup.validateSync(req.body);
      const user = await UserService.create(req.body);
      res.send(user);
    } catch (error) {
      if (error.name === Yup.ValidationError.name) {
        return res.status(422).json(error.toString());
      }
      res.status(error.code || 500).json(error.toString());
      console.trace(error)
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { uuid, issuedDate, expirationDate } = await UserService.authenticate(req.body);
      const jwtToken = jwt.sign({ uuid, issuedDate, expirationDate }, jwtConfig.secret);
      res.json({ token: jwtToken });
    } catch(error) {
      res.status(error.code).json(error.toString());
    }
  }
}
