'use client';
import {useEffect,useRef,useState} from 'react';
import type {Release,Track} from '@/lib/types';
import {Icon} from './Icon';
export type PlayItem={id:string;title:string;image:string;audio:string;mode:'preview'|'full';url:string};
export function releaseQueue(r:Release):PlayItem[]{const items:PlayItem[]=[];if(r.audio)items.push({id:r.id,title:r.title,image:r.image,audio:r.audio,mode:r.audioMode||'preview',url:r.url});for(const t of r.tracks||[]){if(t.published&&t.audio&&!items.some(i=>i.audio===t.audio))items.push(trackItem(r,t));}return items;}
export function trackItem(r:Release,t:Track):PlayItem{return{id:r.id+'-'+t.id,title:t.title,image:r.image,audio:t.audio,mode:t.audioMode,url:r.url};}
export default function MusicPlayer({items,start=0,onClose}:{items:PlayItem[];start?:number;onClose:()=>void}){
 const [index,setIndex]=useState(start);const [playing,setPlaying]=useState(false);const[error,setError]=useState('');const audio=useRef<HTMLAudioElement>(null);const active=items[index]||items[0];
 useEffect(()=>{setIndex(start);},[items,start]);
 useEffect(()=>{if(!active||!audio.current)return;setError('');audio.current.load();audio.current.play().catch(()=>{setPlaying(false);setError('برای آغاز شنیدن، دکمهٔ پخش را بزنید.');});},[active?.audio,items]);
 if(!active)return null;
 return <aside className="player" aria-label="پخش موسیقی"><img src={active.image||'/images/portrait.jpg'} alt=""/><div className="player-info"><strong>{active.title}</strong><span>{error||(active.mode==='preview'?'پیش‌نمایش اثر':'پخش اثر')}</span></div>{items.length>1&&<button className="icon-button player-skip" aria-label="قطعهٔ قبلی" disabled={index===0} onClick={()=>setIndex(index-1)}>→</button>}<button className="round-button" aria-label={playing?'توقف پخش':'پخش'} onClick={()=>{if(!audio.current)return;if(playing)audio.current.pause();else void audio.current.play().catch(()=>setError('پخش انجام نشد؛ دوباره تلاش کنید.'));}}><Icon name={playing?'pause':'play'}/></button>{items.length>1&&<button className="icon-button player-skip" aria-label="قطعهٔ بعدی" disabled={index===items.length-1} onClick={()=>setIndex(index+1)}>←</button>}<audio ref={audio} controls src={active.audio} preload="none" onPlay={()=>{setPlaying(true);setError('');}} onPause={()=>setPlaying(false)} onEnded={()=>{if(index+1<items.length)setIndex(index+1);else setPlaying(false);}} onError={()=>{setPlaying(false);setError('فایل صوتی بارگذاری نشد. لطفاً دوباره تلاش کنید.');}}/>{active.url&&<a className="player-full" href={active.url} target="_blank" rel="noreferrer">صفحهٔ انتشار ↗</a>}<button className="icon-button" aria-label="بستن پخش‌کننده" onClick={()=>{audio.current?.pause();onClose();}}><Icon name="close" size={18}/></button></aside>;
}
