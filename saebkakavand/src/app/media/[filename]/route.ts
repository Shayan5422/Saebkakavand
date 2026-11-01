import {NextResponse} from 'next/server';
import {promises as fs} from 'node:fs';
import path from 'node:path';
export async function GET(_req:Request,{params}:{params:Promise<{filename:string}>}){
  const {filename}=await params;
  if(process.env.VERCEL||!/^[-a-f0-9]{36}\.(jpg|png|webp|gif|avif)$/.test(filename))return new NextResponse(null,{status:404});
  try{const bytes=await fs.readFile(path.join(process.cwd(),'.data','uploads',filename));const ext=filename.split('.').pop();return new NextResponse(bytes,{headers:{'Content-Type':'image/'+(ext==='jpg'?'jpeg':ext),'Cache-Control':'public,max-age=31536000,immutable','X-Content-Type-Options':'nosniff'}});}
  catch{return new NextResponse(null,{status:404});}
}
