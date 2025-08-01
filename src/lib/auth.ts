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

async function createUserInFirestore(user: FirebaseUser, name?: string) {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: name || user.displayName,
            photoURL: user.photoURL,
            providerId: user.providerData[0]?.providerId,
            createdAt: serverTimestamp(),
            type: 'client', // Default type for new users
        });
    }
}

export async function getUserType(uid: string): Promise<string | null> {
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        return docSnap.data()?.type || 'client';
    }
    return null;
}


export async function login(email: string, password:  string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const type = await getUserType(userCredential.user.uid);
    return { success: true, user: userCredential.user, type };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function register(name: string, email: string, password:  string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await createUserInFirestore(userCredential.user, name);
        const type = await getUserType(userCredential.user.uid);
        return { success: true, user: userCredential.user, type };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await createUserInFirestore(result.user);
    const type = await getUserType(result.user.uid);
    return { success: true, user: result.user, type };
  } catch (error: any) {
     return { success: false, error: error.message };
  }
}

export async function logout() {
  await signOut(auth);
}
