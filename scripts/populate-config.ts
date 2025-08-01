
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import configData from '../src/lib/config.json';

// Load environment variables from .env file
dotenv.config();

const CONFIG_COLLECTION = 'siteConfig';
const CONFIG_DOC_ID = 'main';

// Check for required environment variables
const hasAdminConfig = 
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY;

if (!hasAdminConfig) {
  console.error("Firebase Admin SDK credentials are not set in the environment variables.");
  console.error("Please ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set.");
  process.exit(1);
}

// Initialize Firebase Admin SDK
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
} catch (error: any) {
  if (error.code === 'app/duplicate-app') {
    // App is already initialized, which is fine.
  } else {
    console.error('Firebase admin initialization error:', error);
    process.exit(1);
  }
}

const db = admin.firestore();

/**
 * Pushes the local config.json data to the Firestore database.
 * This will overwrite any existing data in the 'siteConfig/main' document.
 */
async function populateConfig() {
  console.log("Starting to populate Firestore configuration...");
  
  try {
    const docRef = db.collection(CONFIG_COLLECTION).doc(CONFIG_DOC_ID);
    
    console.log(`Writing data to document: ${CONFIG_COLLECTION}/${CONFIG_DOC_ID}`);
    await docRef.set(configData);
    
    console.log("\n✅ Successfully populated Firestore config!");
    console.log("The 'siteConfig/main' document has been created/updated with the content from src/lib/config.json.");
    process.exit(0);
  } catch (error: any) {
    console.error("\n❌ Failed to populate Firestore config.");
    console.error("Error details:", error.message);
    process.exit(1);
  }
}

// Run the script
populateConfig();
