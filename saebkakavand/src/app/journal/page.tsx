import type {Metadata} from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import {readContent} from '@/lib/store';
import {normalizeContent} from '@/lib/content';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'مجلهٔ موسیقی'};
export default async function Journal(){const content=normalizeContent(await readContent());const posts=content.posts.filter(x=>x.published);const s=content.settings,c=s.copy;return <><Header inner settings={s}/><main id="main" className="article-shell journal-page"><div className="container"><div className="breadcrumb"><Link href="/">خانه</Link><span>/ {c.navJournal}</span></div><p className="eyebrow">{c.journalEyebrow}</p><h1>{c.journalTitle} {c.journalAccent}</h1><div className="journal-grid">{posts.map(p=><Link href={'/journal/'+p.slug} className="journal-card" key={p.id}><div className="journal-image"><img src={p.image||'/images/portrait-blue.jpg'} alt={p.title}/><span>{p.category}</span></div><div className="journal-meta"><span>{c.journalByline}</span><time dateTime={p.date}>{new Date(p.date+'T12:00:00Z').toLocaleDateString('fa-IR',{year:'numeric',month:'long',day:'numeric'})}</time></div><h3>{p.title}</h3><p>{p.excerpt}</p><span className="journal-read">{c.journalRead} ←</span></Link>)}</div>{!posts.length&&<p>{c.journalEmpty}</p>}</div></main></>;}
