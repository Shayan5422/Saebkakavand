'use client';
import {useEffect,useState} from 'react';
import type {NormalizedContent} from '@/lib/types';
import {bannerHref} from '@/lib/content';
import {Icon} from './Icon';
export default function HeroCarousel({content,preview=false}:{content:NormalizedContent;preview?:boolean}){
 const {settings:s}=content;const slides=content.banners;const c=s.copy;
 const [index,setIndex]=useState(0);const [paused,setPaused]=useState(false);const [hover,setHover]=useState(false);const [focused,setFocused]=useState(false);const [hidden,setHidden]=useState(false);const [reduced,setReduced]=useState(false);
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(media.matches);const visibility=()=>setHidden(document.hidden);change();visibility();media.addEventListener('change',change);document.addEventListener('visibilitychange',visibility);return()=>{media.removeEventListener('change',change);document.removeEventListener('visibilitychange',visibility);};},[]);
 useEffect(()=>{if(index>=slides.length)setIndex(0);},[index,slides.length]);
 useEffect(()=>{if(slides.length<2)return;const next=slides[(index+1)%slides.length];if(next){const image=new Image();image.src=window.innerWidth<=600&&next.mobileImage?next.mobileImage:next.image;}},[index,slides]);
 useEffect(()=>{if(slides.length<2||!s.carouselAutoplay||paused||hover||focused||hidden||reduced)return;const timer=setTimeout(()=>setIndex(n=>(n+1)%slides.length),s.carouselInterval*1000);return()=>clearTimeout(timer);},[index,slides.length,s.carouselAutoplay,s.carouselInterval,paused,hover,focused,hidden,reduced]);
 if(!slides.length)return null;
 const active=slides[index]||slides[0];let href=bannerHref(active,content);if(preview&&/^\/(news|journal|music)\//.test(href))href+='?preview=1';
 const title=active.title.split('\n');
 return <section className="hero hero-carousel" aria-label="بنرهای صفحهٔ نخست" aria-roledescription="اسلایدر" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setFocused(false);}}>
   <div className="hero-art" key={active.id}><picture>{active.mobileImage&&<source media="(max-width: 600px)" srcSet={active.mobileImage}/>}<img src={active.image} alt={active.title.replaceAll('\n',' ')} fetchPriority="high" style={{objectPosition:active.imagePosition==='left'?'25% center':active.imagePosition==='right'?'75% center':'50% center'}}/></picture><div className="hero-art-shade"/></div>
   {href&&<a className="hero-click-area" href={href} tabIndex={-1} aria-hidden="true"/>}
   <div className="hero-strings" aria-hidden="true"><i/><i/><i/><i/></div>
   <div className="container hero-content"><div className={'hero-copy'+(active.title.length>42?' hero-long-title':'')} aria-live={paused?'polite':'off'} aria-atomic="true"><div className="eyebrow"><span className="gold-line"/>{active.eyebrow}</div><h1>{title[0]}{title.length>1&&<><br/><span>{title.slice(1).join('\n')}</span></>}</h1>{active.subtitle&&<p className="hero-tagline">{active.subtitle}</p>}<p className="hero-description">{active.description}</p><div className="hero-actions">{href&&<a href={href} className="button gold">{active.buttonLabel||'بیشتر بخوانید'}<Icon name="arrow" size={17}/></a>}{s.sections.about&&<a href="#about" className="text-link">{c.heroAbout}<Icon name="arrow" size={18}/></a>}</div></div></div>
   <span className="hero-side" aria-hidden="true">{c.heroSide}</span>
   <div className="hero-bottom container"><a href={'#'+(s.sectionOrder.find(k=>s.sections[k])||'main')} className="scroll-hint"><span className="scroll-mark"/>{c.heroScroll}</a></div>
   {slides.length>1&&<div className="hero-controls"><div className="hero-slide-buttons"><button className="icon-button" aria-label="بنر قبلی" onClick={()=>setIndex((index-1+slides.length)%slides.length)}>→</button><span className="hero-slide-count" dir="ltr">{String(index+1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}</span><button className="icon-button" aria-label="بنر بعدی" onClick={()=>setIndex((index+1)%slides.length)}>←</button></div><div className="hero-dots" aria-label="انتخاب بنر">{slides.map((b,i)=><button key={b.id} className={i===index?'active':''} aria-label={'نمایش بنر '+(i+1)+': '+b.title.replaceAll('\n',' ')} aria-current={i===index?'true':undefined} onClick={()=>setIndex(i)}/>)}</div>{s.carouselAutoplay&&!reduced&&<button className="icon-button" aria-label={paused?'شروع تعویض خودکار بنرها':'توقف تعویض خودکار بنرها'} aria-pressed={paused} onClick={()=>setPaused(!paused)}><Icon name={paused?'play':'pause'} size={16}/></button>}</div>}
 </section>;
}
