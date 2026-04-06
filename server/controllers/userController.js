import { User } from "../models/User.js";
import { updateSchema } from "../validators/authValidator.js";

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const validated = updateSchema.parse(req.body);
    
    const user = await User.findByIdAndUpdate(req.userId, validated, {
      new: true,
    }).select("-password");
    
    res.json({ message: "Updated", user });
  } catch (error) {
    next(error);
  }
};
