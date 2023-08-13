import User from "../models/user.js";

export const home = async (req, res) => {
  try {
    return res.render("home");
  } catch (error) {
    console.log("Error in home page", error);
  }
};

export const signIn = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect(`/`);
    }
    return res.render("sign-in");
  } catch (error) {
    console.log("Error in sign in page", error);
  }
};

export const signUp = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect(`/`);
    }
    return res.render("sign-up");
  } catch (error) {
    console.log("Error in sign up page", error);
  }
};

export const studentPage = (req, res) => {
  // try {
  //   if (req.isAuthenticated()) {
  //     return res.render("student-page");
  //   }
  return res.redirect("/user/sign-in");
  // } catch (error) {
  //   console.log("Error in student page", error);
  // }
};

export const logOut = async (req, res) => {
  try {
    req.logout();
    return res.redirect("/");
  } catch (error) {
    console.log("Error in log out", error);
  }
};
