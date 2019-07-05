import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { secret } from '../middlewares/passport';

import User from '../models/UserStore';

const opts = { expiresIn: 3600 };

const respond401 = (res: any) => res.status(401).json({ message: 'Auth Failed' });

// login controller
export const loginUser = (req: any, res: any) => {
  const { email, password } = req.body;
  const user = User.getUserByEmail(email);
  if (user) {
    const match = bcrypt.compareSync(password.toString(), user.password);
    if (!match) {
      return respond401(res);
    }
    const token = jwt.sign({ id: user.id }, secret, opts);
    return res.status(200).json({
      message: 'Auth Passed',
      token,
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    });
  } else {
    return respond401(res);
  }
};
