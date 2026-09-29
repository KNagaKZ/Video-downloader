"use client";

import { FormEvent, useState } from "react";

const formats = [
  { id: "1080", label: "1080p", note: "Full HD", type: "MP4" },
  { id: "720", label: "720p", note: "HD", type: "MP4" },
  { id: "360", label: "360p", note: "Small", type: "MP4" },
  { id: "mp3", label: "Audio", note: "MP3", type: "MP3" },
];

export default function Home() {
  const [url,setUrl]=useState("");
  const [format,setFormat]=useState("720");
  const [message,setMessage]=useState("");

  async function submit(e:FormEvent){
    e.preventDefault();
    setMessage("");
    try {
      const parsed = new URL(url);
      if (!["youtube.com","www.youtube.com","youtu.be","m.youtube.com"].includes(parsed.hostname)) {
        throw new Error("Please enter a YouTube URL.");
      }
      const res=await fetch("/api/download",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url,format})});
      const data=await res.json();
      setMessage(data.message || "Request received.");
    } catch(err) {
      setMessage(err instanceof Error ? err.message : "Please enter a valid URL.");
    }
  }

  return <main>
    <nav><div className="brand"><span className="logo">↓</span> Video Downloader</div><span className="badge">v0.1</span></nav>
    <section className="hero">
      <div className="eyebrow">SIMPLE · PRIVATE · YOUR MEDIA</div>
      <h1>Save your videos.<br/><span>Keep it simple.</span></h1>
      <p className="lead">Paste a YouTube link, choose a format, and prepare your download. Use it only for media you own or have permission to save.</p>
      <form onSubmit={submit} className="card">
        <label>VIDEO URL</label>
        <div className="inputRow"><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://youtu.be/..." required/><button type="button" onClick={()=>setUrl("")}>×</button></div>
        <label>FORMAT & QUALITY</label>
        <div className="formats">{formats.map(f=><button type="button" key={f.id} className={format===f.id?"format active":"format"} onClick={()=>setFormat(f.id)}><strong>{f.label}</strong><span>{f.note}</span><small>{f.type}</small></button>)}</div>
        <button className="download" type="submit">Prepare download <span>→</span></button>
        {message && <p className="message">{message}</p>}
      </form>
      <div className="features"><span>✓ No account required</span><span>✓ Clean interface</span><span>✓ MP4 & MP3 ready</span></div>
    </section>
    <footer>Built for personal and permitted media use.</footer>
  </main>;
}
