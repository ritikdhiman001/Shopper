import prisma from "../../../PrismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  const { name, phone, address, email, password } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Fill The Name",
    });
  } else if (!email) {
    return res.status(400).json({
      success: false,
      message: "Fill The Email",
    });
  } else if (!address) {
    return res.status(400).json({
      success: false,
      message: "Fill The Address",
    });
  } else if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Fill The Phone Number",
    });
  } else if (!password) {
    return res.status(400).json({
      success: false,
      message: "Fill The Password",
    });
  }

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

// Login User

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Fill The Email Address",
    });
  } else if (!password) {
    return res.status(400).json({
      success: false,
      message: "Fill The Password",
    });
  }

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

// Get User

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

// Delete User

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "User Delete Successfull",
      data: user,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update User

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, address, phone } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Fill The Name",
    });
  }
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Fill The Email",
    });
  }
  if (!address) {
    return res.status(400).json({
      success: false,
      message: "Fill The Address",
    });
  }
  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Fill The Phone Number",
    });
  }
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        address,
        phone,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        phone: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "Email Already Exist",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
