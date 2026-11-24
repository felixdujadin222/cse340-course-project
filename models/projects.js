import db from './db.js';

export const getProjects = async () => {
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
        INNER JOIN public.organization o ON p.organization_id = o.organization_id;
    `;
    const result = await db.query(query);
    return result.rows;
};

export const getProjectById = async (projectId) => {
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
        INNER JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows[0];
};

export const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT 
            c.category_id, 
            c.name
        FROM public.categories c
        INNER JOIN public.project_categories pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
};

export const createProject = async (title, description, location, date, organizationId) => {
    const query = `
        INSERT INTO public.projects (title, description, location, date, organization_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id, title, description, location, date, organization_id;
    `;
    const result = await db.query(query, [
        title,
        description,
        location,
        date,
        organizationId
    ]);
    return result.rows[0];
};

export const updateProject = async (
    projectId,
    title,
    description,
    location,
    date,
    organizationId
) => {
    const query = `
        UPDATE public.projects
        SET
            title = $1,
            description = $2,
            location = $3,
            date = $4,
            organization_id = $5
        WHERE project_id = $6
        RETURNING project_id, title, description, location, date, organization_id;
    `;
    const result = await db.query(query, [
        title,
        description,
        location,
        date,
        organizationId,
        projectId
    ]);
    return result.rows[0];
};

export const setProjectCategories = async (projectId, categoryIds = []) => {
    const normalizedIds = [...new Set(
        (Array.isArray(categoryIds) ? categoryIds : [categoryIds])
            .map((id) => Number(id))
            .filter((id) => Number.isInteger(id) && id > 0)
    )];

    await db.query('DELETE FROM public.project_categories WHERE project_id = $1;', [projectId]);

    for (const categoryId of normalizedIds) {
        await db.query(
            'INSERT INTO public.project_categories (project_id, category_id) VALUES ($1, $2);',
            [projectId, categoryId]
        );
    }
};