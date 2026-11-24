import express from 'express';
import { body } from 'express-validator';
import {
    renderCategoryDetails,
    showNewCategoryForm,
    handleCreateCategory,
    showEditCategoryForm,
    handleUpdateCategory
} from '../controllers/categoryController.js';

const router = express.Router();

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required.')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters.')
];

// Route for category details page
router.get('/category/:id', renderCategoryDetails);

// Routes for creating a new category
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, handleCreateCategory);

// Routes for editing an existing category
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, handleUpdateCategory);

export default router;