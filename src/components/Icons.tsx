import React from "react";
import { Facebook, Linkedin, Instagram } from "lucide-react";

export function LogoMark() {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#c99b31] text-[#031b31] shadow-lg shrink-0">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    </div>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return <Facebook className={className} size={14} />;
}

export function LinkedinIcon({ className }: { className?: string }) {
  return <Linkedin className={className} size={14} />;
}

export function InstagramIcon({ className }: { className?: string }) {
  return <Instagram className={className} size={14} />;
}
