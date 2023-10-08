const {
  productByBrand,
  productByCategory,
  productBySmilierLimit10,
  productByRemark,
  productByKeyword,
  productSlider,
} = require("../services/ProductService");

exports.listByBrand = async (req, res) => {
  let result = await productByBrand(req);
  return res.status(200).json(result);
};

exports.listByCategory = async (req, res) => {
  let result = await productByCategory(req);
  return res.status(200).json(result);
};

exports.listBySmilier = async (req, res) => {
  let result = await productBySmilierLimit10(req);
  return res.status(200).json(result);
};

exports.listByRemark = async (req, res) => {
    let result= await  productByRemark(req)
    return res.status(200).json(result)
};

exports.sliderList = async (req, res) => {
    let result=await  productSlider(req)
    return res.status(200).json(result)
};

exports.listByKeyword = async (req, res) => {
    let result=await  productByKeyword(req)
    return res.status(200).json(result)
};
