-- Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Insert Sample Categories
INSERT INTO public.categories (name) VALUES 
('Education & Mentoring'),
('Environmental Conservation'),
('Community Health & Relief');

-- Create Organization Table (Singular) with all required fields
CREATE TABLE IF NOT EXISTS public.organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    contact_email VARCHAR(255),
    logo_filename VARCHAR(255)
);

-- Insert Sample Organizations with Logos and Emails
INSERT INTO public.organization (name, description, contact_email, logo_filename) VALUES 
('BrightFuture Builders', 'Teaching programming fundamentals and web development to underprivileged youth.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'Dedicated to local park cleanups, tree planting, and urban forestry.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'Mobilizing community relief and local support initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- Create Projects Table with Foreign Keys referencing 'organization'
CREATE TABLE IF NOT EXISTS public.projects (
    project_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    organization_id INT REFERENCES public.organization(organization_id),
    category_id INT REFERENCES public.categories(category_id)
);

-- Insert Sample Projects
INSERT INTO public.projects (title, description, organization_id, category_id) VALUES 
('After-School JavaScript Coding Club', 'Weekly mentoring sessions teaching HTML, CSS, and Node.js basics.', 1, 1),
('Neighborhood Tree Planting Drive', 'Planting native shade trees across community parks and walkways.', 2, 2);