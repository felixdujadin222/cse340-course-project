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

-- Create Projects Table with location, date, and Foreign Keys referencing 'organization'
CREATE TABLE IF NOT EXISTS public.projects (
    project_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    date VARCHAR(100),
    organization_id INT REFERENCES public.organization(organization_id),
    category_id INT REFERENCES public.categories(category_id)
);

-- Insert at least 5 sample projects for EACH organization (Total 15 projects)
INSERT INTO public.projects (title, description, location, date, organization_id, category_id) VALUES 
-- BrightFuture Builders (Org ID 1) - 5 projects
('After-School JavaScript Coding Club', 'Weekly mentoring sessions teaching HTML, CSS, and Node.js basics.', 'Community Center Room A', '2026-04-01', 1, 1),
('Web Development Bootcamp', 'Intensive weekend workshop for building responsive portfolio sites.', 'Tech Hub Downtown', '2026-04-15', 1, 1),
('Python Scripting for Teens', 'Introduction to automation and data manipulation using Python.', 'Public Library Lab 2', '2026-05-02', 1, 1),
('Frontend UI Design Masterclass', 'Hands-on session covering CSS Grid, Flexbox, and modern UI patterns.', 'Online Zoom Session', '2026-05-20', 1, 1),
('GitHub & Version Control Workshop', 'Teaching collaborative coding workflows and Git CLI basics.', 'Innovation Center', '2026-06-10', 1, 1),

-- GreenHarvest Growers (Org ID 2) - 5 projects
('Neighborhood Tree Planting Drive', 'Planting native shade trees across community parks and walkways.', 'Central Park West', '2026-04-05', 2, 2),
('Urban Garden Compost Workshop', 'Educating residents on organic waste reduction and soil health.', 'Green Community Garden', '2026-04-18', 2, 2),
('Riverbank Cleanup Initiative', 'Removing plastic and debris along the local river shoreline.', 'Riverside Trailhead', '2026-05-08', 2, 2),
('Pollinator Garden Planting', 'Installing flower beds designed to attract bees, butterflies, and birds.', 'Eastside Botanical Park', '2026-05-25', 2, 2),
('Rainwater Harvesting Seminar', 'Workshop on installing residential rain barrels for water conservation.', 'Eco Center Auditorium', '2026-06-12', 2, 2),

-- UnityServe Volunteers (Org ID 3) - 5 projects
('Community Food Bank Distribution', 'Sorting and packing emergency food boxes for local families.', 'Metro Food Pantry', '2026-04-10', 3, 3),
('Winter Clothing Drive & Sorting', 'Collecting and distributing coats and blankets to shelters.', 'Unity Community Hall', '2026-04-22', 3, 3),
('Senior Center Tech Assistance', 'Helping senior citizens set up devices, emails, and video calls.', 'Sunset Senior Living', '2026-05-12', 3, 3),
('Emergency Relief Supply Pack', 'Assembling hygiene and disaster relief kits for regional distribution.', 'Warehouse Bay 4', '2026-06-01', 3, 3),
('Neighborhood Health & Wellness Fair', 'Providing free health screenings and wellness information booths.', 'City Plaza Square', '2026-06-18', 3, 3);

-- Create project_categories Table
CREATE TABLE IF NOT EXISTS public.project_categories (
    project_category_id SERIAL PRIMARY KEY,
    project_id INT REFERENCES public.projects(project_id),
    category_id INT REFERENCES public.categories(category_id),
    notes TEXT
);

-- Insert at least 5 sample rows into project_categories
INSERT INTO public.project_categories (project_id, category_id, notes) VALUES 
(1, 1, 'Primary focus on youth education and mentoring'),
(2, 1, 'Advanced web development training track'),
(6, 2, 'Environmental park conservation initiative'),
(11, 3, 'Community relief and food distribution program'),
(13, 3, 'Senior community care and health support');