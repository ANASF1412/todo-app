import { User } from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";

export const register = async (req, res, next) => {
  try {
    const validated = registerSchema.parse(req.body);
    
    const existingUser = await User.findOne({
      $or: [{ email: validated.email }, { username: validated.username }],
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await hashPassword(validated.password);
    const user = await User.create({
      ...validated,
      password: hashedPassword,
    });

    const token = generateToken(user._id);
    res.status(201).json({
      message: "User registered",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const validated = loginSchema.parse(req.body);
    
    const user = await User.findOne({ email: validated.email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await comparePassword(validated.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};
