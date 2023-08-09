import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/user.js";

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        let user = await User.findOne({ email: email });
        if (!user || user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        console.log("Error in finding user --> Passport", error);
        return done(error);
      }
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findById(id);
    return done(null, user);
  } catch (error) {
    console.log("Error in finding user --> Passport", error);
    return done(error);
  }
});

// check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  // if the user is not signed in
  return res.redirect("/user/sign-in");
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

export default passport;
