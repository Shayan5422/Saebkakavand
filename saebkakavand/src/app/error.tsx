'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="main" className="article-shell"><div className="article-container"><h1>بارگذاری صفحه کامل نشد.</h1><p>لطفاً دوباره تلاش کنید.</p><button className="button gold" onClick={reset}>تلاش دوباره</button><a className="text-link ink" href="/">بازگشت به خانه</a></div></main>;}
