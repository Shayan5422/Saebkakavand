import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import {readContent} from '@/lib/store';
import {normalizeContent} from '@/lib/content';
import {isAdmin} from '@/lib/auth';
export const dynamic='force-dynamic';
type Props={params:Promise<{slug:string}>;searchParams:Promise<{preview?:string}>};
async function getData(props:Props){const {slug}=await props.params;const preview=(await props.searchParams).preview==='1'&&await isAdmin();const c=normalizeContent(await readContent());const b=c.banners.find(b=>b.slug===slug&&b.destination==='page'&&(b.published||preview));return {c,b,preview};}
export async function generateMetadata(props:Props):Promise<Metadata>{const {b,preview}=await getData(props);return b?{title:b.title.replaceAll('\n',' '),description:b.description,...(preview?{robots:{index:false,follow:false}}:{}),openGraph:{type:'article',title:b.title,description:b.description,images:[b.image]}}:{title:'خبر پیدا نشد',robots:{index:false}};}
export default async function NewsArticle(props:Props){const {c,b,preview}=await getData(props);if(!b)notFound();return <div className="site-shell" style={{'--gold':c.settings.accentColor} as React.CSSProperties}>{preview&&<div className="preview-notice">پیش‌نمایش خصوصی خبر <a href="/atelier-7k9m">بازگشت به مدیریت ←</a></div>}<Header inner settings={c.settings}/><main id="main" className="article-shell"><article className="article-container"><nav className="breadcrumb" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><Link href="/news">خبرها</Link></nav><p className="eyebrow">{b.eyebrow||'تازه‌ها'}</p><h1 className="editable-heading">{b.title}</h1>{b.subtitle&&<p className="article-lead">{b.subtitle}</p>}{b.date&&<div className="article-byline"><time dateTime={b.date}>{new Date(b.date+'T12:00:00Z').toLocaleDateString('fa-IR',{year:'numeric',month:'long',day:'numeric'})}</time></div>}<img className="article-cover" src={b.image} alt={b.title}/><div className="article-body">{b.body.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}</div><div className="article-bottom"><Link className="text-link ink" href="/">بازگشت به صفحهٔ نخست ←</Link></div></article></main></div>;}
