import { headers } from 'next/headers';
import { db } from './firebase';
import type { Tenant } from '@/types';
import { cache } from 'react';
import { collection, query, where, getDocs, limit, doc, getDoc, collectionGroup } from 'firebase/firestore';


export const getTenant = cache(async (): Promise<Tenant | null> => {
  const headersList = headers();
  const hostname = headersList.get('host');

  if (!hostname) {
    console.log('No hostname found in headers');
    return null;
  }
  
  // For local development, you might use a specific slug or a default tenant
  if (hostname.includes('localhost')) {
      const defaultTenantSlug = 'default-store'; // Your default tenant slug for local dev
      const tenantsRef = collection(db, 'tenants');
      const q = query(tenantsRef, where('slug', '==', defaultTenantSlug), limit(1));
      const tenantSnapshot = await getDocs(q);

      if (!tenantSnapshot.empty) {
          const tenantDoc = tenantSnapshot.docs[0];
          return { id: tenantDoc.id, ...tenantDoc.data() } as Tenant;
      }
      return null;
  }

  // Handle custom domains
  const domainsRef = collectionGroup(db, 'domains');
  const qDomains = query(domainsRef, where('name', '==', hostname), limit(1));
  const domainSnapshot = await getDocs(qDomains);

  if (!domainSnapshot.empty) {
    const domainDoc = domainSnapshot.docs[0];
    const tenantRef = domainDoc.ref.parent.parent;
    if (tenantRef) {
        const tenantDoc = await getDoc(tenantRef);
        if (tenantDoc.exists()) {
            return { id: tenantDoc.id, ...tenantDoc.data() } as Tenant;
        }
    }
  }

  // Handle subdomains (e.g., store-slug.yourapp.com)
  // This requires knowing your main app domain.
  const mainDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'example.com';
  if (hostname.endsWith(`.${mainDomain}`)) {
    const slug = hostname.replace(`.${mainDomain}`, '');
    const tenantsRef = collection(db, 'tenants');
    const qTenants = query(tenantsRef, where('slug', '==', slug), limit(1));
    const tenantSnapshot = await getDocs(qTenants);
    if (!tenantSnapshot.empty) {
        const tenantDoc = tenantSnapshot.docs[0];
        return { id: tenantDoc.id, ...tenantDoc.data() } as Tenant;
    }
  }

  console.log(`No tenant found for hostname: ${hostname}`);
  return null;
});
