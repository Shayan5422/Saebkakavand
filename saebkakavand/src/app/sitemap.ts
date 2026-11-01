import type {MetadataRoute} from 'next';
import {readContent} from '@/lib/store';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const base=process.env.NEXT_PUBLIC_SITE_URL;if(!base)return [];const content=await readContent();return [{url:base,changeFrequency:'weekly',priority:1},{url:base+'/journal',changeFrequency:'weekly',priority:.7},...content.posts.filter(p=>p.published).map(p=>({url:base+'/journal/'+p.slug,lastModified:p.date,priority:.6}))];}
