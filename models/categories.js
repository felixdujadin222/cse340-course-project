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