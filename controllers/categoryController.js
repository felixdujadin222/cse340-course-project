import { getCategoryById, getProjectsByCategoryId } from '../models/categories.js';

/**
 * Renders the category details page with its associated service projects.
 */
export async function renderCategoryDetails(req, res, next) {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);
        const projects = await getProjectsByCategoryId(categoryId);

        if (!category) {
            return res.status(404).render('404', { title: 'Category Not Found' });
        }

        res.render('category-details', {
            title: category.name,
            category,
            projects
        });
    } catch (err) {
        console.error('Error rendering category details:', err);
        next(err);
    }
}