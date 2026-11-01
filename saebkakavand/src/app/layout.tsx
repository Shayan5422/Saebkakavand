import type {Metadata} from 'next';
import './globals.css';
const base=process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://'+process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_URL ? 'https://'+process.env.VERCEL_URL : 'http://localhost:3000');
export const metadata:Metadata={
  metadataBase:new URL(base),
  title:{default:'صائب کاکاوند | تار، سه‌تار و موسیقی ایرانی',template:'%s | صائب کاکاوند'},
  description:'جهان موسیقی صائب کاکاوند؛ نوازندهٔ تار و سه‌تار. آرشیو آلبوم‌ها و تک‌آهنگ‌ها، تصاویر و نوشته‌هایی از موسیقی ایرانی.',
  openGraph:{title:'صائب کاکاوند | Saeb Kakavand',description:'روایتی از جان، به زبان ساز',locale:'fa_IR',type:'website',images:[{url:'/images/performance.jpg',width:1280,height:960}]},
  twitter:{card:'summary_large_image'},icons:{icon:'/icon.svg'},robots:{index:true,follow:true}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fa" dir="rtl"><body><a href="#main" className="skip-link">رفتن به محتوای اصلی</a>{children}</body></html>;}
