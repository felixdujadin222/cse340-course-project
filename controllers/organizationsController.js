import {
    getOrganizations,
    getOrganizationById,
    getProjectsByOrganizationId
} from '../models/organizations.js';

export const showOrganizations = async (req, res, next) => {
    try {
        const organizations = await getOrganizations();
        res.render('organizations', {
            title: 'Organizations',
            organizations
        });
    } catch (err) {
        next(err);
    }
};

export const showOrganizationDetail = async (req, res, next) => {
    try {
        const organizationId = req.params.id;
        const organization = await getOrganizationById(organizationId);

        if (!organization) {
            return res.status(404).render('404', { title: 'Organization Not Found' });
        }

        const projects = await getProjectsByOrganizationId(organizationId);

        res.render('organization-detail', {
            title: organization.name,
            organization,
            projects
        });
    } catch (err) {
        next(err);
    }
};