import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { testConnection } from './models/db.js';
import { getOrganizations } from './models/organizations.js';
import { getCategories } from './models/categories.js';
import { getProjects } from './models/projects.js';
import categoryRoutes from './routes/categoryRoutes.js'; // <-- Import your category routes

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// ESM equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This line tells Express to serve files out of a 'public' folder
app.use(express.static('public'));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static middleware for public folder (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Route to fetch organizations from the database
app.get('/organizations', async (req, res) => {
    try {
        const organizations = await getOrganizations();
        res.render('organizations', { title: 'Organizations', organizations });
    } catch (error) {
        console.error('Error fetching organizations:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to fetch projects dynamically from the database using getProjects()
app.get('/projects', async (req, res) => {
    try {
        const projects = await getProjects();
        res.render('projects', { title: 'Service Projects', projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to fetch categories from the database
app.get('/categories', async (req, res) => {
    try {
        const categories = await getCategories();
        const title = 'Service Categories';
        res.render('categories', { title, categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Mount modular category routes (handles /category/:id)
app.use('/', categoryRoutes);

// Start server and test DB connection asynchronously
const startServer = async () => {
  try {
    await testConnection();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
      console.log(`Environment: ${NODE_ENV}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

startServer();