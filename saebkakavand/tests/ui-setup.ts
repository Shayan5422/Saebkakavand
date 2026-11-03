import {beforeEach,afterEach,vi} from 'vitest';
import {cleanup} from '@testing-library/react';
beforeEach(()=>{Object.defineProperty(window,'matchMedia',{configurable:true,value:vi.fn(()=>({matches:false,addEventListener:vi.fn(),removeEventListener:vi.fn()}))});Object.defineProperty(HTMLDialogElement.prototype,'showModal',{configurable:true,value:function(this:HTMLDialogElement){this.setAttribute('open','');}});});
afterEach(()=>{cleanup();vi.useRealTimers();vi.unstubAllGlobals();});
