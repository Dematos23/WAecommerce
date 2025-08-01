'use server';

import * as admin from 'firebase-admin';
import type { Firestore } from 'firebase-admin/firestore';

let adminDb: Firestore | null = null;

const hasAdminConfig =
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY;

if (hasAdminConfig && !admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      }),
    });
    adminDb = admin.firestore();
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

function getAdminDb(): Firestore {
    if (!adminDb) {
        throw new Error("Firestore Admin SDK has not been initialized. Please check your server environment variables.");
    }
    return adminDb;
}

export { getAdminDb };
