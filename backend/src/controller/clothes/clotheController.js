import prisma from "../../../PrismaClient.js";
import cloudinary from "../../config/cloudinary.js";

export const addClothes = async (req, res) => {
  try {
    const { name, price, discountPrice, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    if (!name || !price || !discountPrice || !category) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Fields",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "Products" },
        (error, uploadedImage) => {
          if (error) reject(error);
          else resolve(uploadedImage);
        },
      );
      stream.end(req.file.buffer);
    });

    const cloth = await prisma.clothes.create({
      data: {
        name,
        price: Number(price),
        discountPrice: Number(discountPrice),
        description,
        image: result.secure_url,
        category,
      },
    });
    res.status(201).json({
      success: true,
      data: cloth,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const getClothes = async (req, res) => {
  try {
    const { category } = req.query;

    const clothes = await prisma.clothes.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      data: clothes,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

export const getClothesById = async (req, res) => {
  const { id } = req.params;
  try {
    const cloth = await prisma.clothes.findUnique({
      where: { id },
    });

    if (!cloth) {
      return res.status(404).json({
        success: false,
        message: "Cloth not found",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Cloth fetch Successfull", data: cloth });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateClothes = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, discountPrice, description, category } = req.body;

    let imageUrl;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "Products" },
          (error, uploadedImage) => {
            if (error) reject(error);
            else resolve(uploadedImage);
          },
        );
        stream.end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }

    const cloth = await prisma.clothes.update({
      where: { id },
      data: {
        name,
        price: Number(price),
        discountPrice: Number(discountPrice),
        description,
        category,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    res.status(200).json({
      success: true,
      data: cloth,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteClothes = async (req, res) => {
  try {
    const { id } = req.params;

    const cloth = await prisma.clothes.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Cloth Delete Successfull",
      data: cloth,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
