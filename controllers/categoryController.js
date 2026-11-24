import { validationResult } from 'express-validator';
import {
    getCategories,
    getCategoryById,
    getProjectsByCategoryId,
    createCategory,
    updateCategory
} from '../models/categories.js';

/**
 * Renders the categories list page.
 */
export const renderCategories = async (req, res, next) => {
    try {
        const categories = await getCategories();
        res.render('categories', {
            title: 'Service Categories',
            categories
        });
    } catch (err) {
        console.error('Error rendering categories:', err);
        next(err);
    }
};

/**
 * Renders the category details page with its associated service projects.
 */
export const renderCategoryDetails = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render('404', { title: 'Category Not Found' });
        }

        const projects = await getProjectsByCategoryId(categoryId);

        res.render('category-details', {
            title: category.name,
            category,
            projects
        });
    } catch (err) {
        console.error('Error rendering category details:', err);
        next(err);
    }
};

/**
 * Renders the form to create a new category.
 */
export const showNewCategoryForm = (req, res) => {
    res.render('new-category', {
        title: 'New Category',
        errors: [],
        category: { name: '' }
    });
};

/**
 * Processes the POST request to create a new category.
 */
export const handleCreateCategory = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        const name = req.body.name ? req.body.name.trim() : '';

        if (!errors.isEmpty()) {
            return res.status(400).render('new-category', {
                title: 'New Category',
                errors: errors.array(),
                category: { name }
            });
        }

        await createCategory(name);
        res.redirect('/categories');
    } catch (err) {
        console.error('Error creating category:', err);
        next(err);
    }
};

/**
 * Renders the form to edit an existing category.
 */
export const showEditCategoryForm = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render('404', { title: 'Category Not Found' });
        }

        res.render('edit-category', {
            title: `Edit ${category.name}`,
            errors: [],
            category
        });
    } catch (err) {
        console.error('Error loading edit category form:', err);
        next(err);
    }
};

/**
 * Processes the POST request to update an existing category.
 */
export const handleUpdateCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const errors = validationResult(req);
        const name = req.body.name ? req.body.name.trim() : '';

        if (!errors.isEmpty()) {
            return res.status(400).render('edit-category', {
                title: 'Edit Category',
                errors: errors.array(),
                category: { category_id: categoryId, name }
            });
        }

        const updated = await updateCategory(categoryId, name);

        if (!updated) {
            return res.status(404).render('404', { title: 'Category Not Found' });
        }

        res.redirect('/categories');
    } catch (err) {
        console.error('Error updating category:', err);
        next(err);
    }
};