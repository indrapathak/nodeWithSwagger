const express = require('express');
const product = require('../../controllers/product')

const router = express.Router();

router
.route('/')
.post(product.productAddValidator,product.addProduct)
.get( product.findProduct)

router
.route('/:name')
.get( product.findOneProduct)
.patch(product.productUpdateValidator,product.updateProduct)
.delete(product.deleteProduct)

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product CRUD API's
 */
/**
 * @swagger
 * /product:
 *   post:
 *     summary: Add a product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name is required,can be alphanumeric and should have minimum length3
 *               price:
 *                 type: number
 *                 description: Price is required and it should be a number
 *               sellerName:
 *                 type: string
 *                 description: Seller name should be a string,can be alphanumeric and minimum length 3
 *               brand:
 *                 type: string
 *                 description: Brand should be a string
 *               categories:
 *                 type: Array
 *                 description: Categories should be an array of unique string,each elment min length 3
 *                
 *             example:
 *                  name: product1
 *                  price: 100
 *                  categories: [category1,category2]
 *                  brand: brand1
 *                  sellerName: seller1
 *                  
 *                  
 *     responses:
 *       "200":
 *         description: Product Added Succesfully
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       "400":
 *         $ref: '#/components/responses/responses'
 *      
 *
 *   get:
 *     summary: Get all Product
 *     tags: [Product]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productList:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *               example:
 *                 code: 400 
 *                 error: Error in Fetching Product
 */
/**
 * @swagger
 * /product/{name}:
 *   get:
 *     summary: Get a Product
 *     description: For finding a single product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Product Name
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *               example:
 *                 code: 400 
 *                 error: Error in Fetching Product
 *   patch:
 *     summary: Update a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Product name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name is required,can be alphanumeric and should have minimum length 3
 *               price:
 *                 type: Number
 *                 description: Price should be a number
 *               categories:
 *                 type: Array
 *                 description: Categories should be an array of unique string,each elment min length 3
 *               brand:
 *                 type: string
 *                 description: Brand should be a string
 *               sellerName:
 *                 type: string
 *                 description: Seller name should be a string,can be alphanumeric and minimum length 3
 *             example:
 *               name: product1
 *               price: 100
 *               categories:  [category5,category6]
 *               sellerName: seller1
 *               brand: brand1
 *     responses:
 *       "200":
 *         description: product Details Updated Successfully
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *               example:
 *                 code: 400 
 *                 error: product Not Found
 *              
 *      
 *   delete:
 *     summary: Delete a Product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Product Name
 *     responses:
 *       "200":
 *         description: product Deleted Successfully
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *               example:
 *                 code: 400 
 *                 error: product Not Found  
 *      
 */

