const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Read env variables from .env.local
const envLocalPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envLocalPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([^#=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/['"\r]/g, '');
  }
});

const MONGODB_URI = env.MONGODB_URI || process.env.MONGODB_URI;
const MONGODB_DB = env.MONGODB_DB || 'eagle_revolution';

if (!MONGODB_URI) {
  console.error('No MONGODB_URI found in env');
  process.exit(1);
}

async function run() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
    console.log('Connected.');

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    // Find the complete_data content doc
    const content = await mongoose.connection.db.collection('site_contents').findOne({ key: 'complete_data' });
    if (content) {
      console.log('Found complete_data keys:', Object.keys(content.data));
      
      // Let's print out the exact structure of "home", "quickQuote", "whyChooseUs" if they exist
      const home = content.data.home || {};
      console.log('home sub-keys:', Object.keys(home));
      
      if (content.data.quickQuote) {
        console.log('quickQuote:', JSON.stringify(content.data.quickQuote, null, 2));
      } else {
        console.log('quickQuote is missing from complete_data');
      }
      
      if (content.data.whyChooseUs) {
        console.log('whyChooseUs:', JSON.stringify(content.data.whyChooseUs, null, 2));
      }
      
      if (content.data.brandStore) {
        console.log('brandStore:', JSON.stringify(content.data.brandStore, null, 2));
      }
    } else {
      console.log('complete_data not found in site_contents');
    }

    // Let's also look at Pages collection
    const homePage = await mongoose.connection.db.collection('pages').findOne({ slug: '/' });
    if (homePage) {
      console.log('Found homepage in pages collection:');
      console.log('keys in content:', Object.keys(homePage.content || {}));
    } else {
      console.log('Homepage with slug "/" not found in pages collection');
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

run();
