const BrandModel = require("../models/BrandModel");

exports.brandList = async (req, res) => {
  try {
    const allBrand = await BrandModel.find();
    res.status(200).json(allBrand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating brand list" });
  }
};
