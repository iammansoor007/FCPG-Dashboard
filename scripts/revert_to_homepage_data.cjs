const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'realroof';
const dataPath = path.resolve(__dirname, '../homepage_data.json');

async function revert() {
    if (!uri) {
        console.error("MONGODB_URI not found in .env.local");
        return;
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log(`Connected to MongoDB. Target DB: ${dbName}`);

        const db = client.db(dbName);
        const collection = db.collection('site_contents');

        const rawData = fs.readFileSync(dataPath, 'utf8');
        const jsonData = JSON.parse(rawData);

        console.log("Read homepage_data.json keys:", Object.keys(jsonData));

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

        console.log(`Successfully reverted database "${dbName}" back to original homepage_data. Matched: ${result.matchedCount}, Upserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`);

    } catch (err) {
        console.error("Error reverting database:", err);
    } finally {
        await client.close();
    }
}

revert();
