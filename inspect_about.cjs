const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const envLocalPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envLocalPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const trimmedLine = line.trim();
  if (!trimmedLine || trimmedLine.startsWith('#')) return;
  const equalIndex = trimmedLine.indexOf('=');
  if (equalIndex > 0) {
    const key = trimmedLine.substring(0, equalIndex).trim();
    const val = trimmedLine.substring(equalIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    env[key] = val;
  }
});

const MONGODB_URI = env.MONGODB_URI;
const MONGODB_DB = env.MONGODB_DB || 'realroof';

async function run() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
    const content = await mongoose.connection.db.collection('site_contents').findOne({ key: 'complete_data' });
    if (content && content.data) {
      console.log('resourcesFAQ:', JSON.stringify(content.data.resourcesFAQ, null, 2));
    }
  } catch (err) { console.error(err); } finally { await mongoose.disconnect(); }
}
run();
