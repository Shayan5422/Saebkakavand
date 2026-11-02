import type {Banner,Content,NormalizedContent,Release,Settings,SectionKey} from './types.ts';
import {SECTION_KEYS} from './types.ts';
export const SECTION_LABELS:Record<SectionKey,string>={music:'آثار و آلبوم‌ها',about:'معرفی هنرمند',quote:'متن شاعرانه',gallery:'گالری تصاویر',journal:'مجله و خبرها',contact:'ارتباط و همکاری'};
export const COPY_FIELDS:{key:string;label:string;group:SectionKey|'general'|'hero';multiline?:boolean}[]=[
 {key:'navAbout',label:'نام معرفی در منو',group:'general'},{key:'navMusic',label:'نام آثار در منو',group:'general'},{key:'navGallery',label:'نام گالری در منو',group:'general'},{key:'navJournal',label:'نام مجله در منو',group:'general'},{key:'headerContact',label:'دکمهٔ ارتباط در بالای سایت',group:'general'},
 {key:'footerText',label:'متن حقوق آثار در پایین سایت',group:'general',multiline:true},{key:'footerTop',label:'دکمهٔ بازگشت به بالا',group:'general'},
 {key:'heroEyebrow',label:'معرفی کوتاه بالای بنر پیش‌فرض',group:'hero'},{key:'heroListen',label:'دکمهٔ شنیدن آثار',group:'hero'},{key:'heroAbout',label:'دکمهٔ آشنایی با هنرمند',group:'hero'},{key:'heroScroll',label:'راهنمای پایین‌رفتن صفحه',group:'hero'},{key:'heroSide',label:'نوشتهٔ انگلیسی کنار بنر',group:'hero'},
 {key:'musicEyebrow',label:'روتیتر بخش آثار',group:'music'},{key:'musicTitle',label:'عنوان بخش آثار',group:'music'},{key:'musicAccent',label:'بخش رنگی عنوان آثار',group:'music'},{key:'musicLink',label:'عنوان لینک بیپ‌تونز',group:'music'},{key:'musicArchiveLabel',label:'روتیتر انگلیسی آرشیو',group:'music'},
 {key:'aboutEyebrow',label:'روتیتر معرفی',group:'about'},{key:'aboutTitle',label:'عنوان معرفی',group:'about',multiline:true},{key:'aboutAccent',label:'بخش رنگی عنوان معرفی',group:'about'},{key:'aboutLink',label:'عنوان لینک زندگی‌نامه',group:'about'},{key:'aboutCaption',label:'توضیح زیر عکس معرفی',group:'about'},
 {key:'quoteText',label:'متن شاعرانه',group:'quote',multiline:true},{key:'quoteAccent',label:'سطر رنگی متن شاعرانه',group:'quote'},{key:'quoteCaption',label:'نوشتهٔ زیر متن شاعرانه',group:'quote'},
 {key:'galleryEyebrow',label:'روتیتر گالری',group:'gallery'},{key:'galleryTitle',label:'عنوان گالری',group:'gallery'},{key:'galleryAccent',label:'بخش رنگی عنوان گالری',group:'gallery'},{key:'galleryDescription',label:'توضیح گالری',group:'gallery',multiline:true},
 {key:'journalEyebrow',label:'روتیتر مجله',group:'journal'},{key:'journalTitle',label:'عنوان مجله',group:'journal'},{key:'journalAccent',label:'بخش رنگی عنوان مجله',group:'journal'},{key:'journalAll',label:'دکمهٔ همهٔ نوشته‌ها',group:'journal'},{key:'journalByline',label:'نام تحریریه / نویسندهٔ پیش‌فرض',group:'journal'},{key:'journalRead',label:'دکمهٔ خواندن نوشته',group:'journal'},{key:'journalEmpty',label:'متن وقتی نوشته‌ای منتشر نشده',group:'journal'},
 {key:'contactEyebrow',label:'روتیتر ارتباط',group:'contact'},{key:'contactTitle',label:'عنوان ارتباط',group:'contact',multiline:true},{key:'contactAccent',label:'بخش رنگی عنوان ارتباط',group:'contact'},{key:'contactDescription',label:'متن دعوت به همکاری',group:'contact',multiline:true},{key:'contactFollowDescription',label:'متن ارتباط وقتی ایمیل درج نشده',group:'contact',multiline:true},{key:'contactButton',label:'دکمهٔ نوشتن ایمیل',group:'contact'},{key:'contactFollow',label:'دکمهٔ دنبال‌کردن آثار',group:'contact'},{key:'contactSignature',label:'شعار کنار نشانهٔ پایین سایت',group:'contact'}
];
export const DEFAULT_COPY:Record<string,string>={
 navAbout:'دربارهٔ صائب',navMusic:'آثار و آلبوم‌ها',navGallery:'گالری تصاویر',navJournal:'مجله',headerContact:'در ارتباط باشیم',footerText:'تمامی حقوق آثار و تصاویر برای صاحب اثر محفوظ است.',footerTop:'بازگشت به بالا',
 heroEyebrow:'آهنگساز · نوازندهٔ تار و سه‌تار',heroListen:'شنیدنِ آثار',heroAbout:'آشنایی با صائب',heroScroll:'کمی پایین‌تر، موسیقی آغاز می‌شود',heroSide:'THE ART OF PERSIAN MUSIC',
 musicEyebrow:'جهانِ شنیدنی',musicTitle:'هر اثر، یک',musicAccent:'روایت',musicLink:'شنیدن در بیپ‌تونز',musicArchiveLabel:'SELECTED DISCOGRAPHY',
 aboutEyebrow:'پشتِ این نغمه‌ها',aboutTitle:'موسیقی،\nشیوه‌ای برای',aboutAccent:'زیستن',aboutLink:'زندگی و مسیر هنری در بیپ‌تونز',aboutCaption:'صائب کاکاوند / تار و سه‌تار',
 quoteText:'گاه، یک نغمه',quoteAccent:'تمامِ حرفِ دل است.',quoteCaption:'در خلوتِ موسیقی ایرانی',
 galleryEyebrow:'قاب‌های ماندگار',galleryTitle:'روایتِ',galleryAccent:'تصویر',galleryDescription:'لحظه‌هایی میان ساز،\nسکوت و سایه‌روشن.',
 journalEyebrow:'واژه‌هایی کنار نُت‌ها',journalTitle:'از ساز، از',journalAccent:'کلمه',journalAll:'همهٔ نوشته‌ها',journalByline:'مجلهٔ موسیقی',journalRead:'ادامهٔ نوشته',journalEmpty:'به‌زودی، نوشته‌هایی تازه از جهان موسیقی.',
 contactEyebrow:'آغازی برای یک همراهی',contactTitle:'گفت‌وگو از اینجا',contactAccent:'آغاز می‌شود.',contactDescription:'برای همکاری هنری، اجرا و گفت‌وگو، در ارتباط باشیم.',contactFollowDescription:'آثار و تازه‌های موسیقایی صائب کاکاوند را دنبال کنید.',contactButton:'نوشتن برای صائب',contactFollow:'همراه شدن در بیپ‌تونز',contactSignature:'نوایی از ریشه، روایتی رو به فردا'
};
export function defaultBanners(s:Settings):Banner[]{return [
 {id:'banner-welcome',slug:'welcome',title:s.name.replace(' ','\n'),subtitle:s.tagline,description:s.heroText,eyebrow:s.copy?.heroEyebrow||DEFAULT_COPY.heroEyebrow,image:s.heroImage,mobileImage:'',imagePosition:'center',buttonLabel:DEFAULT_COPY.heroListen,destination:'link',target:'/#music',body:'',date:'',published:true},
 {id:'banner-music',slug:'world-of-music',title:'جهانی از\nناگفته‌ها',subtitle:'با تار و سه‌تار',description:'آلبوم‌ها و تک‌آهنگ‌ها؛ هر اثر، روایتی برای شنیدن.',eyebrow:'آثار صائب کاکاوند',image:s.bioImage,mobileImage:'',imagePosition:'center',buttonLabel:'کشف آثار',destination:'link',target:'/#music',body:'',date:'',published:true}
];}
// Fill only new fields: previously saved records, their IDs and their order are preserved.
export function normalizeContent(value:Content):NormalizedContent {
 const s=value.settings;
 const copy={...DEFAULT_COPY,...s.copy};
 const sections=Object.fromEntries(SECTION_KEYS.map(k=>[k,s.sections?.[k]??true])) as Record<SectionKey,boolean>;
 const settings={...s,copy,sections,sectionOrder:s.sectionOrder??[...SECTION_KEYS],facts:s.facts??[{id:'fact-instruments',value:'تار و سه‌تار',label:'سازهای تخصصی'},{id:'fact-education',value:'اتنوموزیکولوژی',label:'کارشناسی ارشد'},{id:'fact-group',value:'۱۳۹۳',label:'بنیان‌گذاری گروه صائب'}],carouselAutoplay:s.carouselAutoplay??true,carouselInterval:s.carouselInterval??7,accentColor:s.accentColor??'#c4a576'};
 return {...value,settings,banners:value.banners??defaultBanners(settings),releases:value.releases.map(r=>({...r,audioMode:r.audioMode??'preview',tracks:r.tracks??[]}))};
}
export function visibleContent(value:Content):NormalizedContent {
 const c=normalizeContent(value);
 return {...c,banners:c.banners.filter(x=>x.published),photos:c.photos.filter(x=>x.published),posts:c.posts.filter(x=>x.published),releases:c.releases.filter(x=>x.published).map(r=>({...r,tracks:r.tracks?.filter(t=>t.published)}))};
}
export function bannerHref(b:Banner,c:Content):string {
 if(b.destination==='page')return '/news/'+b.slug;
 if(b.destination==='post'){const p=c.posts.find(p=>p.id===b.target&&p.published);return p?'/journal/'+p.slug:'';}
 if(b.destination==='release'){const r=c.releases.find(r=>r.id===b.target&&r.published);return r?'/music/'+r.id:'';}
 return b.destination==='link'?b.target:'';
}
export function moveItem<T extends {id:string}>(items:T[],id:string,offset:number):T[]{const from=items.findIndex(x=>x.id===id);const to=from+offset;if(from<0||to<0||to>=items.length)return items;const next=[...items];[next[from],next[to]]=[next[to],next[from]];return next;}
export function releaseTracks(r:Release){return r.tracks?.filter(t=>t.published&&t.audio)??[];}
