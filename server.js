import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { testConnection } from './models/db.js'; // Import test connection
import { getOrganizations } from './models/organizations.js';
import { getCategories } from './models/categories.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// ESM equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static middleware for public folder (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Updated route to fetch organizations from the database
app.get('/organizations', async (req, res) => {
    try {
        const organizations = await getOrganizations();
        console.log('Organizations from DB:', organizations); // For testing in the console
        res.render('organizations', { title: 'Organizations', organizations });
    } catch (error) {
        console.error('Error fetching organizations:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/projects', (req, res) => {
    res.render('projects', { title: 'Service Projects' });
});

// Updated route to fetch categories from the database
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

// Start server and test DB connection asynchronously
const startServer = async () => {
  try {
    await testConnection(); // Test the database connection on startup
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
      console.log(`Environment: ${NODE_ENV}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

startServer();