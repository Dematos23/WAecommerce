
'use client';

import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import type { User as FirebaseUser } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

// This function now only creates the user document if it doesn't exist.
// It doesn't need to return the user type anymore.
async function createUserInFirestore(user: FirebaseUser, name?: string) {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        try {
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: name || user.displayName,
                photoURL: user.photoURL,
                providerId: user.providerData[0]?.providerId,
                createdAt: serverTimestamp(),
                type: 'client', // Default type for new users
            });
        } catch (error) {
            console.error("Error creating user document:", error);
            // We can re-throw or handle this error as needed
            throw error;
        }
    }
}

// This function is kept for potential server-side use, but is no longer
// called in the client-side login/register flow.
export async function getUserType(uid: string): Promise<string | null> {
    const userRef = doc(db, 'users', uid);
    try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            return docSnap.data()?.type || 'client';
        }
        return null;
    } catch (error) {
        console.error("Error getting user type:", error);
        // Avoid failing silently in case of network issues etc.
        // The new AuthProvider handles this more gracefully.
        return null; 
    }
}

export async function login(email: string, password:  string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // The responsibility of getting the user type is moved to the AuthProvider
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function register(name: string, email: string, password:  string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        // Create the user document, but don't wait to fetch the type.
        await createUserInFirestore(userCredential.user, name);
        return { success: true, user: userCredential.user };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await createUserInFirestore(result.user);
    return { success: true, user: result.user };
  } catch (error: any) {
     return { success: false, error: error.message };
  }
}

export async function logout() {
  await signOut(auth);
}
