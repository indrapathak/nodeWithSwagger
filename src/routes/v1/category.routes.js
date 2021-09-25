const express = require('express');
const category = require('../../controllers/category')


const router = express.Router();

router
  .route('/')
  .post( category.addCategoryValidator,category.addCategory)
  .get( category.findCategory)
  
router
  .route('/:catId')
  .get(category.findOneCategory)
  .patch(category.updateCategoryValidator,category.updateCategory)
  .delete(category.deleteCategory)


module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category CRUD API's
 * @swagger
 * /category:
 *   post:
 *     summary: Add a category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - catId
 *             properties:
 *               title:
 *                 type: string
 *                 description: title must be string,canBe alphanumeric and minimum length 3
 *               catId:
 *                 type: string
 *                 description: must be string,unique,have minumum length3
 *             example:
 *               title: category1
 *               catId: catId
 *     responses:
 *       "200":
 *         description: Category Added Succesfully
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Category'
 *       "400":
 *         $ref: '#/components/responses/responses'
 *      
 *
 *   get:
 *     summary: Get all category
 *     tags: [Category]
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
 *                 categoriesList:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 * 
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *               example:
 *                 code: 400 
 *                 error: Error in fetching Category
  */


/**
 * @swagger
 * /category/{catId}:
 *   get:
 *     summary: Get a Category
 *     description: For finding a single category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: catId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Category'
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *               example:
 *                 code: 400 
 *                 error: Error in fetching Category
 *   patch:
 *     summary: Update a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: catId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *             description: title must be string,canBe alphanumeric and minimum length 3
 *             example:
 *               title: category1
 *     responses:
 *       "200":
 *         description: Category Details Updated Successfully
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Category'
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *               example:
 *                 code: 400 
 *                 error: Category Not Found
 *              
 *      
 *   delete:
 *     summary: Delete a Category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: catId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category Id
 *     responses:
 *       "200":
 *         description: Category Deleted Successfully
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *               example:
 *                 code: 400 
 *                 error: Category not found  
 *      
 */

