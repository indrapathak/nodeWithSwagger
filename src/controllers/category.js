const catrgorySchema = require('../models/category');
const { param,validationResult, check } = require("express-validator");


async function inputValidator(req, res) {
    const errors = await validationResult(req)
    console.log("Inside input Validator", errors)
    if (!errors.isEmpty()) {
        return res.status(400).send({ "message": "Validation failed", "error": errors.errors })
    }
    return
}

const addCategoryValidator = [
    check('title')
        .notEmpty().withMessage("title is required")
        .bail()
        .isString().withMessage("title should be a string")
        .trim()
        .bail()
        .matches(/^[A-Za-z0-9\s]+$/).withMessage("Invalid title,can only contain alphabets and numbers") //String to mach Alphabetical and spaces only
        .bail()
        .not().matches(/^[0-9 ]+$/i).withMessage("title Can not contain only numbers")
        .bail()
        .isLength({ min: 3 }).withMessage("Invalid title,min length should be 3"),

    check('catId')
        .notEmpty().withMessage("Category Id(catId) is required,it cannot be empty")
        .bail()
        .isString().withMessage("catId should be a string")
        .trim()
        .bail()
        .isLength({ min: 3 }).withMessage("Invalid catId,min length should be 3")

]


const updateCategoryValidator = [
    check('title')
    .isString().withMessage("title should be a string")
    .trim()
    .bail()
    .matches(/^[A-Za-z0-9\s]+$/).withMessage("Invalid title,can only contain alphabets and numbers") //String to mach Alphabetical and spaces only
    .bail()
    .not().matches(/^[0-9 ]+$/i).withMessage("title Can not contain only numbers")
    .bail()
    .isLength({ min: 3 }).withMessage("Invalid title,min length should be 3")
]


const fetchCategoryValidator = [
    param('catId').exists().toString()     
]


async function addCategory(req, res) {
    await inputValidator(req, res)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ "message": "Validation failed", "error": errors.errors })
    }
    else {
    try {
        let categorData = new catrgorySchema({
            "title": req.body.title,
            "catId" :req.body.catId
        })
        return categorData.save()
            .then(status => {
                return res.status(200).send({ "message": "Category Added Successfully" })
            })
            .catch(e => {
                //to return db query errors
                console.log("Error:", e)
                if (e.code === 11000) {
                    return res.status(400).send({ "message": "Category already exists" })
                }
                else {
                    return res.status(400).send({ "message": "Internal Server Error!" })
                }
            })
    }
    catch (e) {
        console.log("error in adding category", e)
        res.status(400).send({
            "error": e
        })
    }
}
}

async function updateCategory(req, res) {
    await inputValidator(req, res)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ "message": "Validation failed", "error": errors.errors })
    }
    else {
    try {
        let category = {"title" :req.body["title"]}
        catrgorySchema.updateOne({ "catId": req.params.catId }, { "$set": category })
        .then(status => {
            if (status.n == 1 && status.nModified == 1) {
            
                return res.status(200).send({ "message": "Category Details Updated Successfully" })
            }
            else if (status.n == 1 && status.nModified == 0) {
                return res.status(400).send({ "error": "Category Details Already Updated" })
            }
            else {
                return res.status(400).send({ "error": "Category Not Found" })
            }
        })
        .catch(e => {
            return res.status(400).send({ "error": e })
        })
    }
    catch (e) {
        console.log("error in adding category", e)
        res.status(400).send({
            "error": e
        })
    }
}
}

async function findCategory(req, res) {
    try {
        catrgorySchema.find({})
            .then(data => {
                return res.status(200).send({
                    "categoriesList": data
                })
            }).
            catch(e => {
                console.log("error in fetching", e);
                return res.status(400).send({
                    "error": "Error in fetching Category"
                })
            })
    }
    catch (e) {
        console.log("error in fetching category", e);
        return res.status(400).send({
            "error":"Error in fetching Category"
        })
    }
}

async function findOneCategory(req, res) {
    await inputValidator(req, res)
    const errors = validationResult(req.params);
    if (!errors.isEmpty()) {
        return res.status(400).send({ "message": "Validation failed", "error": errors.errors })
    }
    else {
    try {
        catrgorySchema.findOne({"catId":req.params.catId})
            .then(data => {
                return res.status(200).send({
                    "category": data
                })
            }).
            catch(e => {
                console.log("error in fetching", e);
                return res.status(400).send({
                    "error": "Error in fetching Category"
                })
            })
    }
    catch (e) {
        console.log("error in fetching category", e);
        return res.status(400).send({
            "error":"Error in fetching Category"
        })
    }
}
}

async function deleteCategory(req, res) {
    try {
        catrgorySchema.deleteOne({ "catId": req.params.catId })
        .then(status => {
            if (status.n >= 1 && status.deletedCount >= 1) {
                return res.status(200).send({ "message": "Category Deleted Successfully" })
            }
            else {
                return res.status(400).send({ "error": "Category not found" })
            }
        })
        .catch(error => {
            return res.status(400).send({ "error": "Server Error!" })
        })
    }
    catch (e) {
        console.log("error in deleting category", e)
        res.status(400).send({
            "error": e
        })
    }
}

module.exports = {
    addCategory,
    findCategory,
    updateCategory,
    deleteCategory,
    findOneCategory,
    addCategoryValidator,
    updateCategoryValidator,
    fetchCategoryValidator
}