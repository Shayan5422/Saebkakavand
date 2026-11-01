import {NextRequest,NextResponse} from 'next/server';
import {handleUpload,type HandleUploadBody} from '@vercel/blob/client';
import {isAdmin} from '@/lib/auth';
import {sameOrigin} from '@/lib/security';
import {MAX_IMAGE_BYTES,imageTypes,detectImage} from '@/lib/uploads';
import {randomUUID} from 'node:crypto';
import {promises as fs} from 'node:fs';
import path from 'node:path';
export const runtime='nodejs';
export async function POST(req:NextRequest){
  try{
    if(req.headers.get('content-type')?.includes('application/json')){
      if(!process.env.BLOB_READ_WRITE_TOKEN)return NextResponse.json({error:'فضای آپلود آنلاین هنوز متصل نشده است.'},{status:503});
      const body=await req.json() as HandleUploadBody;
      if(body.type==='blob.generate-client-token'&&(!sameOrigin(req.headers.get('origin'),req.url,req.headers.get('host'))||!await isAdmin()))return NextResponse.json({error:'لطفاً دوباره وارد شوید.'},{status:401});
      const result=await handleUpload({body,request:req,onBeforeGenerateToken:async pathname=>{
        if(!await isAdmin())throw new Error('Unauthorized');
        if(!/^media\/[a-zA-Z0-9._-]+$/.test(pathname))throw new Error('Invalid pathname');
        return {allowedContentTypes:imageTypes,maximumSizeInBytes:MAX_IMAGE_BYTES,addRandomSuffix:true};
      },onUploadCompleted:async()=>{}});
      return NextResponse.json(result);
    }
    if(!sameOrigin(req.headers.get('origin'),req.url,req.headers.get('host'))||!await isAdmin())return NextResponse.json({error:'لطفاً دوباره وارد شوید.'},{status:401});
    if(process.env.VERCEL)return NextResponse.json({error:'فضای آپلود آنلاین هنوز متصل نشده است.'},{status:503});
    const form=await req.formData();const file=form.get('file');
    if(!(file instanceof File)||file.size>MAX_IMAGE_BYTES||!imageTypes.includes(file.type))return NextResponse.json({error:'یک عکس JPG، PNG، WebP، GIF یا AVIF تا ۸ مگابایت انتخاب کنید.'},{status:400});
    const bytes=Buffer.from(await file.arrayBuffer());const extension=detectImage(bytes);
    if(!extension)return NextResponse.json({error:'فایل انتخاب‌شده یک تصویر معتبر نیست.'},{status:400});
    const filename=randomUUID()+'.'+extension;const folder=path.join(process.cwd(),'.data','uploads');
    await fs.mkdir(folder,{recursive:true});await fs.writeFile(path.join(folder,filename),bytes);
    return NextResponse.json({url:'/media/'+filename});
  }catch{ return NextResponse.json({error:'بارگذاری عکس انجام نشد. اتصال فضای فایل و حجم تصویر را بررسی کنید.'},{status:400});}
}
