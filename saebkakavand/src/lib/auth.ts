import 'server-only';
import { cookies } from 'next/headers';
import { createHash } from 'node:crypto';
import { sql, isHosted, StoreError } from './store';
import { COOKIE, verifySession } from './security';
const attempts = new Map<string,{count:number;expires:number}>();
export async function isAdmin() {return verifySession((await cookies()).get(COOKIE)?.value);}
export async function throttle(ip: string) {
  const key = createHash('sha256').update(ip).digest('hex');
  const now = Date.now();
  if (sql) {
    const rows = await sql`INSERT INTO login_attempts (key, count, expires) VALUES (${key},1,${now+900000})
      ON CONFLICT (key) DO UPDATE SET count = CASE WHEN login_attempts.expires < ${now} THEN 1 ELSE login_attempts.count+1 END,
      expires = CASE WHEN login_attempts.expires < ${now} THEN ${now+900000} ELSE login_attempts.expires END RETURNING count`;
    return rows[0].count<=10;
  }
  if (isHosted) throw new StoreError('برای فعال‌شدن ورود مدیریت، اتصال پایگاه‌داده را تکمیل کنید.');
  for (const [k,v] of attempts) if(v.expires<now)attempts.delete(k);
  const entry = attempts.get(key)||{count:0,expires:now+900000};
  entry.count++; attempts.set(key,entry); return entry.count<=10;
}
