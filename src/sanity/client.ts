import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '4t4kdvuq',
  dataset: 'production',
  apiVersion: 'vX',
  useCdn: false,
});
