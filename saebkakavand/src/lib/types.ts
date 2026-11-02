export type Track = {id:string;title:string;audio:string;duration:string;audioMode:'preview'|'full';published:boolean};
export type Release = {
  id: string; title: string; subtitle: string; kind: 'album' | 'single';
  image: string; year: string; description: string; url: string;
  audio: string; published: boolean; audioMode?:'preview'|'full'; tracks?:Track[];
};
export type Photo = { id: string; title: string; image: string; published: boolean };
export type Post = { id: string; title: string; slug: string; category: string; excerpt: string; body: string; image: string; date: string; published: boolean };
export type Settings = {
  name: string; latinName: string; tagline: string; heroText: string; heroImage: string;
  bio: string; bioImage: string; email: string; instagram: string; beeptunes: string;
  logoImage?:string; seoTitle?:string; seoDescription?:string;
  accentColor?:string; carouselAutoplay?:boolean; carouselInterval?:number;
  copy?:Record<string,string>; sectionOrder?:SectionKey[]; sections?:Partial<Record<SectionKey,boolean>>;
  facts?:{id:string;value:string;label:string}[];
};
export const SECTION_KEYS=['music','about','quote','gallery','journal','contact'] as const;
export type SectionKey=typeof SECTION_KEYS[number];
export type Banner={id:string;slug:string;title:string;subtitle:string;description:string;eyebrow:string;image:string;mobileImage:string;imagePosition:'left'|'center'|'right';buttonLabel:string;destination:'page'|'post'|'release'|'link'|'none';target:string;body:string;date:string;published:boolean};
export type Content = { revision: number; settings: Settings; releases: Release[]; photos: Photo[]; posts: Post[]; banners?:Banner[] };
export type NormalizedContent=Content & {banners:Banner[];settings:Settings & {copy:Record<string,string>;sections:Record<SectionKey,boolean>;sectionOrder:SectionKey[];facts:{id:string;value:string;label:string}[];carouselAutoplay:boolean;carouselInterval:number;accentColor:string}};
