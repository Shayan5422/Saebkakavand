import {NextRequest,NextResponse} from 'next/server';
import {isAdmin,throttle} from '@/lib/auth';
import {COOKIE,SESSION_SECONDS,createSession,equal,sameOrigin,validConfig} from '@/lib/security';
export const dynamic='force-dynamic';
export async function GET(){return NextResponse.json({authenticated:await isAdmin()},{headers:{'Cache-Control':'no-store'}});}
export async function POST(req:NextRequest){
  if(!sameOrigin(req.headers.get('origin'),req.url,req.headers.get('host')))return NextResponse.json({error:'درخواست نامعتبر است.'},{status:403});
  if(!validConfig())return NextResponse.json({error:'ورود مدیر هنوز راه‌اندازی نشده است. تنظیمات ورود را تکمیل کنید.'},{status:503});
  try{
    const ip=req.headers.get('x-vercel-forwarded-for')?.split(',')[0]||req.headers.get('x-forwarded-for')?.split(',')[0]||'local';
    if(!await throttle(ip))return NextResponse.json({error:'تعداد تلاش‌ها زیاد است. ۱۵ دقیقهٔ دیگر دوباره تلاش کنید.'},{status:429,headers:{'Retry-After':'900'}});
    const {password}=await req.json();
    if(typeof password!=='string'||password.length>256||!equal(password,process.env.ADMIN_PASSWORD!))return NextResponse.json({error:'رمز عبور درست نیست.'},{status:401});
    const res=NextResponse.json({ok:true});
    res.cookies.set(COOKIE,createSession(),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:SESSION_SECONDS});
    return res;
  }catch(e){console.error('Login failed',e instanceof Error?e.message:'Unknown error');return NextResponse.json({error:'ورود ممکن نشد. اتصال پایگاه‌داده و تنظیمات را بررسی کنید.'},{status:503});}
}
export async function DELETE(req:NextRequest){
  if(!sameOrigin(req.headers.get('origin'),req.url,req.headers.get('host')))return NextResponse.json({error:'درخواست نامعتبر است.'},{status:403});
  const res=NextResponse.json({ok:true});res.cookies.set(COOKIE,'',{maxAge:0,path:'/',httpOnly:true,sameSite:'strict',secure:process.env.NODE_ENV==='production'});return res;
}
