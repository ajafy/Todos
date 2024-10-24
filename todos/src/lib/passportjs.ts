// import passport from "passport";
// import GoogleStrategy from "passport-google-oauth20";
// import dotenv from "dotenv";
// import { gender_type, User } from "../../User/dto/userType";
// import {
//   createUser,
//   getUserByGoogleEmail,
//   getUserByUsername,
// } from "../../Database/Queries";

// dotenv.config();

// passport.use(
//   new GoogleStrategy.Strategy(
//     {
//       clientID: `${process.env.G_CLIENT_ID}`,
//       clientSecret: `${process.env.G_CLIENT_SECRET}`,
//       callbackURL: `${process.env.G_CB_URL}`,
//     },
//     async (accessToken, refreshToken, profile, cb) => {
//       try {
//         if (profile && profile.emails && profile.emails[0].value) {
//           const user = await getUserByGoogleEmail(profile.emails[0].value);
//           if (user) {
//             return cb(null, user);
//           } else {
//             const date = new Date().getTime().toString();
//             const username = (await getUserByUsername(profile.displayName))
//               ? profile.displayName + date
//               : profile.displayName;

//             const firstname = profile.name?.givenName || "";
//             const lastname = profile.name?.familyName || "";
//             const email = profile.emails[0].value;
//             const hashed_password = null;
//             const gender = gender_type.Male;
//             const sexual_preference = gender_type.Female;

//             const newUser = await createUser(
//               username,
//               firstname,
//               lastname,
//               email,
//               hashed_password,
//               gender,
//               sexual_preference
//             );

//             if (newUser) return cb(null, newUser);
//           }
//         }
//         return cb(null, false);
//       } catch (error) {
//         return cb(error);
//       }
//     }
//   )
// );

// // Serialize and deserialize user to manage sessions
// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await getUserById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });

// export default passport;
