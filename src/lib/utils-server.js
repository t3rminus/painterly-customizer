/*
 * These functions may call server-only methods
 */
import { headers as NextHeaders } from 'next/headers';

export async function getLayoutUrl(fallback = '/') {
  const headers = await NextHeaders();
  let url = headers.get('x-url');
  if (!url) {
    const host = headers.get('x-forwarded-host') || headers.get('host');
    url = `http://${host}${fallback}`;
  }
  return url;
};