import prisma from "../../../PrismaClient.js";

export const addClothes = async (req, res) => {
  try {
    const { name, price, discountPrice, description, image, category } =
      req.body;

    if (!name || !price || !discountPrice || !image || !category) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const cloth = await prisma.clothes.create({
      data: {
        name,
        price,
        discountPrice,
        description,
        image,
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

    const cloth = await prisma.clothes.update({
      where: { id },
      data: req.body,
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
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
