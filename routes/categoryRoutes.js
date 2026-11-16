import express from 'express';
import { renderCategoryDetails } from '../controllers/categoryController.js';

const router = express.Router();

// Route for category details page
router.get('/category/:id', renderCategoryDetails);

export default router;