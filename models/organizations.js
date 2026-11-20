import db from './db.js';

export const getOrganizations = async () => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.organization;
    `;

    const result = await db.query(query);
    return result.rows;
};

export const getOrganizationById = async (organizationId) => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.organization
        WHERE organization_id = $1;
    `;

    const result = await db.query(query, [organizationId]);
    return result.rows[0];
};

export const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT project_id, title, description, location, date, organization_id
        FROM public.projects
        WHERE organization_id = $1;
    `;

    const result = await db.query(query, [organizationId]);
    return result.rows;
};