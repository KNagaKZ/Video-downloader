"use client";

import { FormEvent, useMemo, useState } from "react";

type FormatId = "1080" | "720" | "360" | "mp3";
const formats:{id:FormatId;label:string;note:string;type:string}[]=[
 {id:"1080",label:"1080p",note:"Full HD",type:"MP4"},
 {id:"720",label:"720p",note:"HD",type:"MP4"},
 {id:"360",label:"360p",note:"Data saver",type:"MP4"},
 {id:"mp3",label:"Audio",note:"Audio only",type:"MP3"},
];

function getYouTubeId(value:string){
 try{
  const u=new URL(value.trim());
  const host=u.hostname.replace(/^www\./,"").replace(/^m\./,"");
  if(host==="youtu.be") return u.pathname.split("/").filter(Boolean)[0]||null;
  if(host==="youtube.com"){
   if(u.pathname==="/watch") return u.searchParams.get("v");
   const parts=u.pathname.split("/").filter(Boolean);
   if(["shorts","embed","live"].includes(parts[0])) return parts[1]||null;
  }
  return null;
 }catch{return null}
}

export default function Home(){
 const [url,setUrl]=useState("");
 const [format,setFormat]=useState<FormatId>("720");
 const [message,setMessage]=useState("");
 const [loading,setLoading]=useState(false);
 const videoId=useMemo(()=>getYouTubeId(url),[url]);

 async function submit(e:FormEvent){
  e.preventDefault(); setMessage("");
  if(!videoId){setMessage("Paste a valid YouTube video link first.");return}
  setLoading(true);
  try{
   const res=await fetch("/api/download",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:url.trim(),format})});
   const data=await res.json();
   setMessage(data.message||"Request checked.");
  }catch{setMessage("The server could not be reached. Please try again.")}
  finally{setLoading(false)}
 }

 return <main>
  <header className="nav"><a className="brand" href="/" aria-label="Video Downloader home"><span className="logo">↓</span><span>Video Downloader</span></a><span className="version">v0.2</span></header>
  <section className="hero">
   <div className="kicker">YOUR MEDIA · YOUR FORMAT</div>
   <h1>Download without<br/><span>the clutter.</span></h1>
   <p className="intro">A simple interface for media you own or have permission to save. Paste a YouTube link and choose your preferred format.</p>
   <form className="panel" onSubmit={submit}>
    <div className="sectionHead"><div><label htmlFor="video-url">VIDEO LINK</label><p>Supports youtube.com, youtu.be, Shorts and Live links</p></div>{videoId&&<span className="valid">✓ Valid link</span>}</div>
    <div className={"urlbox "+(url&&!videoId?"invalid":"")}>
     <span className="linkIcon">↗</span>
     <input id="video-url" inputMode="url" autoCapitalize="none" autoCorrect="off" value={url} onChange={e=>{setUrl(e.target.value);setMessage("")}} placeholder="Paste a YouTube link…" />
     {url&&<button className="clear" type="button" aria-label="Clear URL" onClick={()=>{setUrl("");setMessage("")}}>×</button>}
    </div>
    {videoId&&<div className="preview">
      <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="Video thumbnail"/>
      <div><span>VIDEO DETECTED</span><strong>YouTube video ready</strong><small>ID: {videoId}</small></div>
    </div>}
    <div className="qualityHead"><label>FORMAT & QUALITY</label><span>{format==="mp3"?"Audio only":"Video + audio"}</span></div>
    <div className="formats">{formats.map(f=><button type="button" aria-pressed={format===f.id} key={f.id} className={format===f.id?"format selected":"format"} onClick={()=>setFormat(f.id)}><span className="radio">{format===f.id?"●":"○"}</span><strong>{f.label}</strong><small>{f.note}</small><em>{f.type}</em></button>)}</div>
    <button className="primary" disabled={!videoId||loading} type="submit"><span>{loading?"Checking…":"Prepare download"}</span><b>→</b></button>
    {message&&<div className="notice" role="status">{message}</div>}
   </form>
   <div className="trust"><span>✓ No sign-up</span><span>✓ Mobile friendly</span><span>✓ MP4 & MP3</span></div>
  </section>
  <footer><span>Video Downloader</span><span>Use only with content you are permitted to download.</span></footer>
 </main>
}