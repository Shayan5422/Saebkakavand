import type {Metadata} from 'next';
import {redirect} from 'next/navigation';
import {isAdmin} from '@/lib/auth';
import {readContent} from '@/lib/store';
import Home from '@/components/Home';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'پیش‌نمایش خصوصی',robots:{index:false,follow:false}};
export default async function Preview(){if(!await isAdmin())redirect('/atelier-7k9m');const c=await readContent();return <Home preview content={{...c,banners:c.banners?.map(b=>({...b,published:true})),posts:c.posts.map(p=>({...p,published:true})),photos:c.photos.map(p=>({...p,published:true})),releases:c.releases.map(r=>({...r,published:true,tracks:r.tracks?.map(t=>({...t,published:true}))}))}}/>;}
