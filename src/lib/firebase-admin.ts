'use server';

import * as admin from 'firebase-admin';
import type { Firestore } from 'firebase-admin/firestore';

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
      credential: admin.credential.cert({
        projectId: "kima-oicw0",
        clientEmail: "firebase-adminsdk-fbsvc@kima-oicw0.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCXeA3x5sAiG5oU\nDceETSpmxwRGXoHakEM47bXSi+vhb+qi21IuhX0bKNZSsvxx6ac+NVWlCwo3q0dY\nBaoMAZx7MJPUKEtHyn+MQeF7j76e3El/i0SinZkQut3jvkCn/I4PoKsX3lZ/si7n\n8rzBCCdFrobhvnTMEQzoGqz+8VkYZaC3gmd9/BR1Rh4+takvgxzsQCQgFDiH/FK7\nU0MbBrIyEFqA04bNSWTx5t02DcPqiChqZ0kp2ndgDUHIQxxZZec9RxOhaq0OebV3\njGlnd14NIpSruyJki62bG+ZPcUKm1GZXSDcUmgDeMzvLph8nJ4esSZAKlrSb4HCw\nDAFsIcXVAgMBAAECggEADTGtP0rbJi1y1rfbjxP8s063Odz+ITiLToBwY+qBzdWm\nofCKYFiK7Qx53OLP+ClDAvl44CNNzMsb8BgwN5MFWzrASc0Hv7VtNl2/wzhigaqN\nMXHDdQnW3Tz12qKGNcvbYROdC7t3m/B8wwIjPIpWB20cPTpOqL78eZRnSN7jpKsF\nTaIwrhUvH0eTN2pp3//LJ637qL5ZjWHaf8CFeMVhvFHAWEXub9NTJqH7hFA+0y7B\nM5OWfowgQ2JsdDmuAT/qmtV2eJd/ytiZOIG9RpbexvTsgMqql8Vsvuf4FoDmRil0\nwliA+d77kW46rLcDrbGtRZZFbquwFp8AzRiwxbQJSQKBgQDHVuS27bel8aGIQEvi\nCw/XMKgayWja0mREkuAiaQBBE0Ga69URO99qPM15yHR/UpLg8Tta4zcqOJvc80ZJ\nqkRgSv2tHWA9Ms2MTwOq66suaBZjA/QIB0+3gNq4AvLOd08OVlgBFRRo17n3D8cc\n4akEbE3QoIvMoC+mHYqfy7W6rQKBgQDChdM63BTMfDwibsM6P4oUX2DdJXnKIWEg\nnhh3dy+YveEMYBPZ8yN2zWX5aomfYeJzPKR0nu3ib/rkH+ddxOrNX3/48xjNofbB\nPXpTUMCn96mkHqwrIJJLoGfE1udgA7iO+roXx33n6vLsjT91747njYnG+ROa+/06\n/YZPDhWEyQKBgQC9n9xMY9BKjJQz763/5rP36bJQYP5dAr0dOnb6ZNY4EWBcRjFW\nhpUeE58HVXf00pEkaHYlHHYStO0X/1gCpXUMAOpWLtapANXlvhhoFG2v5JY/NLiE\nlqfvkST+3NcrLvXGVr66sNnMbkLaUmkAAW5t5bUUXFUAn/UT2ZBQOFG0tQKBgQCa\nSWUCAX+ptTxJH0tPzwfpIsGEhm30CcetBFhpoSoqXyi6FRaJv1S4rS+dxYfE1/Gx\n7z6NlWUfPixkdn2fnUmTfZTWU5KvvzAlk2qL3LgCQejW2NE8H8iJnX/Q25eHS0w+\nc9XYeI1/vpXRVDMqisjxFg1auUJ4ojf3axD1cTlWKQKBgCd0Efmv8hPkM7vbjqqy\ni1n2doaec+UH85Km1Zu8EGAuhk0hzaf+EjFy121i2RJ2xGCrMKrHX9YlgAZvgjoI\nMaTojsGp5Kf6vtT+ilMJIrJ2OwHrcNeHtnP8Z48MN7KAT1QRdf0c9fLjdSjzLHfF\nrztXkbK5KoQ1rdaNBctnFEAD\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
      }),
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
