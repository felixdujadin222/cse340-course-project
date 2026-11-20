import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { testConnection } from './models/db.js';
import routes from './routes.js';

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

// Mount all application routes
app.use('/', routes);

// 404 handler for unmatched routes
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// 500 global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled application error:', err.stack || err);
    res.status(500).render('500', { title: 'Internal Server Error' });
});

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