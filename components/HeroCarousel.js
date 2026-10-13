"use client";
import {useEffect,useState} from "react";
import Link from "next/link";

function Photo({post,priority=false}) {
 return post.image ? <img src={post.image} alt={post.imageAlt||post.title} loading={priority?"eager":"lazy"} decoding="async" className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" style={{objectPosition:post.heroImagePos||post.imagePos||"center"}}/> : <div className="h-full w-full" style={{background:`linear-gradient(135deg,${post.cover?.[0]||"#1b222c"},${post.cover?.[1]||"#0d1116"})`}}/>;
}
function Small({post}) {
 return <Link href={`/noticia/${post.slug}`} className="group min-w-0">
  <div className="aspect-[16/9] overflow-hidden rounded-lg bg-black"><Photo post={post}/></div>
  <h3 className="mt-3 text-[.94rem] font-bold leading-[1.25] text-paper transition-colors group-hover:text-arcade sm:text-[1.05rem]">{post.title}</h3>
 </Link>;
}
export default function HeroCarousel({posts=[]}) {
 const [active,setActive]=useState(0);
 const [paused,setPaused]=useState(false);
 const top=posts.slice(0,5), main=top[active%Math.max(top.length,1)];
 useEffect(()=>{if(paused||top.length<2)return;const t=setInterval(()=>setActive(x=>(x+1)%top.length),8000);return()=>clearInterval(t)},[paused,top.length]);
 if(!main)return null;
 const side=[...top.slice(0,active),...top.slice(active+1),...posts.slice(5)].slice(0,4);
 return <section className="mx-auto w-full max-w-[1240px] px-4 pb-6 pt-6 sm:px-5 lg:px-0" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} aria-label="Games: destaques">
  <div className="mb-5 flex items-center justify-between"><h2 className="text-[1.65rem] font-black tracking-tight text-paper sm:text-[2rem]">Games</h2><Link href="/noticias" className="text-sm font-bold text-[#ff8b4d] hover:text-paper">Ver tudo&nbsp; ›</Link></div>
  <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.95fr)_minmax(0,1.95fr)] lg:gap-8">
   <div className="min-w-0">
    <Link href={`/noticia/${main.slug}`} className="group block">
     <div className="aspect-[16/9] overflow-hidden rounded-lg bg-black"><Photo post={main} priority/></div>
     <h3 className="mt-4 text-[1.45rem] font-black leading-[1.16] tracking-tight text-paper transition-colors group-hover:text-arcade sm:text-[1.9rem]">{main.title}</h3>
     <p className="mt-2 line-clamp-2 text-[.95rem] leading-relaxed text-dim sm:text-base">{main.excerpt}</p>
    </Link>
    {top.length>1&&<div className="mt-3 flex items-center gap-2" aria-label="Selecionar destaque">{top.map((p,i)=><button key={p.slug} onClick={()=>setActive(i)} aria-label={`Destaque ${i+1}`} aria-current={i===active?"true":undefined} className={`h-1.5 rounded-full transition-all ${i===active?"w-8 bg-arcade":"w-4 bg-paper/30 hover:bg-paper/60"}`}/>)}</div>}
   </div>
   <div className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6"><>{side.map(p=><Small key={p.slug} post={p}/>)}</></div>
  </div>
 </section>;
}
