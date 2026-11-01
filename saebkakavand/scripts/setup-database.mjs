import postgres from 'postgres';
import {existsSync,readFileSync} from 'node:fs';
if(existsSync('.env.local'))process.loadEnvFile('.env.local');
const url=process.env.POSTGRES_URL||process.env.DATABASE_URL;
if(!url){console.error('POSTGRES_URL را تنظیم کنید.');process.exit(1);}
const sql=postgres(url,{max:1,prepare:false,connect_timeout:10});
try{
  await sql`CREATE TABLE IF NOT EXISTS site_content (id TEXT PRIMARY KEY, data JSONB NOT NULL, revision INTEGER NOT NULL DEFAULT 0)`;
  await sql`CREATE TABLE IF NOT EXISTS login_attempts (key TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0, expires BIGINT NOT NULL)`;
  console.log('Database is ready. Existing content was preserved.');
}catch(e){console.error('Database setup failed:',e.message);process.exitCode=1;}finally{await sql.end();}
