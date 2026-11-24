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

export const createOrganization = async (
    name,
    description,
    contactEmail,
    logoFilename = 'default-logo.png'
) => {
    const query = `
        INSERT INTO public.organization (name, description, contact_email, logo_filename)
        VALUES ($1, $2, $3, $4)
        RETURNING organization_id, name, description, contact_email, logo_filename;
    `;

    const result = await db.query(query, [name, description, contactEmail, logoFilename]);
    return result.rows[0];
};

export const updateOrganization = async (
    organizationId,
    name,
    description,
    contactEmail,
    logoFilename
) => {
    const query = `
        UPDATE public.organization
        SET
            name = $1,
            description = $2,
            contact_email = $3,
            logo_filename = COALESCE($4, logo_filename)
        WHERE organization_id = $5
        RETURNING organization_id, name, description, contact_email, logo_filename;
    `;

    const result = await db.query(query, [
        name,
        description,
        contactEmail,
        logoFilename,
        organizationId
    ]);
    return result.rows[0];
};