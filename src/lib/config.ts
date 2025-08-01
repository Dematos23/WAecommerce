
import type { SiteConfig } from "@/types";
import { readConfig } from "@/actions/siteActions";

let configCache: SiteConfig | null = null;

export async function getCachedConfig(): Promise<SiteConfig> {
  if (process.env.NODE_ENV !== 'development' && configCache) {
    return configCache;
  }
  
  const config = await readConfig();
  
  if (process.env.NODE_ENV !== 'development') {
    configCache = config;
  }

  return config;
}
