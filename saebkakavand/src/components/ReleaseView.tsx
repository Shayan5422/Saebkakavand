'use client';
import {useState} from 'react';
import type {Release} from '@/lib/types';
import {Icon} from './Icon';
import MusicPlayer,{releaseQueue,trackItem,type PlayItem} from './MusicPlayer';
export function ReleaseContent({release:r,onPlay}:{release:Release;onPlay:(items:PlayItem[],start?:number)=>void}){
 const queue=releaseQueue(r);const tracks=r.tracks?.filter(t=>t.published)||[];
 return <div className="release-modal"><img src={r.image||'/images/portrait.jpg'} alt={'کاور '+r.title}/><div><p className="eyebrow">{r.kind==='album'?'آلبوم':'تک‌آهنگ'}{r.year&&' / '+r.year}</p><h2>{r.title}</h2><h3>{r.subtitle}</h3><p className="release-description">{r.description}</p>{queue.length>0&&<button className="button gold" onClick={()=>onPlay(queue,0)}><Icon name="play" size={17}/>{queue[0].mode==='preview'?'شنیدن پیش‌نمایش':'شنیدن اثر'}</button>}{r.url&&<a className="text-link" href={r.url} target="_blank" rel="noreferrer">صفحهٔ رسمی انتشار <Icon name="external" size={16}/></a>}</div>{tracks.length>0&&<div className="release-tracklist"><h3>قطعه‌های این آلبوم</h3>{tracks.map((t,i)=><div key={t.id} className="public-track"><span className="track-number">{(i+1).toLocaleString('fa-IR')}</span><strong>{t.title}</strong><small dir="ltr">{t.duration}</small><button className="round-button" disabled={!t.audio} aria-label={'پخش '+t.title} onClick={()=>{const items=tracks.filter(t=>!!t.audio).map(t=>trackItem(r,t));onPlay(items,items.findIndex(x=>x.id===r.id+'-'+t.id));}}><Icon name="play" size={15}/></button></div>)}</div>}</div>;
}
export default function ReleaseView({release}:{release:Release}){const[selection,setSelection]=useState<{items:PlayItem[];start:number}|null>(null);return <><ReleaseContent release={release} onPlay={(items,start=0)=>setSelection({items,start})}/>{selection&&<MusicPlayer items={selection.items} start={selection.start} onClose={()=>setSelection(null)}/>}</>;}
