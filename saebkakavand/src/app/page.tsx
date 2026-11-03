import type {Metadata} from 'next';
import Home from '@/components/Home';
import {readContent} from '@/lib/store';
import {publicContent} from '@/lib/seed';
export const dynamic='force-dynamic';
export async function generateMetadata():Promise<Metadata>{const {settings:s}=await readContent();const title=s.seoTitle||s.name+' | تار، سه‌تار و موسیقی ایرانی';const description=s.seoDescription||s.heroText;return {title:{absolute:title},description,openGraph:{title,description,images:[s.heroImage]}};}
export default async function Page(){return <Home content={publicContent(await readContent())}/>;}
