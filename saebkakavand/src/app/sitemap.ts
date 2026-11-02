import type {MetadataRoute} from 'next';
import {readContent} from '@/lib/store';
import {normalizeContent} from '@/lib/content';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const base=process.env.NEXT_PUBLIC_SITE_URL;if(!base)return [];const c=normalizeContent(await readContent());return [{url:base,changeFrequency:'weekly',priority:1},{url:base+'/journal',changeFrequency:'weekly',priority:.7},{url:base+'/news',changeFrequency:'weekly',priority:.7},...c.posts.filter(p=>p.published).map(p=>({url:base+'/journal/'+p.slug,lastModified:p.date,priority:.6})),...c.banners.filter(b=>b.published&&b.destination==='page').map(b=>({url:base+'/news/'+b.slug,...(b.date?{lastModified:b.date}:{}),priority:.7})),...c.releases.filter(r=>r.published).map(r=>({url:base+'/music/'+r.id,priority:.7}))];}
