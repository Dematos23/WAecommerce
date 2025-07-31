
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
        });
    }
}

export async function login(email: string, password:  string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function register(name: string, email: string, password:  string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
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
