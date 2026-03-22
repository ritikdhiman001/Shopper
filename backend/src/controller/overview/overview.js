import prisma from "../../../PrismaClient.js";

export const overviewData = async (req, res) => {
  try {
    const totalUser = await prisma.user.count({
      where: {
        role: "USER",
      },
    });
    const totalMen = await prisma.clothes.count({
      where: {
        category: "MEN",
      },
    });
    const totalWomen = await prisma.clothes.count({
      where: {
        category: "WOMEN",
      },
    });
    const totalKids = await prisma.clothes.count({
      where: {
        category: "KIDS",
      },
    });

    res.status(200).json({
      success: true,
      totalMen,
      totalWomen,
      totalKids,
      totalUser,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
