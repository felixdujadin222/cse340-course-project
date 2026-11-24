import express from 'express';
import { body } from 'express-validator';
import {
    renderCategories,
    renderCategoryDetails,
    showNewCategoryForm,
    handleCreateCategory,
    showEditCategoryForm,
    handleUpdateCategory
} from './controllers/categoryController.js';
import {
    showOrganizations,
    showOrganizationDetail
} from './controllers/organizationsController.js';
import {
    showProjects,
    showProjectDetail
} from './controllers/projectsController.js';

const router = express.Router();

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required.')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters.')
];

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Organizations
router.get('/organizations', showOrganizations);
router.get('/organization/:id', showOrganizationDetail);

// Projects
router.get('/projects', showProjects);
router.get('/project/:id', showProjectDetail);

// Categories
router.get('/categories', renderCategories);
router.get('/category/:id', renderCategoryDetails);
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, handleCreateCategory);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, handleUpdateCategory);

export default router;