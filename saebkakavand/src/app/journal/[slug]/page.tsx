import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import {readContent} from '@/lib/store';
import {normalizeContent} from '@/lib/content';
import {isAdmin} from '@/lib/auth';
export const dynamic='force-dynamic';
type Props={params:Promise<{slug:string}>;searchParams:Promise<{preview?:string}>};
async function getData(props:Props){const {slug}=await props.params;const preview=(await props.searchParams).preview==='1'&&await isAdmin();const c=normalizeContent(await readContent());return{c,p:c.posts.find(p=>p.slug===slug&&(p.published||preview)),preview};}
export async function generateMetadata(props:Props):Promise<Metadata>{const {p,preview}=await getData(props);return p?{title:p.title,description:p.excerpt,...(preview?{robots:{index:false,follow:false}}:{}),openGraph:{type:'article',title:p.title,description:p.excerpt,images:[p.image]}}:{title:'نوشته پیدا نشد',robots:{index:false}};}
export default async function Article(props:Props){const {c,p,preview}=await getData(props);if(!p)notFound();return <div className="site-shell" style={{'--gold':c.settings.accentColor} as React.CSSProperties}>{preview&&<div className="preview-notice">پیش‌نمایش خصوصی نوشته <a href="/atelier-7k9m">بازگشت به مدیریت ←</a></div>}<Header inner settings={c.settings}/><main id="main" className="article-shell"><article className="article-container"><nav className="breadcrumb" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><Link href="/journal">{c.settings.copy.navJournal}</Link></nav><p className="eyebrow">{p.category}</p><h1>{p.title}</h1><div className="article-byline"><span>{c.settings.copy.journalByline}</span><time dateTime={p.date}>{new Date(p.date+'T12:00:00Z').toLocaleDateString('fa-IR',{year:'numeric',month:'long',day:'numeric'})}</time></div><img className="article-cover" src={p.image||'/images/portrait-blue.jpg'} alt={p.title}/><div className="article-body">{p.body.split('\n\n').map((paragraph,i)=><p key={i}>{paragraph}</p>)}</div><div className="article-bottom"><Link className="text-link ink" href="/journal">{c.settings.copy.journalAll} ←</Link></div></article></main></div>;}
