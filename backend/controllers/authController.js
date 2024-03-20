import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

//post registration
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Registered Please Login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
     
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//post login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(406).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//test
export const testController = (req, res) => {
  res.send("Protected Route");
};

export const getUsersController = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).send({
      success: true,
      users: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting users",
      error,
    });
  }
};

export const checkInController = async (req, res) => {
  try {
    const userId = req.user._id;

    await userModel.findByIdAndUpdate(userId, {
      $push: { checkIns: new Date() },
    });
   
    res.status(200).send({ success: true, message: "Check-in recorded" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Failed to record check-in" });
  }
};

export const checkOutController = async (req, res) => {
  try {
    const userId = req.user._id;

    await userModel.findByIdAndUpdate(userId, {
      $push: { checkOuts: new Date() },
    });
   
    res.status(200).send({ success: true, message: "Check-out recorded" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Failed to record check-out" });
  }
};

export const getUserAttendanceController = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

   
    const { checkIns, checkOuts } = user;

   
    res.status(200).send({ success: true, checkIns, checkOuts });
  } catch (error) {
    console.error("Error fetching user attendance:", error);
    res
      .status(500)
      .send({ success: false, message: "Failed to fetch user attendance" });
  }
};
