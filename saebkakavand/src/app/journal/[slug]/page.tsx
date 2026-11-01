import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import {readContent} from '@/lib/store';
export const dynamic='force-dynamic';
type Props={params:Promise<{slug:string}>};
async function getPost(slug:string){return (await readContent()).posts.find(p=>p.slug===slug&&p.published);}
export async function generateMetadata({params}:Props):Promise<Metadata>{const post=await getPost((await params).slug);return post?{title:post.title,description:post.excerpt,openGraph:{type:'article',title:post.title,description:post.excerpt,images:[post.image]}}:{title:'نوشته پیدا نشد'};}
export default async function Article({params}:Props){const p=await getPost((await params).slug);if(!p)notFound();return <><Header inner/><main id="main" className="article-shell"><article className="article-container"><nav className="breadcrumb" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><Link href="/journal">مجله</Link></nav><p className="eyebrow">{p.category}</p><h1>{p.title}</h1><div className="article-byline"><span>مجلهٔ موسیقی</span><time dateTime={p.date}>{new Date(p.date+'T12:00:00Z').toLocaleDateString('fa-IR',{year:'numeric',month:'long',day:'numeric'})}</time></div><img className="article-cover" src={p.image||'/images/portrait-blue.jpg'} alt={p.title}/><div className="article-body">{p.body.split('\n\n').map((paragraph,i)=><p key={i}>{paragraph}</p>)}</div><div className="article-bottom"><Link className="text-link ink" href="/journal">بازگشت به همهٔ نوشته‌ها ←</Link></div></article></main></>;}
