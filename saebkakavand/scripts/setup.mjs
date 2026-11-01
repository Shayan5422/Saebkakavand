import {existsSync,promises as fs} from 'node:fs';
import {randomBytes} from 'node:crypto';
import {createInterface} from 'node:readline/promises';
import {stdin,stdout} from 'node:process';
if(existsSync('.env.local')){console.log('تنظیمات محلی از قبل موجود است؛ تغییری داده نشد.');process.exit(0);}
const rl=createInterface({input:stdin,output:stdout});
let password='';
while(password.length<12){password=await rl.question('یک رمز عبور دست‌کم ۱۲ کاراکتری برای مدیریت بنویسید: ');if(password.length<12)console.log('رمز عبور باید حداقل ۱۲ کاراکتر داشته باشد.');}
rl.close();
await fs.writeFile('.env.local','ADMIN_PASSWORD='+JSON.stringify(password)+'\nSESSION_SECRET='+randomBytes(48).toString('hex')+'\nPOSTGRES_URL=\nBLOB_READ_WRITE_TOKEN=\nNEXT_PUBLIC_SITE_URL=\n',{mode:0o600,flag:'wx'});
console.log('تنظیمات ذخیره شد. با npm run dev سایت را اجرا کنید. پنل مدیریت: /atelier-7k9m');
