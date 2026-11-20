import {
    getCategories,
    getCategoryById,
    getProjectsByCategoryId
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