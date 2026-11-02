import type {Content} from './types';
import {SECTION_KEYS} from './types.ts';
import {DEFAULT_COPY} from './content.ts';
import {safeLink,safeUrl} from './security.ts';
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const text=(x:unknown,max=20000):x is string=>typeof x==='string'&&x.length<=max;
const identifier=(x:unknown)=>text(x,100)&&/^[\w-]+$/.test(x);
const date=(x:unknown)=>text(x,10)&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&!Number.isNaN(Date.parse(x))&&new Date(x).toISOString().slice(0,10)===x;
const base=(x:unknown):x is Record<string,unknown>=>record(x)&&identifier(x.id)&&text(x.title,300)&&!!x.title.trim()&&safeUrl(x.image,true)&&typeof x.published==='boolean';
const unique=(rows:Record<string,unknown>[],key='id')=>new Set(rows.map(r=>r[key])).size===rows.length;
export function validateContent(value:unknown):value is Content {
 if(!record(value)||!Number.isSafeInteger(value.revision)||(value.revision as number)<0||!record(value.settings))return false;
 const s=value.settings;
 if(!['name','latinName','tagline','heroText','bio','email','instagram','beeptunes','heroImage','bioImage'].every(k=>text(s[k])))return false;
 if(!(s.name as string).trim()||!s.heroImage||!s.bioImage||!safeUrl(s.heroImage,true)||!safeUrl(s.bioImage,true)||!safeUrl(s.instagram)||!safeUrl(s.beeptunes)||(s.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email as string)))return false;
 if(s.logoImage!==undefined&&!safeUrl(s.logoImage,true))return false;
 if(s.seoTitle!==undefined&&!text(s.seoTitle,300))return false;
 if(s.seoDescription!==undefined&&!text(s.seoDescription,1000))return false;
 if(s.accentColor!==undefined&&(!text(s.accentColor,7)||!/^#[0-9a-fA-F]{6}$/.test(s.accentColor)))return false;
 if(s.carouselAutoplay!==undefined&&typeof s.carouselAutoplay!=='boolean')return false;
 if(s.carouselInterval!==undefined&&(!Number.isInteger(s.carouselInterval)||(s.carouselInterval as number)<4||(s.carouselInterval as number)>20))return false;
 if(s.copy!==undefined&&(!record(s.copy)||!Object.entries(s.copy).every(([k,v])=>Object.hasOwn(DEFAULT_COPY,k)&&text(v,2000))))return false;
 if(s.sections!==undefined&&(!record(s.sections)||!Object.entries(s.sections).every(([k,v])=>(SECTION_KEYS as readonly string[]).includes(k)&&typeof v==='boolean')))return false;
 if(s.sectionOrder!==undefined&&(!Array.isArray(s.sectionOrder)||s.sectionOrder.length!==SECTION_KEYS.length||new Set(s.sectionOrder).size!==SECTION_KEYS.length||!s.sectionOrder.every(k=>(SECTION_KEYS as readonly unknown[]).includes(k))))return false;
 if(s.facts!==undefined&&(!Array.isArray(s.facts)||s.facts.length>12||!s.facts.every(f=>record(f)&&identifier(f.id)&&text(f.value,200)&&text(f.label,200))||!unique(s.facts)))return false;
 if(!Array.isArray(value.releases)||value.releases.length>300||!Array.isArray(value.photos)||value.photos.length>500||!Array.isArray(value.posts)||value.posts.length>300)return false;
 if(!value.photos.every(r=>base(r)&&!!r.image))return false;
 if(!value.releases.every(r=>{
   if(!base(r)||!['album','single'].includes(r.kind as string)||!text(r.subtitle,300)||!text(r.year,20)||!text(r.description)||!safeUrl(r.url)||!safeUrl(r.audio,true))return false;
   if(r.audioMode!==undefined&&!['preview','full'].includes(r.audioMode as string))return false;
   if(r.tracks!==undefined&&(!Array.isArray(r.tracks)||r.tracks.length>100||!r.tracks.every(t=>record(t)&&identifier(t.id)&&text(t.title,300)&&!!t.title.trim()&&safeUrl(t.audio,true)&&text(t.duration,30)&&['preview','full'].includes(t.audioMode as string)&&typeof t.published==='boolean'&&(!t.published||!!t.audio))||!unique(r.tracks)))return false;
   return true;
 }))return false;
 if(!value.posts.every(r=>base(r)&&text(r.slug,150)&&/^[a-z0-9-]+$/.test(r.slug)&&text(r.category,80)&&text(r.excerpt,1000)&&text(r.body,100000)&&(!r.published||!!r.body.trim())&&date(r.date)))return false;
 if(value.banners!==undefined){
   if(!Array.isArray(value.banners)||value.banners.length>40||!value.banners.every(b=>base(b)&&!!b.image&&text(b.slug,150)&&/^[a-z0-9-]+$/.test(b.slug)&&text(b.subtitle,1000)&&text(b.description,3000)&&text(b.eyebrow,300)&&safeUrl(b.mobileImage,true)&&['left','center','right'].includes(b.imagePosition as string)&&text(b.buttonLabel,100)&&['page','post','release','link','none'].includes(b.destination as string)&&text(b.target,2000)&&text(b.body,100000)&&(b.date===''||date(b.date))&&(b.destination!=='link'||safeLink(b.target))&&(!b.published||b.destination!=='page'||!!(b.body as string).trim())))return false;
   if(!unique(value.banners)||!unique(value.banners,'slug'))return false;
 }
 return [value.releases,value.photos,value.posts].every(rows=>unique(rows))&&unique(value.posts,'slug');
}
