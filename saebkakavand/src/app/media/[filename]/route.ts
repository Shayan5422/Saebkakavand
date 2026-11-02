import {NextResponse} from 'next/server';
import {promises as fs} from 'node:fs';
import path from 'node:path';
import {localDataDir} from '@/lib/store';
import {MEDIA_MIME} from '@/lib/uploads';
export async function GET(req:Request,{params}:{params:Promise<{filename:string}>}){
 const {filename}=await params;
 if(process.env.VERCEL||!/^[-a-f0-9]{36}\.(jpg|png|webp|gif|avif|mp3|wav|m4a|aac|ogg|flac|webm)$/.test(filename))return new NextResponse(null,{status:404});
 try{
  const bytes=await fs.readFile(path.join(localDataDir,'uploads',filename));
  const headers:Record<string,string>={'Content-Type':MEDIA_MIME[filename.split('.').pop()!]||'application/octet-stream','Cache-Control':'public,max-age=31536000,immutable','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes'};
  const range=req.headers.get('range');
  if(range){const m=/^bytes=(\d*)-(\d*)$/.exec(range);let start=0,end=bytes.length-1;if(!m||(!m[1]&&!m[2]))return new NextResponse(null,{status:416,headers:{'Content-Range':'bytes */'+bytes.length}});if(!m[1])start=Math.max(0,bytes.length-Number(m[2]));else{start=Number(m[1]);if(m[2])end=Math.min(end,Number(m[2]));}if(start>end||start>=bytes.length)return new NextResponse(null,{status:416,headers:{'Content-Range':'bytes */'+bytes.length}});headers['Content-Range']='bytes '+start+'-'+end+'/'+bytes.length;headers['Content-Length']=String(end-start+1);return new NextResponse(bytes.subarray(start,end+1),{status:206,headers});}
  headers['Content-Length']=String(bytes.length);return new NextResponse(bytes,{headers});
 }catch{return new NextResponse(null,{status:404});}
}
