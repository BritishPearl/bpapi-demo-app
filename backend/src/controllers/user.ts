import UserStore, { RegData } from '../models/UserStore';
import * as schema from '../helpers/validator';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { validate } from 'validate-typescript';

dotenv.config();

const message404 = 'User could not be found';

// register user
export const addUser = (req: Request, res: Response) => {
  try {
    const registrationData: RegData = validate(schema.registrationDataSchema, req.body);
    const userId = UserStore.newUser(registrationData);

    if (!userId) {
      res.status(400).json('This email address is already registered.');
    } else {
      res.status(201).json(userId);
    }
  } catch (ex) {
    res.status(400).json(ex);
  }
};

// retrieve authenticated user
export const getAuthenticatedUser = (req: Request, res: Response) => {
  const userId = res.req ? res.req.user.id : null;
  const user = UserStore.getUserById(userId);
  if (!user) {
    res.status(404).json(message404);
  } else {
    res.status(200).json({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    });
  }
};
