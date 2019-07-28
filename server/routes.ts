import { Router } from 'express';
import { AuthController } from './controllers';
import { ValidateToken } from './middlewares';

const router = Router();

// Auth
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

router.get('/secured', ValidateToken, (req, res) => {
  res.send(req.user);
});

module.exports = router;
