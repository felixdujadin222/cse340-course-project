import {
    getProjects,
    getProjectById,
    getCategoriesByProjectId
} from '../models/projects.js';

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