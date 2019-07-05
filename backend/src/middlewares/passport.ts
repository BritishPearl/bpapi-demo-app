import * as passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

export const secret = process.env.JWT_SECRET || 'top-secret';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    done(null, jwtPayload);
  }),
);

export default passport;
