import {NextRequest,NextResponse} from 'next/server';
import {isAdmin} from '@/lib/auth';
import {sameOrigin} from '@/lib/security';
import {readContent,writeContent,StoreError,sql,isHosted} from '@/lib/store';
import {validateContent} from '@/lib/validation';
export const dynamic='force-dynamic';
export async function GET(){
  if(!await isAdmin())return NextResponse.json({error:'لطفاً دوباره وارد شوید.'},{status:401});
  try{return NextResponse.json({content:await readContent(),storage:sql?'cloud':'local',uploads:process.env.BLOB_READ_WRITE_TOKEN?'cloud':isHosted?'unconfigured':'local'},{headers:{'Cache-Control':'no-store'}});}
  catch{return NextResponse.json({error:'دریافت محتوا ممکن نشد. اتصال پایگاه‌داده را بررسی کنید.'},{status:503});}
}
export async function PUT(req:NextRequest){
  if(!sameOrigin(req.headers.get('origin'),req.url,req.headers.get('host')))return NextResponse.json({error:'درخواست نامعتبر است.'},{status:403});
  if(!await isAdmin())return NextResponse.json({error:'نشست شما پایان یافته است. دوباره وارد شوید.'},{status:401});
  if(Number(req.headers.get('content-length')||0)>3500000)return NextResponse.json({error:'حجم محتوا بیش از حد مجاز است.'},{status:413});
  try{
    const raw=await req.text();if(Buffer.byteLength(raw,'utf8')>3500000)return NextResponse.json({error:'حجم محتوا بیش از حد مجاز است.'},{status:413});
    const content=JSON.parse(raw);
    if(!validateContent(content))return NextResponse.json({error:'اطلاعات فرم کامل یا معتبر نیست. عنوان، آدرس‌ها و تاریخ نوشته‌ها را بررسی کنید.'},{status:400});
    const previous=await readContent();
    const next={...content,settings:{...previous.settings,...content.settings},banners:content.banners??previous.banners};
    return NextResponse.json({content:await writeContent(next)});
  }catch(e){return NextResponse.json({error:e instanceof StoreError?e.message:'ذخیره انجام نشد. دوباره تلاش کنید.'},{status:e instanceof StoreError?e.status:500});}
}
