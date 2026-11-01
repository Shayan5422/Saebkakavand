'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import type {Content,Photo,Release} from '@/lib/types';
import Header from './Header';
import Modal from './Modal';
import {Emblem,Icon} from './Icon';

export default function Home({content}:{content:Content}) {
  const {settings:s,releases,photos,posts}=content;
  const [filter,setFilter]=useState<'all'|'album'|'single'>('all');
  const [expanded,setExpanded]=useState(false);
  const [release,setRelease]=useState<Release|null>(null);
  const [photo,setPhoto]=useState<Photo|null>(null);
  const [playing,setPlaying]=useState<Release|null>(null);
  const [isPlaying,setIsPlaying]=useState(false);
  const [audioError,setAudioError]=useState('');
  const audio=useRef<HTMLAudioElement>(null);
  const filtered=releases.filter(r=>filter==='all'||r.kind===filter);
  const visible=expanded?filtered:filtered.slice(0,4);
    const start=(r:Release)=>{if(r.audio){setAudioError('');setPlaying(r);setIsPlaying(true);}else setRelease(r);};
  useEffect(()=>{if(playing&&audio.current){audio.current.load();audio.current.play().catch(()=>{setIsPlaying(false);setAudioError('پخش خودکار انجام نشد؛ دکمهٔ پخش را بزنید.');});}},[playing]);
  useEffect(()=>{const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));return()=>observer.disconnect();},[]);
  function nextPhoto(direction:number){if(!photo)return;const i=photos.findIndex(p=>p.id===photo.id);setPhoto(photos[(i+direction+photos.length)%photos.length]);}
  return <>
    <Header name={s.name} latinName={s.latinName}/>
    <main id="main">
      <section className="hero" aria-label="معرفی هنرمند">
        <div className="hero-art"><img src={s.heroImage} alt="صائب کاکاوند در حال نواختن تار" fetchPriority="high"/><div className="hero-art-shade"/></div>
        <div className="hero-strings" aria-hidden="true"><i/><i/><i/><i/></div>
        <div className="container hero-content"><div className="hero-copy"><div className="eyebrow"><span className="gold-line"/>آهنگساز · نوازندهٔ تار و سه‌تار</div><h1>{s.name.split(' ')[0]}<br/><span>{s.name.split(' ').slice(1).join(' ')}</span></h1><p className="hero-tagline">{s.tagline}</p><p className="hero-description">{s.heroText}</p><div className="hero-actions"><a href="#music" className="button gold">شنیدنِ آثار <Icon name="play" size={16}/></a><a href="#about" className="text-link">آشنایی با صائب <Icon name="arrow" size={18}/></a></div></div></div>
        <span className="hero-side" aria-hidden="true">THE ART OF PERSIAN MUSIC</span>
        <div className="hero-bottom container"><a href="#music" className="scroll-hint"><span className="scroll-mark"/>کمی پایین‌تر، موسیقی آغاز می‌شود</a><span className="hero-signature" dir="ltr">Saeb Kakavand <i>—</i> تار و سه‌تار</span></div>
      </section>

      <section className="music-section section" id="music"><div className="container">
        <div className="section-top reveal"><div><p className="eyebrow">۰۱ <span/> جهانِ شنیدنی</p><h2>هر اثر، یک <em>روایت</em></h2></div><a className="text-link subtle" href={s.beeptunes} target="_blank" rel="noreferrer">شنیدن در بیپ‌تونز <Icon name="external" size={16}/></a></div>
        <div className="music-toolbar"><div className="tabs" role="group" aria-label="نوع اثر">{([['all','همهٔ آثار'],['album','آلبوم‌ها'],['single','تک‌آهنگ‌ها']] as const).map(([id,label])=><button key={id} className={filter===id?'active':''} aria-pressed={filter===id} onClick={()=>{setFilter(id);setExpanded(false);}}>{label}<span>{(id==='all'?releases:releases.filter(r=>r.kind===id)).length.toLocaleString('fa-IR')}</span></button>)}</div><span className="small-label" dir="ltr">SELECTED DISCOGRAPHY</span></div>
        <div className="release-grid">{visible.map((r,i)=><article className="release-card" key={r.id}><button className="release-cover" onClick={()=>setRelease(r)} aria-label={'مشاهدهٔ '+r.title}><img src={r.image||'/images/portrait.jpg'} alt={'تصویر اثر '+r.title} loading="lazy"/><span className="cover-overlay"><span className="cover-open"><Icon name="arrow" size={26}/></span></span><span className="release-type">{r.kind==='album'?'آلبوم':'تک‌آهنگ'}</span></button><div className="release-info"><div><button className="release-title" onClick={()=>setRelease(r)}>{r.title}</button><p>{r.subtitle}{r.year&&<><span> / </span>{Number(r.year).toLocaleString('fa-IR',{useGrouping:false})}</>}</p></div><button className="round-button" aria-label={(r.audio?'پخش پیش‌نمایش ':'مشاهدهٔ ')+r.title} onClick={()=>start(r)}><Icon name={r.audio?'play':'arrow'} size={18}/></button></div><span className="release-index">{String(i+1).padStart(2,'0')}</span></article>)}</div>
        {filtered.length>4&&<button className="button outline load-more" onClick={()=>setExpanded(!expanded)}>{expanded?'نمایش کمتر':'دیدن همهٔ '+(filter==='album'?'آلبوم‌ها':filter==='single'?'تک‌آهنگ‌ها':'آثار')}<Icon name="arrow" size={18}/></button>}
      </div></section>

      <section className="about-section section" id="about"><div className="container about-grid"><div className="about-photo reveal"><img src={s.bioImage} alt="صائب کاکاوند با ساز تار" loading="lazy"/><span className="photo-caption">صائب کاکاوند / تار و سه‌تار</span><div className="photo-corner" aria-hidden="true"/></div><div className="about-copy reveal"><p className="eyebrow">۰۲ <span/> پشتِ این نغمه‌ها</p><h2>موسیقی،<br/>شیوه‌ای برای <em>زیستن</em></h2><div className="bio">{s.bio.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}</div><a className="text-link ink" href={s.beeptunes} target="_blank" rel="noreferrer">زندگی و مسیر هنری در بیپ‌تونز <Icon name="arrow" size={18}/></a><div className="about-facts"><span>تار و سه‌تار<small>سازهای تخصصی</small></span><span>اتنوموزیکولوژی<small>کارشناسی ارشد</small></span><span>۱۳۹۳<small>بنیان‌گذاری گروه صائب</small></span></div></div></div></section>

      <section className="interlude"><div className="container"><span className="quote-mark" aria-hidden="true">«</span><p>گاه، یک نغمه<br/><em>تمامِ حرفِ دل است.</em></p><span className="small-label">در خلوتِ موسیقی ایرانی</span><div className="interlude-strings" aria-hidden="true"><i/><i/><i/><i/></div></div></section>

      <section className="gallery-section section" id="gallery"><div className="container"><div className="section-top reveal"><div><p className="eyebrow">۰۳ <span/> قاب‌های ماندگار</p><h2>روایتِ <em>تصویر</em></h2></div><p className="section-note">لحظه‌هایی میان ساز،<br/>سکوت و سایه‌روشن.</p></div><div className="gallery-grid">{photos.map((p,i)=><button className={'gallery-photo gallery-photo-'+i} key={p.id} onClick={()=>setPhoto(p)} aria-label={'بزرگ‌نمایی '+p.title}><img src={p.image||'/images/portrait-blue.jpg'} alt={p.title} loading="lazy"/><span><span>{p.title}</span><Icon name="plus" size={24}/></span></button>)}</div></div></section>

      <section className="journal-section section" id="journal"><div className="container"><div className="section-top reveal"><div><p className="eyebrow">۰۴ <span/> واژه‌هایی کنار نُت‌ها</p><h2>از ساز، از <em>کلمه</em></h2></div><Link className="text-link ink" href="/journal">همهٔ نوشته‌ها <Icon name="arrow" size={18}/></Link></div><div className="journal-grid">{posts.slice(0,3).map(p=><Link href={'/journal/'+p.slug} key={p.id} className="journal-card"><div className="journal-image"><img src={p.image||'/images/portrait-blue.jpg'} alt={p.title} loading="lazy"/><span>{p.category}</span></div><div className="journal-meta"><span>مجلهٔ موسیقی</span><time dateTime={p.date}>{new Date(p.date+'T12:00:00Z').toLocaleDateString('fa-IR',{year:'numeric',month:'long',day:'numeric'})}</time></div><h3>{p.title}</h3><p>{p.excerpt}</p><span className="journal-read">ادامهٔ نوشته <Icon name="arrow" size={17}/></span></Link>)}</div>{!posts.length&&<p className="empty-state">به‌زودی، نوشته‌هایی تازه از جهان موسیقی.</p>}</div></section>

      <section className="contact-section section" id="contact"><div className="container contact-inner"><div><p className="eyebrow">۰۵ <span/> آغازی برای یک همراهی</p><h2>گفت‌وگو از اینجا<br/><em>آغاز می‌شود.</em></h2><p>{s.email?'برای همکاری هنری، اجرا و گفت‌وگو، در ارتباط باشیم.':'آثار و تازه‌های موسیقایی صائب کاکاوند را دنبال کنید.'}</p><a className="button gold" href={s.email?'mailto:'+s.email:s.beeptunes} target={s.email?undefined:'_blank'} rel="noreferrer">{s.email?'نوشتن برای صائب':'همراه شدن در بیپ‌تونز'}<Icon name="arrow" size={19}/></a>{s.email&&<a className="contact-email" dir="ltr" href={'mailto:'+s.email}>{s.email}</a>}</div><div className="contact-art" aria-hidden="true"><Emblem/><span>صائب کاکاوند</span><small>نوایی از ریشه، روایتی رو به فردا</small></div></div></section>
    </main>
    <footer className="footer"><div className="container"><Link href="/" className="footer-brand">{s.name}<span>{s.latinName}</span></Link><p>تمامی حقوق آثار و تصاویر برای صاحب اثر محفوظ است.</p><div className="footer-links">{s.instagram&&<a href={s.instagram} target="_blank" rel="noreferrer">اینستاگرام ↗</a>}<a href={s.beeptunes} target="_blank" rel="noreferrer">بیپ‌تونز ↗</a><a href="#main">بازگشت به بالا ↑</a></div></div></footer>

    {release&&<Modal onClose={()=>setRelease(null)} label={release.title}><div className="release-modal"><img src={release.image||'/images/portrait.jpg'} alt={'تصویر اثر '+release.title}/><div><p className="eyebrow">{release.kind==='album'?'آلبوم':'تک‌آهنگ'} {release.year&&' / '+Number(release.year).toLocaleString('fa-IR',{useGrouping:false})}</p><h2>{release.title}</h2><h3>{release.subtitle}</h3><p>{release.description}</p>{release.audio&&<><button className="button gold" onClick={()=>{start(release);setRelease(null);}}><Icon name="play" size={17}/>شنیدنِ پیش‌نمایش</button><small className="preview-credit">پیش‌نمایش رسمی از Apple Music</small></>}<a className="text-link" href={release.url} target="_blank" rel="noreferrer">شنیدن نسخهٔ کامل در بیپ‌تونز <Icon name="external" size={16}/></a></div></div></Modal>}
    {photo&&<Modal onClose={()=>setPhoto(null)} label={photo.title} className="photo-modal"><img src={photo.image} alt={photo.title}/><div className="photo-modal-footer"><button className="icon-button" onClick={()=>nextPhoto(-1)} aria-label="تصویر قبلی">→</button><span>{photo.title}</span><button className="icon-button" onClick={()=>nextPhoto(1)} aria-label="تصویر بعدی">←</button></div></Modal>}
    {playing&&<aside className="player" aria-label="پخش موسیقی"><img src={playing.image} alt=""/><div className="player-info"><strong>{playing.title}</strong><span>{audioError||'صائب کاکاوند · پیش‌نمایش رسمی'}</span></div><button className="round-button" aria-label={isPlaying?'توقف پخش':'پخش'} onClick={()=>{if(!audio.current)return;if(isPlaying)audio.current.pause();else audio.current.play().catch(()=>setAudioError('صدا بارگذاری نشد؛ از لینک نسخهٔ کامل استفاده کنید.'));}}><Icon name={isPlaying?'pause':'play'}/></button><audio ref={audio} src={playing.audio} controls preload="none" onPlay={()=>{setIsPlaying(true);setAudioError('');}} onPause={()=>setIsPlaying(false)} onEnded={()=>setIsPlaying(false)} onError={()=>{setIsPlaying(false);setAudioError('پیش‌نمایش در دسترس نیست؛ نسخهٔ کامل را در بیپ‌تونز بشنوید.');}}/><a href={playing.url} target="_blank" rel="noreferrer" className="player-full">نسخهٔ کامل ↗</a><button className="icon-button" aria-label="بستن پخش‌کننده" onClick={()=>{audio.current?.pause();setPlaying(null);}}><Icon name="close" size={18}/></button></aside>}
  </>;
}
