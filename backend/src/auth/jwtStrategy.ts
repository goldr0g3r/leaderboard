import { PassportStatic } from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import environment from "../config/environment";

export default function JwtLocalStrategy(passport: PassportStatic) {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: environment.accessTokenSecret,
      },
      async function (user: any, done) {
        try {
          return done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
}
