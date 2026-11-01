import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createSession,verifySession,sameOrigin,safeUrl,SESSION_SECONDS} from '../src/lib/security.ts';
import {detectImage} from '../src/lib/uploads.ts';
import {validateContent} from '../src/lib/validation.ts';
process.env.ADMIN_PASSWORD='test-only-password-123';
process.env.SESSION_SECRET='test-only-session-secret-at-least-32-characters';
test('signed session rejects tampering and expires after twelve hours',()=>{
  const now=Date.now();const token=createSession(now);
  assert.equal(verifySession(token,now),true);
  assert.equal(verifySession(token+'x',now),false);
  assert.equal(verifySession('malformed',now),false);
  assert.equal(verifySession(undefined,now),false);
  assert.equal(verifySession(token,now+SESSION_SECONDS*1000+1000),false);
});
test('changing the password invalidates existing sessions',()=>{
  const token=createSession();const original=process.env.ADMIN_PASSWORD;
  process.env.ADMIN_PASSWORD='different-valid-password-123';
  assert.equal(verifySession(token),false);process.env.ADMIN_PASSWORD=original;
});
test('cross-origin and missing-origin writes are rejected',()=>{
  assert.equal(sameOrigin('https://example.com','https://example.com/api/studio/content'),true);
  assert.equal(sameOrigin('https://evil.com','https://example.com/api/studio/content'),false);
  assert.equal(sameOrigin(null,'https://example.com/api/studio/content'),false);
  assert.equal(sameOrigin('https://example.com.evil.com','https://example.com/api'),false);
  assert.equal(sameOrigin('http://127.0.0.1:3000','http://localhost:3000/api','127.0.0.1:3000'),true);
  assert.equal(sameOrigin('https://foreign.example','http://localhost:3000/api','127.0.0.1:3000'),false);
});
test('content URLs reject executable, protocol-relative and credential-bearing links',()=>{
  assert.equal(safeUrl('javascript:alert(1)'),false);
  assert.equal(safeUrl('//evil.com/image.jpg',true),false);
  assert.equal(safeUrl('https://user:pass@example.com'),false);
  assert.equal(safeUrl('/images/performance.jpg',true),true);
  assert.equal(safeUrl('https://example.com/image.jpg',true),true);
});
test('upload detection checks file bytes rather than a claimed extension',()=>{
  assert.equal(detectImage(Buffer.from('<svg onload="alert(1)">')),null);
  assert.equal(detectImage(Buffer.from([255,216,255,0,0,0,0,0,0,0,0,0])),'jpg');
  assert.equal(detectImage(Buffer.from([137,80,78,71,13,10,26,10,0,0,0,0])),'png');
  assert.equal(detectImage(Buffer.alloc(3)),null);
});
test('content validation rejects duplicate article slugs and unsafe image URLs',()=>{
  const p={id:'post-1',title:'نوشته',slug:'one',category:'مجله',excerpt:'متن',body:'متن',image:'/images/portrait.jpg',date:'2026-11-01',published:true};
  const c={revision:0,settings:{name:'صائب کاکاوند',latinName:'SAEB',tagline:'نغمه',heroText:'موسیقی',bio:'معرفی',heroImage:'/images/performance.jpg',bioImage:'/images/portrait.jpg',email:'',instagram:'',beeptunes:'https://beeptunes.com/artist/9979685'},releases:[],photos:[],posts:[p]};
  assert.equal(validateContent(c),true);
  assert.equal(validateContent({...c,posts:[p,{...p,id:'post-2'}]}),false);
  assert.equal(validateContent({...c,settings:{...c.settings,heroImage:'javascript:alert(1)'}}),false);
  assert.equal(validateContent({...c,settings:{...c.settings,email:'bad-address'}}),false);
});
