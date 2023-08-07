import User from "../models/user.js";

export const home = async (req, res) => {
  try {
    return res.render("home");
  } catch (error) {
    console.log("Error in home page", error);
  }
};
