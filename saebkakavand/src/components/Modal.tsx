'use client';
import { useEffect, useRef } from 'react';
import { Icon } from './Icon';
export default function Modal({children,onClose,label,className=''}:{children:React.ReactNode;onClose:()=>void;label:string;className?:string}) {
  const ref=useRef<HTMLDialogElement>(null);
  useEffect(()=>{const d=ref.current;d?.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=old;};},[]);
  return <dialog ref={ref} aria-label={label} className={'modal '+className} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===ref.current)onClose();}}><button className="icon-button modal-close" aria-label="بستن" onClick={onClose}><Icon name="close"/></button>{children}</dialog>;
}
