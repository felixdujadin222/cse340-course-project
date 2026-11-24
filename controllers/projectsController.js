import { validationResult } from 'express-validator';
import {
    getProjects,
    getProjectById,
    getCategoriesByProjectId,
    createProject,
    updateProject,
    setProjectCategories
} from '../models/projects.js';
import { getOrganizations } from '../models/organizations.js';
import { getCategories } from '../models/categories.js';

export const showProjects = async (req, res, next) => {
    try {
        const projects = await getProjects();
        res.render('projects', {
            title: 'Service Projects',
            projects
        });
    } catch (err) {
        next(err);
    }
};

export const showProjectDetail = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectById(projectId);

        if (!project) {
            return res.status(404).render('404', { title: 'Project Not Found' });
        }

        const categories = await getCategoriesByProjectId(projectId);

        res.render('project-detail', {
            title: project.title,
            project,
            categories
        });
    } catch (err) {
        next(err);
    }
};

export const showNewProjectForm = async (req, res, next) => {
    try {
        const [organizations, categories] = await Promise.all([
            getOrganizations(),
            getCategories()
        ]);

        res.render('new-project', {
            title: 'New Service Project',
            errors: [],
            organizations,
            categories,
            selectedCategoryIds: [],
            project: {
                title: '',
                description: '',
                location: '',
                date: '',
                organization_id: ''
            }
        });
    } catch (err) {
        next(err);
    }
};

export const handleCreateProject = async (req, res, next) => {
    const title = req.body.title ? req.body.title.trim() : '';
    const description = req.body.description ? req.body.description.trim() : '';
    const location = req.body.location ? req.body.location.trim() : '';
    const date = req.body.date ? req.body.date.trim() : '';
    const organizationId = req.body.organization_id || '';
    const selectedCategoryIds = req.body.category_ids
        ? (Array.isArray(req.body.category_ids) ? req.body.category_ids : [req.body.category_ids]).map(Number)
        : [];

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const [organizations, categories] = await Promise.all([
                getOrganizations(),
                getCategories()
            ]);

            return res.status(400).render('new-project', {
                title: 'New Service Project',
                errors: errors.array(),
                organizations,
                categories,
                selectedCategoryIds,
                project: {
                    title,
                    description,
                    location,
                    date,
                    organization_id: organizationId
                }
            });
        }

        const created = await createProject(
            title,
            description,
            location,
            date,
            Number(organizationId)
        );

        await setProjectCategories(created.project_id, selectedCategoryIds);

        res.redirect(`/project/${created.project_id}`);
    } catch (err) {
        next(err);
    }
};

export const showEditProjectForm = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const [project, organizations, categories, projectCategories] = await Promise.all([
            getProjectById(projectId),
            getOrganizations(),
            getCategories(),
            getCategoriesByProjectId(projectId)
        ]);

        if (!project) {
            return res.status(404).render('404', { title: 'Project Not Found' });
        }

        const formattedDate = project.date
            ? new Date(project.date).toISOString().slice(0, 10)
            : '';

        res.render('edit-project', {
            title: `Edit ${project.title}`,
            errors: [],
            organizations,
            categories,
            selectedCategoryIds: projectCategories.map((c) => Number(c.category_id)),
            project: {
                ...project,
                date: formattedDate
            }
        });
    } catch (err) {
        next(err);
    }
};

export const handleUpdateProject = async (req, res, next) => {
    const projectId = req.params.id;
    const title = req.body.title ? req.body.title.trim() : '';
    const description = req.body.description ? req.body.description.trim() : '';
    const location = req.body.location ? req.body.location.trim() : '';
    const date = req.body.date ? req.body.date.trim() : '';
    const organizationId = req.body.organization_id || '';
    const selectedCategoryIds = req.body.category_ids
        ? (Array.isArray(req.body.category_ids) ? req.body.category_ids : [req.body.category_ids]).map(Number)
        : [];

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const [organizations, categories] = await Promise.all([
                getOrganizations(),
                getCategories()
            ]);

            return res.status(400).render('edit-project', {
                title: 'Edit Service Project',
                errors: errors.array(),
                organizations,
                categories,
                selectedCategoryIds,
                project: {
                    project_id: projectId,
                    title,
                    description,
                    location,
                    date,
                    organization_id: organizationId
                }
            });
        }

        const updated = await updateProject(
            projectId,
            title,
            description,
            location,
            date,
            Number(organizationId)
        );

        if (!updated) {
            return res.status(404).render('404', { title: 'Project Not Found' });
        }

        await setProjectCategories(projectId, selectedCategoryIds);

        res.redirect(`/project/${updated.project_id}`);
    } catch (err) {
        next(err);
    }
};