import { createHmac, timingSafeEqual, createHash, randomBytes } from 'node:crypto';
export const COOKIE = 'saeb_studio';
export const SESSION_SECONDS = 60 * 60 * 12;
export function validConfig() { return !!process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length >= 12 && !!process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32; }
function key() {
  if (!validConfig()) throw new Error('تنظیمات ورود مدیر کامل نشده است.');
  return createHash('sha256').update(process.env.SESSION_SECRET!+'|'+process.env.ADMIN_PASSWORD!).digest();
}
export function equal(a: string,b: string) { return timingSafeEqual(createHash('sha256').update(a).digest(),createHash('sha256').update(b).digest()); }
export function createSession(now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({exp:Math.floor(now/1000)+SESSION_SECONDS,nonce:randomBytes(16).toString('hex')})).toString('base64url');
  return payload+'.'+createHmac('sha256',key()).update(payload).digest('base64url');
}
export function verifySession(token?: string, now = Date.now()): boolean {
  try {
    if (!token || !validConfig()) return false;
    const [payload,signature,...rest] = token.split('.');
    if (rest.length || !payload || !signature || !equal(signature,createHmac('sha256',key()).update(payload).digest('base64url'))) return false;
    const data = JSON.parse(Buffer.from(payload,'base64url').toString());
    return typeof data.exp === 'number' && data.exp > Math.floor(now/1000) && data.exp <= Math.floor(now/1000)+SESSION_SECONDS;
  } catch {return false;}
}
export function sameOrigin(origin: string | null, requestUrl: string, requestHost?: string | null) {
  if (!origin) return false;
  try {
    const expected = new URL(requestUrl);
    // Next can normalize the internal request URL to localhost in development.
    // Host is the browser's destination; compare it with Origin, never forwarded input.
    if (requestHost) expected.host = requestHost;
    return new URL(origin).origin === expected.origin;
  } catch {return false;}
}
export function safeUrl(value: unknown, local = false): boolean {
  if (typeof value !== 'string') return false;
  if (!value) return true;
  if (local && /^\/(?!\/)[a-zA-Z0-9/_\-.]+$/.test(value)) return true;
  try {const u=new URL(value); return u.protocol==='https:' && !u.username && !u.password;} catch {return false;}
}
