import type {Metadata} from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import {readContent} from '@/lib/store';
import {normalizeContent} from '@/lib/content';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'تازه‌ها و خبرها'};
export default async function News(){const c=normalizeContent(await readContent());const news=c.banners.filter(b=>b.published&&b.destination==='page');return <><Header inner settings={c.settings}/><main id="main" className="article-shell journal-page"><div className="container"><div className="breadcrumb"><Link href="/">خانه</Link><span>/ تازه‌ها</span></div><h1>تازه‌ها و خبرها</h1><div className="journal-grid">{news.map(b=><Link href={'/news/'+b.slug} key={b.id} className="journal-card"><div className="journal-image"><img src={b.image} alt={b.title}/><span>{b.eyebrow||'خبر'}</span></div><h3 className="editable-heading">{b.title}</h3><p>{b.description}</p><span className="journal-read">{b.buttonLabel||'ادامهٔ خبر'} ←</span></Link>)}</div>{!news.length&&<p>هنوز خبری منتشر نشده است.</p>}</div></main></>;}
