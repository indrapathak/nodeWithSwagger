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
 *                 description: must be unique
 *               price:
 *                 type: number
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
 *                 description: must be unique
 *               price:
 *                 type: Number
 *               categories:
 *                 type: Array
 *               brand:
 *                 type: string
 *               sellerName:
 *                 type:string
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

