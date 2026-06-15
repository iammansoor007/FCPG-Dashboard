const dns = require('dns');
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI;
const dataPath = path.resolve(__dirname, '../seeding.json');

const adminUsername = process.env.ADMIN_USERNAME || 'eagleadmin';
const adminPassword = process.env.ADMIN_PASSWORD || 'Eagle@Revolution2025';

const RoleSchema = new mongoose.Schema({
    name: String,
    permissions: mongoose.Schema.Types.Mixed,
    isCustom: { type: Boolean, default: false }
});

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: mongoose.Schema.Types.ObjectId,
    status: { type: String, default: 'active' }
});

const Role = mongoose.models.Role || mongoose.model('Role', RoleSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function run() {
    if (!uri) {
        console.error("MONGODB_URI not found in env variables!");
        return;
    }

    const dbs = ['realroof', 'eagle_revolution'];

    for (const dbName of dbs) {
        console.log(`\n==========================================`);
        console.log(`Seeding database: ${dbName}`);
        console.log(`==========================================`);

        try {
            await mongoose.connect(uri, { dbName });
            console.log(`Connected to database: ${dbName}`);

            // 1. Seed complete_data from seeding.json
            const rawData = fs.readFileSync(dataPath, 'utf8');
            const jsonData = JSON.parse(rawData);

            const result = await mongoose.connection.db.collection('site_contents').updateOne(
                { key: 'complete_data' },
                { 
                    $set: { 
                        data: jsonData,
                        lastUpdated: new Date()
                    } 
                },
                { upsert: true }
            );
            console.log(`Seeded complete_data. Matched: ${result.matchedCount}, Upserted: ${result.upsertedCount}`);

            // 2. Seed Pages
            const pages = [
                {
                    slug: 'home',
                    title: 'Home Page',
                    template: 'home',
                    status: 'published',
                    metadata: {
                        title: 'RealRoof | Home',
                        description: 'Welcome to RealRoof - Your Home Improvement Experts.'
                    },
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    slug: 'about',
                    title: 'About Us',
                    template: 'about',
                    status: 'published',
                    metadata: {
                        title: 'About RealRoof',
                        description: 'Learn about our history, mission, and commitment to excellence.'
                    },
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    slug: 'services',
                    title: 'Our Services',
                    template: 'services',
                    status: 'published',
                    metadata: {
                        title: 'Our Services | RealRoof',
                        description: 'Explore our wide range of home improvement services.'
                    },
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    slug: 'about/team',
                    title: 'Meet The Team',
                    template: 'team',
                    status: 'published',
                    metadata: {
                        title: 'Our Team | RealRoof',
                        description: 'Meet the professionals behind RealRoof.'
                    },
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    slug: 'about/careers',
                    title: 'Join Our Team',
                    template: 'careers',
                    status: 'published',
                    metadata: {
                        title: 'Careers | RealRoof',
                        description: 'Explore career opportunities with RealRoof.'
                    },
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    slug: 'reviews',
                    title: 'Customer Reviews',
                    template: 'reviews',
                    status: 'published',
                    metadata: {
                        title: 'Reviews | RealRoof',
                        description: 'Read what our customers have to say about us.'
                    },
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    slug: 'faq',
                    title: 'Frequently Asked Questions',
                    template: 'faq',
                    status: 'published',
                    metadata: {
                        title: 'FAQ | RealRoof',
                        description: 'Find answers to common questions about our services.'
                    },
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    slug: 'gallery',
                    title: 'Project Gallery',
                    template: 'gallery',
                    status: 'published',
                    metadata: {
                        title: 'Portfolio | RealRoof',
                        description: 'View our completed projects and quality workmanship.'
                    },
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    slug: 'contact',
                    title: 'Contact Us',
                    template: 'contact',
                    status: 'published',
                    metadata: {
                        title: 'Contact | RealRoof',
                        description: 'Get in touch with us for a free estimate.'
                    },
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];

            const pagesCollection = mongoose.connection.db.collection('pages');
            for (const page of pages) {
                await pagesCollection.updateOne(
                    { slug: page.slug },
                    { $set: page },
                    { upsert: true }
                );
            }
            console.log(`Seeded ${pages.length} pages.`);

            // 3. Seed Roles
            const rolesData = [
                {
                    name: 'Admin',
                    isCustom: false,
                    permissions: {
                        pages: { create: true, read: true, update: true, delete: true, publish: true },
                        media: { create: true, read: true, update: true, delete: true },
                        seo: { read: true, update: true },
                        blog: { create: true, read: true, update: true, delete: true, publish: true },
                        submissions: { read: true, delete: true },
                        settings: { read: true, update: true },
                        users: { read: true, create: true, update: true, delete: true },
                        logs: { read: true }
                    }
                },
                {
                    name: 'Editor',
                    isCustom: false,
                    permissions: {
                        pages: { create: true, read: true, update: true, delete: false, publish: true },
                        media: { create: true, read: true, update: true, delete: true },
                        seo: { read: true, update: true },
                        blog: { create: true, read: true, update: true, delete: false, publish: true },
                        submissions: { read: true, delete: false },
                        settings: { read: false, update: false },
                        users: { read: false, create: false, update: false, delete: false },
                        logs: { read: false }
                    }
                },
                {
                    name: 'SEO Manager',
                    isCustom: false,
                    permissions: {
                        pages: { create: false, read: true, update: false, delete: false, publish: false },
                        media: { create: false, read: true, update: false, delete: false },
                        seo: { read: true, update: true },
                        blog: { create: false, read: true, update: true, delete: false, publish: false },
                        submissions: { read: false, delete: false },
                        settings: { read: false, update: false },
                        users: { read: false, create: false, update: false, delete: false },
                        logs: { read: false }
                    }
                },
                {
                    name: 'Writer',
                    isCustom: false,
                    permissions: {
                        pages: { create: true, read: true, update: true, delete: false, publish: false },
                        media: { create: true, read: true, update: false, delete: false },
                        seo: { read: true, update: false },
                        blog: { create: true, read: true, update: true, delete: false, publish: false },
                        submissions: { read: false, delete: false },
                        settings: { read: false, update: false },
                        users: { read: false, create: false, update: false, delete: false },
                        logs: { read: false }
                    }
                }
            ];

            for (const r of rolesData) {
                await Role.updateOne({ name: r.name }, { $set: r }, { upsert: true });
            }
            console.log("Seeded roles.");

            // 4. Create Initial Admin User
            const adminRole = await Role.findOne({ name: 'Admin' });
            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            await User.updateOne(
                { username: adminUsername },
                { 
                    $set: {
                        username: adminUsername,
                        email: 'admin@realroof.com',
                        password: hashedPassword,
                        role: adminRole._id,
                        status: 'active'
                    }
                },
                { upsert: true }
            );
            console.log(`Created/Updated Admin User: ${adminUsername}`);

            await mongoose.disconnect();
            console.log(`Successfully completed seeding for database: ${dbName}`);

        } catch (err) {
            console.error(`Error seeding database ${dbName}:`, err);
            try {
                await mongoose.disconnect();
            } catch (disError) {}
        }
    }
}

run();
