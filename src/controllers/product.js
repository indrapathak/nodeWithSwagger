const productSchema = require('../models/product');
const productController = require('../controllers/product');
const { check, validationResult } = require("express-validator")

async function inputValidator(req, res) {
    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ "message": "Validation failed", "error": errors.errors })
    }
    return
}



const productAddValidator = [
    check('name')
        .notEmpty().withMessage("Name is required")
        .bail()
        .isString().withMessage("Name should be a string")
        .trim()
        .bail()
        .matches(/^[a-zA-Z0-9 ]+$/i).withMessage("Name can only contain number and alphabets")
        .bail()
        .not().matches(/^[0-9 ]+$/i).withMessage("Can not contain only numbers")
        .bail()
        .isLength({ min: 3 }).withMessage("Length should be greater then 3"),

    check('price')
        .notEmpty().withMessage("Price is required")
        .bail()
        .isNumeric().withMessage("Price should be a number")
        .bail(),

    check('sellerName')
        .isString().withMessage("sellerName should be a string")
        .trim()
        .bail()
        .matches(/^[a-zA-Z0-9 ]+$/i).withMessage("sellerName can only contain alphabets and number")
        .bail()
        .not().matches(/^[0-9 ]+$/i).withMessage("sellerName Can not contain only numbers")
        .bail()
        .isLength({ min: 3 }).withMessage("sellerName length should be greater then 3"),

    check('brand')
        .isString().withMessage("brand should be a string"),

    check('categories')
        .isArray().withMessage("Categories should be an Array")
        .bail()
        .custom(arr => {
            return arr.every((ele) => {
                if (typeof ele == 'string' && (ele.length >= 3)) {
                    return true;
                } else {
                    return false;
                }
            })
        })
        .withMessage('Categories Should be an Array of Strings,containing only aplphabets and numbers and have min lenght 3 ')
        .bail()
        .custom(arr => {
            let uniqueArr = []
            return arr.every((ele) => {             
                if (uniqueArr.includes(ele)) {
                    return false; 
                } else {
                    uniqueArr.push(ele);
                    return true;
                }
            })
        })
        .withMessage('Categories  Array Should be an array with unique elements'),
]


const productUpdateValidator = [
   
    check('price')
        .isNumeric().withMessage("Price should be a number"),

    check('sellerName')
        .isString().withMessage("sellerName should be a string")
        .trim()
        .bail()
        .matches(/^[a-zA-Z0-9 ]+$/i).withMessage("sellerName can only contain alphabets and number")
        .bail()
        .not().matches(/^[0-9 ]+$/i).withMessage("sellerName Can not contain only numbers")
        .bail()
        .isLength({ min: 3 }).withMessage("sellerName length should be greater then 3"),

    check('brand')
        .isString().withMessage("brand should be a string"),

    check('categories')
        .isArray().withMessage("Categories should be an Array")
        .bail()
        .custom(arr => {
            return arr.every((ele) => {
                if (typeof ele == 'string' && (ele.length >= 3)) {
                    return true;
                } else {
                    return false;
                }
            })
        })
        .withMessage('Categories Should be an Array of Strings,containing only aplphabets and numbers and have min lenght 3 ')
        .bail()
        .custom(arr => {
            let uniqueArr = []
            return arr.every((ele) => {             
                if (uniqueArr.includes(ele)) {
                    return false; 
                } else {
                    uniqueArr.push(ele);
                    return true;
                }
            })
        })
        .withMessage('Categories  Array Should be an array with unique elements'),
]

async function addProduct(req, res) {
    await inputValidator(req, res)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ "message": "Validation failed", "error": errors.errors })
    }
    else {
        try {
            let productData = {};
            for (let bodyParams in req.body) {
                productData[bodyParams] = req.body[bodyParams];
            }
            console.log("product", productData)
            let saveProduct = new productSchema(productData);
            return saveProduct.save()
                .then(status => {
                    return res.status(200).send({ "message": "Product Added Successfully" })
                })
                .catch(e => {
                    console.log("Error:", e)
                    if (e.code === 11000) {
                        return res.status(400).send({ "error": "Product already exists", "error": e })
                    }
                    else {
                        return res.status(400).send({ "error": "Product Server Error!", "error": e })
                    }
                })
        }

        catch (e) {
            console.log("error", e)
            return res.status(400).send({
                "error": e
            })
        }
    }
}

async function findProduct(req, res) {
        try {
            productSchema.find({})
                .then(data => {
                    return res.status(200).send({
                        "productList": data
                    })
                }).
                catch(e => {
                    console.log("error in fetching", e);
                    return res.status(400).send({
                        "error": "Error in Fetching Product"
                    })
                })
        }
        catch (e) {
            console.log("error in fetching product", e);
            return res.status(400).send({
                "error": "Error in Fetching Product"
            })
        }
}

async function findOneProduct(req, res) {
    try {
        productSchema.findOne({"name":req.params.name})
            .then(data => {
                return res.status(200).send({
                    "product": data
                })
            }).
            catch(e => {
                console.log("error in fetching", e);
                return res.status(400).send({
                    "error": "Error in Fetching Product"
                })
            })
    }
    catch (e) {
        console.log("error in fetching product", e);
        return res.status(400).send({
            "error": "Error in Fetching Product"
        })
    }
}

async function updateProduct(req, res) {
    await inputValidator(req, res)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ "message": "Validation failed", "error": errors.errors })
    }
    else {
        try {
            let productData = {};
            for (let bodyParams in req.body) {
                productData[bodyParams] = req.body[bodyParams];
            }
            productSchema.updateOne({ "name": req.params.name }, { "$set": productData })
                .then(status => {
                    if (status.n == 1 && status.nModified == 1) {

                        return res.status(200).send({ "message": "product Details Updated Successfully" })
                    }
                    else if (status.n == 1 && status.nModified == 0) {
                        return res.status(400).send({ "error": "product Details Already Updated" })
                    }
                    else {
                        return res.status(400).send({ "error": "product Not Found" })
                    }
                })
                .catch(e => {
                    console.log("Query catch error", e)
                    return res.status(400).send({ "error": "Server Error" })
                })
        }
        catch (e) {
            console.log("error in adding product", e)
            res.status(400).send({
                "error": e
            })
        }
    }
}


async function deleteProduct(req, res) {
    try {
        productSchema.deleteOne({ "name": req.params.name })
            .then(status => {
                if (status.n >= 1 && status.deletedCount >= 1) {
                    return res.status(200).send({ "message": "product Deleted Successfully" })
                }
                else {
                    return res.status(400).send({ "error": "product not found" })
                }
            })
            .catch(error => {
                return res.status(400).send({ "error": "Server Error!" })
            })
    }
    catch (e) {
        console.log("error in deleting product", e)
        res.status(400).send({
            "error": e
        })
    }
}

module.exports = {
    addProduct,
    updateProduct,
    findProduct,
    deleteProduct,
    findOneProduct,
    productAddValidator,
    productUpdateValidator
}