import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import postgres from 'postgres';
import { seed } from './seed';
import type { Content } from './types';

const dataDir = path.join(process.cwd(), '.data');
const file = path.join(dataDir, 'content.json');
const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
export const sql = databaseUrl ? postgres(databaseUrl, {max: 1, prepare: false, connect_timeout: 10}) : null;
export const isHosted = !!process.env.VERCEL;
export class StoreError extends Error { constructor(message: string, public status = 503) { super(message); } }
export async function readContent(): Promise<Content> {
  if (sql) {
    const rows = await sql`SELECT data, revision FROM site_content WHERE id = 'main'`;
    if (!rows.length) return structuredClone(seed);
    return {...rows[0].data, revision:rows[0].revision};
  }
  if (isHosted) return structuredClone(seed);
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch (e) { if ((e as NodeJS.ErrnoException).code === 'ENOENT') return structuredClone(seed); throw e; }
}
let queue = Promise.resolve();
export async function writeContent(content: Content): Promise<Content> {
  if (!sql && isHosted) throw new StoreError('ذخیره‌سازی هنوز راه‌اندازی نشده است. اتصال پایگاه‌داده را در تنظیمات استقرار تکمیل کنید.');
  if (sql) {
    const value = {...content, revision:content.revision + 1};
    const result = await sql`INSERT INTO site_content (id, data, revision) VALUES ('main', ${sql.json(value)}, 1)
      ON CONFLICT (id) DO UPDATE SET data = ${sql.json(value)}, revision = site_content.revision + 1
      WHERE site_content.revision = ${content.revision} RETURNING revision`;
    if (!result.length) throw new StoreError('محتوا در پنجرهٔ دیگری تغییر کرده است. صفحه را تازه کنید و دوباره تلاش کنید.',409);
    return {...value,revision:result[0].revision};
  }
  let release!: () => void;
  const previous = queue;
  queue = new Promise<void>(resolve=>{release=resolve;});
  await previous;
  try {
    const current = await readContent();
    if (current.revision !== content.revision) throw new StoreError('محتوا در پنجرهٔ دیگری تغییر کرده است. صفحه را تازه کنید.',409);
    const next = {...content, revision:current.revision + 1};
    await fs.mkdir(dataDir,{recursive:true});
    await fs.writeFile(file+'.tmp',JSON.stringify(next,null,2));
    await fs.rename(file+'.tmp',file);
    return next;
  } finally {release();}
}
