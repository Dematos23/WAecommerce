
"use server";

import { promises as fs } from 'fs';
import path from 'path';
import type { SiteConfig } from "@/types";
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import jsonConfig from '@/lib/config.json'; // Direct import

const CONFIG_COLLECTION = 'siteConfig';
const CONFIG_DOC_ID = 'main';

/**
 * Reads the site configuration from Firestore.
 * This is used for the main SaaS landing page and global elements.
 * It fetches the single document 'main' from the 'siteConfig' collection.
 */
export async function readConfig(): Promise<SiteConfig> {
  try {
    const docRef = doc(db, CONFIG_COLLECTION, CONFIG_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as SiteConfig;
    } else {
      console.log("Config document not found, attempting to initialize from JSON.");
      // If no doc, fall back to the JSON file to prevent app crash, 
      // and allow initialization.
      return jsonConfig as SiteConfig;
    }
  } catch (error) {
    console.error("Error reading config from Firestore, falling back to JSON for safety.", error);
    // Fallback to local JSON if Firestore fails
    return jsonConfig as SiteConfig;
  }
}

/**
 * Updates the site configuration in Firestore.
 * @param {SiteConfig} configData - The new configuration object to save.
 */
export async function updateConfig(configData: SiteConfig): Promise<{ success: boolean; error?: string }> {
  try {
    const docRef = doc(db, CONFIG_COLLECTION, CONFIG_DOC_ID);
    await setDoc(docRef, configData, { merge: true }); // Use merge to avoid overwriting with partial data
    
    // Revalidate paths to reflect changes immediately
    revalidatePath('/', 'layout');
    
    return { success: true };
  } catch (error: any) {
    console.error("Error updating config in Firestore:", error);
    return { success: false, error: error.message };
  }
}


/**
 * Initializes the Firestore config document from the local config.json file.
 * This is intended to be run once to migrate the data.
 */
export async function initializeConfig(): Promise<SiteConfig> {
    console.log("Initializing Firestore config from local JSON file...");
    try {
        const docRef = doc(db, CONFIG_COLLECTION, CONFIG_DOC_ID);
        // Use the directly imported JSON object
        await setDoc(docRef, jsonConfig);
        console.log("Successfully initialized Firestore config.");
        revalidatePath('/', 'layout');
        return jsonConfig as SiteConfig;
    } catch (error) {
        console.error("Failed to initialize Firestore config:", error);
        // If initialization fails, we still return the JSON config to prevent the app from crashing.
        throw new Error("Failed to initialize Firestore config in the database.");
    }
}
