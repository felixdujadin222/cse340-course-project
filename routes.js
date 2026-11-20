import express from 'express';
import {
    renderCategories,
    renderCategoryDetails
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

export default router;