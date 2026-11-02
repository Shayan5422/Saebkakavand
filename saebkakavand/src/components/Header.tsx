'use client';
import {useState} from 'react';
import Link from 'next/link';
import type {Settings} from '@/lib/types';
import {DEFAULT_COPY} from '@/lib/content';
import {Emblem,Icon} from './Icon';
export default function Header({settings,inner=false,name='صائب کاکاوند',latinName='SAEB KAKAVAND'}:{settings?:Settings;inner?:boolean;name?:string;latinName?:string}){
 const [open,setOpen]=useState(false);const c={...DEFAULT_COPY,...settings?.copy};
 const labels:Record<string,string>={about:c.navAbout,music:c.navMusic,gallery:c.navGallery,journal:c.navJournal};
 const links=(settings?.sectionOrder||['about','music','gallery','journal']).filter(k=>k in labels&&settings?.sections?.[k as keyof NonNullable<Settings['sections']>]!==false);
 return <header className="header"><div className="header-inner"><Link href="/" className="brand" aria-label="صفحهٔ اصلی">{settings?.logoImage?<img className="brand-logo" src={settings.logoImage} alt="نشانهٔ هنرمند"/>:<Emblem/>}<div><strong>{settings?.name||name}</strong><span>{settings?.latinName||latinName}</span></div></Link><nav aria-label="منوی اصلی" className={open?'nav open':'nav'}>{links.map(id=><Link key={id} href={(inner?'/':'')+'#'+id} onClick={()=>setOpen(false)}>{labels[id]}</Link>)}</nav>{settings?.sections?.contact!==false&&<a className="header-contact" href={(inner?'/':'')+'#contact'}>{c.headerContact}<span>↗</span></a>}<button className="icon-button mobile-menu" onClick={()=>setOpen(!open)} aria-label={open?'بستن منو':'باز کردن منو'} aria-expanded={open}><Icon name={open?'close':'menu'}/></button></div></header>;
}
