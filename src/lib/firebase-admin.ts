
import * as admin from 'firebase-admin';

// This is the service account key file that you download from your Firebase project settings.
// You should store it in an environment variable and not commit it to your repository.
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Check if the app is already initialized to avoid errors
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Export the admin-initialized database instance
export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
