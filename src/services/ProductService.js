const ProductModel = require("../models/ProductModel");
const ProductSliderModel = require("../models/ProductSliderModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const productByBrand = async (req, res) => {
  try {
    let brandID=new ObjectId(req.params.brandID)

        let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        let matchStage= {$match: {brandID:brandID}}

        let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
        let unwindCategoryStage={$unwind: "$category"}
        let unwindBrandStage={$unwind: "$brand"}

        let data=await ProductModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])

        return {status:"success", data:data}
  } catch (error) {
    return {status:"fail", data:error.toString()}
  }
};

const productByCategory = async (req, res) => {
  try {
    let categoryID=new ObjectId(req.params.categoryID)

        let JoinStage1 = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinStage2 = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        let matchStage = {$match: {categoryID:categoryID}}

        let projectionStage = {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
        let unwindCategoryStage ={$unwind: "$category"}
        let unwindBrandStage ={$unwind: "$brand"}

        let data=await ProductModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])

        return {status:"success", data:data}
  } catch (error) {
    return {status:"fail", data:error.toString()}
  }
};

const productBySmilierLimit10 = async (req, res) => {
  try {
    let categoryID=new ObjectId(req.params.categoryID)

        let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        let matchStage= {$match: {categoryID:categoryID}}

        let limit= {$limit:10}

        let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
        let unwindCategoryStage={$unwind: "$category"}
        let unwindBrandStage={$unwind: "$brand"}

        let data=await ProductModel.aggregate([matchStage,limit, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])

        return {status:"success", data:data}
  } catch (error) {
    return {status:"fail", data:error.toString()}
  }
};

const productByRemark = async (req, res) => {
  try {
    let remark=req.params.remark

        let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};

        let matchStage= {$match: {remark:remark}}

        let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}

        let unwindCategoryStage={$unwind: "$category"}
        let unwindBrandStage={$unwind: "$brand"}

        let data=await ProductModel.aggregate(
            [matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage]
        )

        return {status:"success", data:data}
  } catch (error) {
    return {status:"fail", data:error.toString()}
  }
};

const productByKeyword = async (req, res) => {
  try {
    let SearchRegex = {"$regex": req.params.keyword, "$options": "i"}
        let SearchParam = [{title: SearchRegex},{shortDes: SearchRegex}]
        let SearchQuery = {$or:SearchParam}

        let matchStage=  {$match: SearchQuery};

        let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};

        let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
        let unwindCategoryStage={$unwind: "$category"}
        let unwindBrandStage={$unwind: "$brand"}

        let data=await ProductModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage])

        return {status:"success", data:data}
  } catch (error) {
    return {status:"fail", data:error.toString()}
  }
};

const productSlider = async (req, res) => {
  try {
    let matchStage= {$match: {}}
        let limit= {$limit:5}
        let data=await ProductSliderModel.aggregate([matchStage,limit])
        return {status:"success", data:data}
  } catch (error) {
    return {status:"fail", data:e.toString()}
  }
};

module.exports = {
  productByBrand,
  productByCategory,
  productBySmilierLimit10,
  productByRemark,
  productByKeyword,
  productSlider,
};
