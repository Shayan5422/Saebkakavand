import type { Content } from './types';
import { safeUrl } from './security.ts';
const text = (x: unknown, max=20000): x is string => typeof x === 'string' && x.length<=max;
export function validateContent(x: unknown): x is Content {
  if (!x || typeof x !== 'object') return false;
  const c = x as Content;
  if (!Number.isSafeInteger(c.revision)||c.revision<0||!c.settings||!Array.isArray(c.releases)||!Array.isArray(c.photos)||!Array.isArray(c.posts)||c.releases.length>300||c.photos.length>500||c.posts.length>300) return false;
  if (!['name','latinName','tagline','heroText','bio','email','instagram','beeptunes','heroImage','bioImage'].every(k=>text(c.settings[k as keyof Content['settings']]))) return false;
  if (!c.settings.name.trim()||!c.settings.heroImage||!c.settings.bioImage||!safeUrl(c.settings.heroImage,true)||!safeUrl(c.settings.bioImage,true)||!safeUrl(c.settings.instagram)||!safeUrl(c.settings.beeptunes)|| (c.settings.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.settings.email))) return false;
  const base=(r:{id:string;image:string;title:string;published:boolean})=>text(r.id,100)&&/^[\w-]+$/.test(r.id)&&text(r.title,300)&&!!r.title.trim()&&safeUrl(r.image,true)&&typeof r.published==='boolean';
  if (!c.photos.every(r=>base(r)&&!!r.image)) return false;
  if (!c.releases.every(r=>base(r)&&['album','single'].includes(r.kind)&&text(r.subtitle,300)&&text(r.year,20)&&text(r.description)&&safeUrl(r.url)&&safeUrl(r.audio,true))) return false;
  if (!c.posts.every(r=>base(r)&&text(r.slug,150)&&/^[a-z0-9-]+$/.test(r.slug)&&text(r.category,80)&&text(r.excerpt,1000)&&text(r.body,100000)&&/^\d{4}-\d{2}-\d{2}$/.test(r.date)&&!Number.isNaN(Date.parse(r.date)))) return false;
  for (const rows of [c.releases,c.photos,c.posts]) if (new Set(rows.map(r=>r.id)).size!==rows.length) return false;
  return new Set(c.posts.map(r=>r.slug)).size===c.posts.length;
}
