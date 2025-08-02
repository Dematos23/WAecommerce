'use server';

import * as admin from 'firebase-admin';
import type { Firestore } from 'firebase-admin/firestore';
import serviceAccount from '../../serviceAccountKey.json'; 

console.log('--- Verificando variables de entorno ---');
console.log('PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
console.log('CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL);
console.log('PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? '***** (definido)' : 'No definido');
console.log('--------------------------------------');

let adminDb: Firestore | null = null;

const hasAdminConfig =
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY;

if (hasAdminConfig && !admin.apps.length) {
  try {
    console.log('--- Inicializando Firebase Admin SDK ---');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    console.log('Firebase Admin SDK inicializado correctamente');
    adminDb = admin.firestore();
  } catch (error: any) {
    console.error('❌ Error de inicialización de Firebase Admin:');
    // Esto te dará un feedback mucho más claro
    console.error('Mensaje del error:', error.message);
    console.error('Código del error:', error.code);
    console.error('Stack del error:', error.stack);
  }
}

function getAdminDb(): Firestore {
    if (!adminDb) {
        throw new Error("Firestore Admin SDK has not been initialized. Please check your server environment variables.");
    }
    return adminDb;
}

export { getAdminDb };
