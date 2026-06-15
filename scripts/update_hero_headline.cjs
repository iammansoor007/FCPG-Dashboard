const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'realroof';
const dataPath = path.resolve(__dirname, '../homepage_data.json');

async function updateHero() {
    // 1. Update homepage_data.json file first
    try {
        const rawData = fs.readFileSync(dataPath, 'utf8');
        const jsonData = JSON.parse(rawData);

        jsonData.hero.headlines = [
            { "text": "St. Louis's Premium", "highlight": false },
            { "text": "Roofing & Exteriors", "highlight": false },
            { "text": "Built to Last.", "highlight": true }
        ];
        jsonData.hero.title = "St. Louis's Premium Roofing & Exteriors";
        jsonData.hero.subtitle = "Professional roofing, window installation, custom decks, and siding solutions in St. Louis.";
        
        fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2), 'utf8');
        console.log("Successfully updated hero headline in homepage_data.json.");

        // 2. Update MongoDB database
        if (!uri) {
            console.error("MONGODB_URI not found in .env.local");
            return;
        }

        const client = new MongoClient(uri);
        await client.connect();
        console.log(`Connected to MongoDB. Target DB: ${dbName}`);

        const db = client.db(dbName);
        const collection = db.collection('site_contents');

        const result = await collection.updateOne(
            { key: 'complete_data' },
            { 
                $set: { 
                    "data.hero.headlines": jsonData.hero.headlines,
                    "data.hero.title": jsonData.hero.title,
                    "data.hero.subtitle": jsonData.hero.subtitle,
                    lastUpdated: new Date()
                } 
            }
        );

        console.log(`Successfully updated database "${dbName}". Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
        await client.close();

    } catch (err) {
        console.error("Error updating hero headline:", err);
    }
}

updateHero();
