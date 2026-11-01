export const MAX_IMAGE_BYTES=8*1024*1024;
export const imageTypes=['image/jpeg','image/png','image/webp','image/gif','image/avif'];
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
