import { validationResult } from 'express-validator';
import {
    getOrganizations,
    getOrganizationById,
    getProjectsByOrganizationId,
    createOrganization,
    updateOrganization
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

export const showNewOrganizationForm = (req, res) => {
    res.render('new-organization', {
        title: 'New Organization',
        errors: [],
        organization: {
            name: '',
            description: '',
            contact_email: '',
            logo_filename: ''
        }
    });
};

export const handleCreateOrganization = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        const name = req.body.name ? req.body.name.trim() : '';
        const description = req.body.description ? req.body.description.trim() : '';
        const contactEmail = req.body.contact_email ? req.body.contact_email.trim() : '';
        const logoFilename = req.body.logo_filename ? req.body.logo_filename.trim() : 'default-logo.png';

        if (!errors.isEmpty()) {
            return res.status(400).render('new-organization', {
                title: 'New Organization',
                errors: errors.array(),
                organization: {
                    name,
                    description,
                    contact_email: contactEmail,
                    logo_filename: req.body.logo_filename ? req.body.logo_filename.trim() : ''
                }
            });
        }

        const created = await createOrganization(
            name,
            description,
            contactEmail,
            logoFilename || 'default-logo.png'
        );

        res.redirect(`/organization/${created.organization_id}`);
    } catch (err) {
        next(err);
    }
};

export const showEditOrganizationForm = async (req, res, next) => {
    try {
        const organizationId = req.params.id;
        const organization = await getOrganizationById(organizationId);

        if (!organization) {
            return res.status(404).render('404', { title: 'Organization Not Found' });
        }

        res.render('edit-organization', {
            title: `Edit ${organization.name}`,
            errors: [],
            organization
        });
    } catch (err) {
        next(err);
    }
};

export const handleUpdateOrganization = async (req, res, next) => {
    try {
        const organizationId = req.params.id;
        const errors = validationResult(req);
        const name = req.body.name ? req.body.name.trim() : '';
        const description = req.body.description ? req.body.description.trim() : '';
        const contactEmail = req.body.contact_email ? req.body.contact_email.trim() : '';
        const logoFilename = req.body.logo_filename && req.body.logo_filename.trim() !== ''
            ? req.body.logo_filename.trim()
            : null;

        if (!errors.isEmpty()) {
            return res.status(400).render('edit-organization', {
                title: 'Edit Organization',
                errors: errors.array(),
                organization: {
                    organization_id: organizationId,
                    name,
                    description,
                    contact_email: contactEmail,
                    logo_filename: req.body.logo_filename ? req.body.logo_filename.trim() : ''
                }
            });
        }

        const updated = await updateOrganization(
            organizationId,
            name,
            description,
            contactEmail,
            logoFilename
        );

        if (!updated) {
            return res.status(404).render('404', { title: 'Organization Not Found' });
        }

        res.redirect(`/organization/${updated.organization_id}`);
    } catch (err) {
        next(err);
    }
};