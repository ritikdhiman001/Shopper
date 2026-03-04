import prisma from "../../../PrismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, phone, address, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        address,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.USERSECRETKEY,
      { expiresIn: "1d" },
    );

    return res.status(201).json({
      success: true,
      message: "User Registration Successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "Email Already Exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.USERSECRETKEY,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      where: { role: "USER" },
      select: {
        id: true,
        name: true,
        phone: true,
        address: true,
        email: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User Fetch Successfull",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
