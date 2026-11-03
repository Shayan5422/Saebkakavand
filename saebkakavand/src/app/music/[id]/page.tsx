import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import ReleaseView from '@/components/ReleaseView';
import {readContent} from '@/lib/store';
import {isAdmin} from '@/lib/auth';
export const dynamic='force-dynamic';
type Props={params:Promise<{id:string}>;searchParams:Promise<{preview?:string}>};
async function data(props:Props){const {id}=await props.params;const preview=(await props.searchParams).preview==='1'&&await isAdmin();const c=await readContent();const r=c.releases.find(r=>r.id===id&&(r.published||preview));return {c,r:r?{...r,tracks:r.tracks?.filter(t=>t.published||preview)}:undefined,preview};}
export async function generateMetadata(props:Props):Promise<Metadata>{const {r,preview}=await data(props);return r?{title:r.title,description:r.description,...(preview?{robots:{index:false,follow:false}}:{}),openGraph:{title:r.title,description:r.description,images:r.image?[r.image]:[]}}:{title:'اثر پیدا نشد',robots:{index:false}};}
export default async function MusicPage(props:Props){const {c,r,preview}=await data(props);if(!r)notFound();return <div className="site-shell" style={{'--gold':c.settings.accentColor} as React.CSSProperties}>{preview&&<div className="preview-notice">پیش‌نمایش خصوصی اثر <a href="/atelier-7k9m">بازگشت به مدیریت ←</a></div>}<Header inner settings={c.settings}/><main id="main" className="release-page section"><div className="container"><nav className="breadcrumb"><Link href="/">خانه</Link><span>/</span><Link href="/#music">آثار</Link></nav><ReleaseView release={r}/></div></main></div>;}
