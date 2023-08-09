import { hashPassword } from "../helper/userHelper.js";
import User from "../models/user.js";

export const createSession = async (req, res) => {
  try {
    return res.redirect("/");
  } catch (error) {
    console.log("Error in creating session", error);
  }
};

export const create = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;

    if (password != confirm_password) {
      return res.redirect("back");
    }
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      console.log("User is already Exists");
      return res.redirect("back");
    }
    const hashedPass = await hashPassword(password);
    const user = new User({
      name,
      email,
      password: hashedPass,
    });
    await user.save();
    console.log("User created", user);
    return res.redirect("/");
  } catch (error) {
    console.log("Error in Creating User", error);
  }
};
