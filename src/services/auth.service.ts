import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userRepository from "../repositories/user.repository.js";
import { AppError } from "../utils/app-error.js";
import {
  RegisterDto,
} from "../validators/register.validator.js";
import {
  LoginDto,
} from "../validators/login.validator.js";

class AuthService {
  async register(data: RegisterDto) {
    const existingUser =
      await userRepository.findByUsername(
        data.username
      );

    if (existingUser) {
      throw new AppError(
        "Username already exists.",
        409
      );
    }

    const hashedPassword =
      await bcrypt.hash(data.password, 10);

    return userRepository.create({
      username: data.username,
      password: hashedPassword,
      role: data.role,
    });
  }

  async login(data: LoginDto) {
  const user = await userRepository.findByUsername(
    data.username
  );

  if (!user) {
    throw new AppError(
      "Invalid username or password.",
      401
    );
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError(
      "Invalid username or password.",
      401
    );
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
    },
  };
}
}

export default new AuthService();