'use client';
import {useState} from 'react';
import Link from 'next/link';
import {Emblem, Icon} from './Icon';
export default function Header({name='صائب کاکاوند',latinName='SAEB KAKAVAND',inner=false}:{name?:string;latinName?:string;inner?:boolean}) {
  const [open,setOpen]=useState(false);
  const links=[['دربارهٔ صائب','about'],['آثار و آلبوم‌ها','music'],['گالری تصاویر','gallery'],['مجله','journal']];
  return <header className="header"><div className="header-inner"><Link href="/" className="brand" aria-label="صفحهٔ اصلی"><Emblem/><div><strong>{name}</strong><span>{latinName}</span></div></Link><nav aria-label="منوی اصلی" className={open?'nav open':'nav'}>{links.map(([label,id])=><Link key={id} href={(inner?'/':'')+'#'+id} onClick={()=>setOpen(false)}>{label}</Link>)}</nav><a className="header-contact" href={(inner?'/':'')+'#contact'}>در ارتباط باشیم <span>↗</span></a><button className="icon-button mobile-menu" onClick={()=>setOpen(!open)} aria-label={open?'بستن منو':'باز کردن منو'} aria-expanded={open}><Icon name={open?'close':'menu'}/></button></div></header>;
}
