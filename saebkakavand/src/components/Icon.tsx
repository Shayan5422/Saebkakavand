export function Icon({name, size=20}: {name: 'arrow'|'play'|'pause'|'close'|'menu'|'music'|'plus'|'image'|'edit'|'trash'|'check'|'logout'|'chevron'|'external'; size?:number}) {
  const paths: Record<string,React.ReactNode> = {
    arrow:<><path d="M19 12H5m6-6-6 6 6 6"/></>,
    play:<path d="m9 5 11 7-11 7z"/>, pause:<><path d="M8 5v14M16 5v14"/></>,
    close:<path d="m6 6 12 12M6 18 18 6"/>,menu:<path d="M4 7h16M4 12h16M4 17h16"/>,
    music:<><path d="M9 18V5l12-2v13M9 8l12-2"/><ellipse cx="6" cy="18" rx="3" ry="2.5"/><ellipse cx="18" cy="16" rx="3" ry="2.5"/></>,
    plus:<path d="M12 5v14M5 12h14"/>, image:<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 6-6 4 4 3-3 5 5"/></>,
    edit:<><path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14z"/></>,
    trash:<><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/></>,
    check:<path d="m5 12 4 4 10-10"/>,logout:<><path d="M10 4H4v16h6m4-13 5 5-5 5m-6-5h12"/></>,
    chevron:<path d="m14 6-6 6 6 6"/>,external:<><path d="M14 3h7v7M21 3 10 14M11 3H3v18h18v-8"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
export function Emblem() {
  return <svg className="emblem" width="38" height="46" viewBox="0 0 38 46" fill="none" aria-hidden="true"><path d="M18 2v25m4-25v25M14 3l12-2M14 8l12-2M14 13l12-2M14 18l12-2M15 27C7 27 6 33 9 38c4 7 18 7 22 0 3-5-1-11-8-11" stroke="currentColor" strokeWidth="1.1"/><path d="M18 26c-1 5-1 10 1 16m3-16c-1 6-1 12 0 16M9 34h21" stroke="currentColor" strokeWidth=".7"/></svg>;
}
