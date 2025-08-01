
"use server";

import { promises as fs } from 'fs';
import path from 'path';
import type { SiteConfig } from "@/types";
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

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
      return initializeConfig();
    }
  } catch (error) {
    console.error("Error reading config from Firestore, falling back to JSON for safety.", error);
    // Fallback to local JSON if Firestore fails
    return readConfigFromJson();
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
    const jsonConfig = await readConfigFromJson();
    try {
        const docRef = doc(db, CONFIG_COLLECTION, CONFIG_DOC_ID);
        await setDoc(docRef, jsonConfig);
        console.log("Successfully initialized Firestore config.");
        return jsonConfig;
    } catch (error) {
        console.error("Failed to initialize Firestore config:", error);
        // If initialization fails, we still return the JSON config to prevent the app from crashing.
        return jsonConfig;
    }
}


// --- Helper function to read from the local JSON file ---
async function readConfigFromJson(): Promise<SiteConfig> {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'config.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const config = JSON.parse(fileContent);
    return config as SiteConfig;
}
