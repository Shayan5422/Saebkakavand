import Home from '@/components/Home';
import {readContent} from '@/lib/store';
import {publicContent} from '@/lib/seed';
export const dynamic='force-dynamic';
export default async function Page(){const content=publicContent(await readContent());return <Home content={content}/>;}
