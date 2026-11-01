import type {Metadata} from 'next';
import Studio from '@/components/Studio';
import {isAdmin} from '@/lib/auth';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'مدیریت محتوا',robots:{index:false,follow:false}};
export default async function StudioPage(){return <Studio initiallyAuthenticated={await isAdmin()}/>;}
