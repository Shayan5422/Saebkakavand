export const MAX_IMAGE_BYTES=8*1024*1024;
export const MAX_AUDIO_BYTES=100*1024*1024;
export const imageTypes=['image/jpeg','image/png','image/webp','image/gif','image/avif'];
export const audioTypes=['audio/mpeg','audio/mp3','audio/wav','audio/x-wav','audio/wave','audio/mp4','audio/x-m4a','audio/m4a','audio/aac','audio/ogg','application/ogg','audio/flac','audio/x-flac','audio/webm'];
export const MEDIA_MIME:Record<string,string>={jpg:'image/jpeg',png:'image/png',webp:'image/webp',gif:'image/gif',avif:'image/avif',mp3:'audio/mpeg',wav:'audio/wav',m4a:'audio/mp4',aac:'audio/aac',ogg:'audio/ogg',flac:'audio/flac',webm:'audio/webm'};
export function audioMime(name:string):string {return ({mp3:'audio/mpeg',wav:'audio/wav',m4a:'audio/mp4',mp4:'audio/mp4',aac:'audio/aac',ogg:'audio/ogg',oga:'audio/ogg',flac:'audio/flac',webm:'audio/webm'} as Record<string,string>)[name.split('.').pop()?.toLowerCase()||'']||'';}
export function detectAudio(bytes:Uint8Array):string|null {
 if(bytes.length<12)return null;
 const tag=(a:number,b:number)=>String.fromCharCode(...bytes.slice(a,b));
 if(tag(0,3)==='ID3')return 'mp3';
 if(bytes[0]===255&&(bytes[1]&0xf6)===0xf0)return 'aac';
 if(bytes[0]===255&&(bytes[1]&0xe0)===0xe0&&(bytes[1]&6)!==0)return 'mp3';
 if(tag(0,4)==='RIFF'&&tag(8,12)==='WAVE')return 'wav';
 if(tag(4,8)==='ftyp')return 'm4a';
 if(tag(0,4)==='OggS')return 'ogg';
 if(tag(0,4)==='fLaC')return 'flac';
 if([26,69,223,163].every((x,i)=>bytes[i]===x))return 'webm';
 return null;
}
export function detectImage(bytes:Uint8Array):string|null{
  if(bytes.length<12)return null;
  if(bytes[0]===255&&bytes[1]===216&&bytes[2]===255)return 'jpg';
  if([137,80,78,71,13,10,26,10].every((x,i)=>bytes[i]===x))return 'png';
  const tag=(a:number,b:number)=>String.fromCharCode(...bytes.slice(a,b));
  if(tag(0,4)==='RIFF'&&tag(8,12)==='WEBP')return 'webp';
  if(['GIF87a','GIF89a'].includes(tag(0,6)))return 'gif';
  if(tag(4,8)==='ftyp'&&['avif','avis'].includes(tag(8,12)))return 'avif';
  return null;
}
