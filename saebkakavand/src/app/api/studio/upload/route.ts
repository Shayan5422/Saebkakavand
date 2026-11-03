import {NextRequest,NextResponse} from 'next/server';
import {handleUpload,type HandleUploadBody} from '@vercel/blob/client';
import {isAdmin} from '@/lib/auth';
import {sameOrigin} from '@/lib/security';
import {MAX_IMAGE_BYTES,MAX_AUDIO_BYTES,imageTypes,audioTypes,detectImage,detectAudio} from '@/lib/uploads';
import {randomUUID} from 'node:crypto';
import {promises as fs} from 'node:fs';
import path from 'node:path';
import {localDataDir} from '@/lib/store';
export const runtime='nodejs';
export async function POST(req:NextRequest){
  try{
    if(req.headers.get('content-type')?.includes('application/json')){
      if(!process.env.BLOB_READ_WRITE_TOKEN)return NextResponse.json({error:'فضای آپلود آنلاین هنوز متصل نشده است.'},{status:503});
      const body=await req.json() as HandleUploadBody;
      if(body.type==='blob.generate-client-token'&&(!sameOrigin(req.headers.get('origin'),req.url,req.headers.get('host'))||!await isAdmin()))return NextResponse.json({error:'لطفاً دوباره وارد شوید.'},{status:401});
      const result=await handleUpload({body,request:req,onBeforeGenerateToken:async pathname=>{
        if(!await isAdmin())throw new Error('Unauthorized');
        if(!/^media\/(?:images\/|audio\/)?[a-zA-Z0-9._-]+$/.test(pathname))throw new Error('Invalid pathname');
        const audio=pathname.startsWith('media/audio/');
        return {allowedContentTypes:audio?audioTypes:imageTypes,maximumSizeInBytes:audio?MAX_AUDIO_BYTES:MAX_IMAGE_BYTES,addRandomSuffix:true};
      },onUploadCompleted:async()=>{}});
      return NextResponse.json(result);
    }
    if(!sameOrigin(req.headers.get('origin'),req.url,req.headers.get('host'))||!await isAdmin())return NextResponse.json({error:'لطفاً دوباره وارد شوید.'},{status:401});
    if(process.env.VERCEL)return NextResponse.json({error:'فضای آپلود آنلاین هنوز متصل نشده است.'},{status:503});
    const form=await req.formData();const file=form.get('file');const audio=form.get('kind')==='audio';
    if(!(file instanceof File)||file.size>(audio?MAX_AUDIO_BYTES:MAX_IMAGE_BYTES)||(!audio&&!imageTypes.includes(file.type)))return NextResponse.json({error:audio?'یک فایل صوتی معتبر تا ۱۰۰ مگابایت انتخاب کنید.':'یک عکس معتبر تا ۸ مگابایت انتخاب کنید.'},{status:400});
    const bytes=Buffer.from(await file.arrayBuffer());const extension=audio?detectAudio(bytes):detectImage(bytes);
    if(!extension)return NextResponse.json({error:'فرمت فایل انتخاب‌شده معتبر نیست.'},{status:400});
    const filename=randomUUID()+'.'+extension;const folder=path.join(localDataDir,'uploads');
    await fs.mkdir(folder,{recursive:true});await fs.writeFile(path.join(folder,filename),bytes);
    return NextResponse.json({url:'/media/'+filename});
  }catch{ return NextResponse.json({error:'بارگذاری انجام نشد. اتصال فضای فایل و حجم آن را بررسی کنید.'},{status:400});}
}
