
"use server";

import { promises as fs } from 'fs';
import path from 'path';
import type { SiteConfig } from "@/types";

/**
 * Reads the static site configuration from the JSON file.
 * This is used for the main SaaS landing page and global elements.
 */
export async function readConfig(): Promise<SiteConfig> {
  const filePath = path.join(process.cwd(), 'src', 'lib', 'config.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const config = JSON.parse(fileContent);
  return config as SiteConfig;
}
