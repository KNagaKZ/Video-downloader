import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video Downloader",
  description: "Download media you own or have permission to save."
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
