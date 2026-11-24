import db from './db.js';

/**
 * Retrieves all categories from the database.
 */
export const getCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.categories;
    `;

    const result = await db.query(query);
    return result.rows;
};

/**
 * Retrieves a single category by its ID.
 */
export const getCategoryById = async (categoryId) => {
    const query = `
        SELECT category_id, name
        FROM public.categories
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows[0];
};

/**
 * Retrieves all categories for a given service project (for category tags).
 */
export const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT DISTINCT c.category_id, c.name
        FROM public.categories c
        INNER JOIN public.project_categories pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;

    const result = await db.query(query, [projectId]);
    return result.rows;
};

/**
 * Retrieves all service projects for a given category (for category details pages).
 */
export const getProjectsByCategoryId = async (categoryId) => {
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
};

/**
 * Inserts a new category into the database.
 */
export const createCategory = async (name) => {
    const query = `
        INSERT INTO public.categories (name)
        VALUES ($1)
        RETURNING category_id, name;
    `;

    const result = await db.query(query, [name]);
    return result.rows[0];
};

/**
 * Updates an existing category by its ID.
 */
export const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE public.categories
        SET name = $1
        WHERE category_id = $2
        RETURNING category_id, name;
    `;

    const result = await db.query(query, [name, categoryId]);
    return result.rows[0];
};