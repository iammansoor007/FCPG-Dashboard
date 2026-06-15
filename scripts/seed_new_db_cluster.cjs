const dns = require('dns');
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI;
const dataPath = path.resolve(__dirname, '../seeding.json');

async function seedCluster() {
    if (!uri) {
        console.error("MONGODB_URI not found in .env.local");
        return;
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected successfully to the new MongoDB cluster.");

        // List existing databases
        const adminDb = client.db().admin();
        const dbs = await adminDb.listDatabases();
        console.log("Databases on new cluster:", dbs.databases.map(d => d.name));

        const rawData = fs.readFileSync(dataPath, 'utf8');
        const jsonData = JSON.parse(rawData);
        console.log("Read seeding.json keys:", Object.keys(jsonData));

        // Seed both 'realroof' and 'eagle_revolution'
        const targets = ['realroof', 'eagle_revolution'];
        for (const dbName of targets) {
            const db = client.db(dbName);
            const collection = db.collection('site_contents');

            const result = await collection.updateOne(
                { key: 'complete_data' },
                { 
                    $set: { 
                        data: jsonData,
                        lastUpdated: new Date()
                    } 
                },
                { upsert: true }
            );

            console.log(`Seeded DB "${dbName}". Matched: ${result.matchedCount}, Upserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`);
        }

    } catch (err) {
        console.error("Error seeding cluster:", err);
    } finally {
        await client.close();
    }
}

seedCluster();
