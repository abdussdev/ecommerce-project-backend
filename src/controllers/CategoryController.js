const CetagoryModel = require("../models/CategoryModel");

exports.cetagoryList = async (req, res) => {
  try {
    const allCategory = await CetagoryModel.find();
    res.status(200).json(allCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating cetagory list" });
  }
};
