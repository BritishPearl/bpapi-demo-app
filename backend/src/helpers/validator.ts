import { Email, RegEx, Optional, Type } from 'validate-typescript';
const IsNotEmptyString = RegEx(/.+/);

export const registrationDataSchema = {
  name: IsNotEmptyString,
  surname: IsNotEmptyString,
  email: Email(),
  password: IsNotEmptyString,

};

export const updateDateSchema = {
  name: Optional(IsNotEmptyString),
  surname: Optional(IsNotEmptyString),
  email: Optional(Email()),
};

export const authorizationTokenConfigSchema = {
  code: IsNotEmptyString,
  redirect_uri: IsNotEmptyString,
};
