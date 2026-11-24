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
    showOrganizationDetail,
    showNewOrganizationForm,
    handleCreateOrganization,
    showEditOrganizationForm,
    handleUpdateOrganization
} from './controllers/organizationsController.js';
import {
    showProjects,
    showProjectDetail,
    showNewProjectForm,
    handleCreateProject,
    showEditProjectForm,
    handleUpdateProject
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

const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required.')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters.'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required.')
        .isLength({ min: 10, max: 2000 })
        .withMessage('Description must be between 10 and 2000 characters.'),
    body('contact_email')
        .trim()
        .notEmpty()
        .withMessage('Contact email is required.')
        .isEmail()
        .withMessage('Please provide a valid email address.')
        .normalizeEmail()
];

const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required.')
        .isLength({ min: 3, max: 150 })
        .withMessage('Project title must be between 3 and 150 characters.'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required.')
        .isLength({ min: 10, max: 2000 })
        .withMessage('Description must be between 10 and 2000 characters.'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Location is required.')
        .isLength({ min: 2, max: 150 })
        .withMessage('Location must be between 2 and 150 characters.'),
    body('date')
        .trim()
        .notEmpty()
        .withMessage('Date is required.')
        .isISO8601()
        .withMessage('Please provide a valid date.'),
    body('organization_id')
        .trim()
        .notEmpty()
        .withMessage('Organization is required.')
        .isInt({ min: 1 })
        .withMessage('Please select a valid organization.')
];

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Organizations
router.get('/organizations', showOrganizations);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, handleCreateOrganization);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, handleUpdateOrganization);
router.get('/organization/:id', showOrganizationDetail);

// Projects
router.get('/projects', showProjects);
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, handleCreateProject);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, handleUpdateProject);
router.get('/project/:id', showProjectDetail);

// Categories
router.get('/categories', renderCategories);
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, handleCreateCategory);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, handleUpdateCategory);
router.get('/category/:id', renderCategoryDetails);

export default router;