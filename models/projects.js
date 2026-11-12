import db from './db.js';

export async function getProjects() {
    const query = `
        SELECT 
            p.project_id, 
            p.title, 
            p.description, 
            o.name AS organization_name, 
            o.organization_id 
        FROM public.projects p 
        INNER JOIN public.organization o ON p.organization_id = o.organization_id;
    `;
    const result = await db.query(query);
    return result.rows;
}