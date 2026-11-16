import db from './db.js';

/**
 * Retrieves all categories from the database.
 */
export async function getCategories() {
    const query = `
        SELECT category_id, name
        FROM public.categories;
    `;

    const result = await db.query(query);
    return result.rows;
}

/**
 * Retrieves a single category by its ID.
 */
export async function getCategoryById(categoryId) {
    const query = `
        SELECT category_id, name
        FROM public.categories
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows[0];
}

/**
 * Retrieves all categories for a given service project (for category tags).
 */
export async function getCategoriesByProjectId(projectId) {
    const query = `
        SELECT c.category_id, c.name 
        FROM public.categories c
        INNER JOIN public.project_categories pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;

    const result = await db.query(query, [projectId]);
    return result.rows;
}

/**
 * Retrieves all service projects for a given category (for category details pages).
 */
export async function getProjectsByCategoryId(categoryId) {
    const query = `
        SELECT 
            p.project_id, 
            p.title, 
            p.description, 
            p.location, 
            p.date, 
            o.name AS organization_name, 
            o.organization_id 
        FROM public.projects p
        INNER JOIN public.project_categories pc ON p.project_id = pc.project_id
        INNER JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE pc.category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows;
}