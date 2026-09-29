import { NextResponse } from "next/server";

const allowedFormats=new Set(["1080","720","360","mp3"]);
function isYouTubeUrl(value:string){
 try{
  const u=new URL(value);
  const host=u.hostname.replace(/^www\./,"").replace(/^m\./,"");
  return host==="youtu.be"||host==="youtube.com";
 }catch{return false}
}
export async function POST(request:Request){
 try{
  const body=await request.json();
  if(typeof body?.url!=="string"||typeof body?.format!=="string"||!allowedFormats.has(body.format)||!isYouTubeUrl(body.url)){
   return NextResponse.json({message:"Please provide a valid YouTube URL and format."},{status:400});
  }
  const backend=process.env.DOWNLOADER_API_URL;
  if(!backend){
   return NextResponse.json({ready:false,message:"The website is working. The download engine is not connected yet; that is the next deployment step."});
  }
  return NextResponse.json({ready:true,message:"Download engine configured."});
 }catch{
  return NextResponse.json({message:"We could not read that request. Please try again."},{status:400});
 }
}