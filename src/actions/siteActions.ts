
"use server";

import type { SiteConfig } from "@/types";
import { getAdminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import { promises as fs } from 'fs';
import path from 'path';
import configData from '@/lib/config.json';


const CONFIG_COLLECTION = 'siteConfig';
const CONFIG_DOC_ID = 'main';


/**
 * Reads the site configuration from Firestore using the Admin SDK.
 * This is used for the main SaaS landing page and global elements.
 * If Firestore is unavailable, it gracefully falls back to the local config.json.
 */
export async function readConfig(): Promise<SiteConfig> {
  try {
    const adminDb = getAdminDb();
    const docRef = adminDb.collection(CONFIG_COLLECTION).doc(CONFIG_DOC_ID);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      return docSnap.data() as SiteConfig;
    } else {
      console.log("Config document not found in Firestore, falling back to local JSON.");
      return configData as SiteConfig;
    }
  } catch (error) {
    console.error("Error reading config from Firestore with Admin SDK, falling back to local JSON.", error);
    return configData as SiteConfig;
  }
}

/**
 * Updates the site configuration in Firestore using the Admin SDK.
 * @param {SiteConfig} configData - The new configuration object to save.
 */
export async function updateConfig(configData: SiteConfig): Promise<{ success: boolean; error?: string }> {
  try {
    const adminDb = getAdminDb();
    const docRef = adminDb.collection(CONFIG_COLLECTION).doc(CONFIG_DOC_ID);
    await docRef.set(configData, { merge: true });
    
    // Revalidate all paths that might use this config
    revalidatePath('/', 'layout');
    
    return { success: true };
  } catch (error: any) {
    console.error("Error updating config in Firestore with Admin SDK:", error);
    return { success: false, error: error.message };
  }
}


/**
 * Initializes the Firestore config document from a hardcoded JSON object.
 * This is intended to be run once to migrate the data.
 */
export async function initializeConfig(): Promise<{ success: boolean; error?: string }> {
    console.log("Initializing Firestore config from hardcoded JSON object using Admin SDK...");
    
    try {
        const adminDb = getAdminDb();
        const docRef = adminDb.collection(CONFIG_COLLECTION).doc(CONFIG_DOC_ID);
        await docRef.set(configData);
        console.log("Successfully initialized Firestore config with hardcoded data using Admin SDK.");
        revalidatePath('/', 'layout');
        return { success: true };
    } catch (error: any) {
        console.error("Failed to initialize Firestore config with Admin SDK:", error);
        return { success: false, error: error.message };
    }
}
