import { NextResponse } from "next/server";

const allowedFormats = new Set(["1080","720","360","mp3"]);

export async function POST(request: Request) {
  try {
    const { url, format } = await request.json();
    if (typeof url !== "string" || !allowedFormats.has(format)) {
      return NextResponse.json({message:"Invalid request."},{status:400});
    }
    const parsed = new URL(url);
    if (!["youtube.com","www.youtube.com","youtu.be","m.youtube.com"].includes(parsed.hostname)) {
      return NextResponse.json({message:"Please enter a valid YouTube URL."},{status:400});
    }
    return NextResponse.json({
      ready:false,
      message:"The interface is ready. The media-processing backend will be connected in the next step."
    });
  } catch {
    return NextResponse.json({message:"Could not process that request."},{status:400});
  }
}
