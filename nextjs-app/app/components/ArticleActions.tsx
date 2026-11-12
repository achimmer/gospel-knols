"use client";

import {useState} from "react";
import {Link as LinkIcon, Share2, Printer} from "lucide-react";

export default function ArticleActions({title, url}: {title: string; url: string}) {
  const [status, setStatus] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");
  // Build from the canonical URL so preview secrets and tracking queries are never shared.
  const shareUrl = () => `${url}${window.location.hash}`;
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setFallbackUrl("");
      setStatus("Link copied");
    } catch {
      setFallbackUrl(shareUrl());
      setStatus("Select and copy the address below.");
    }
  }
  async function share() {
    if (!navigator.share) { await copyLink(); return; }
    try { await navigator.share({title, url: shareUrl()}); setStatus(""); }
    catch (error) { if (!(error instanceof Error && error.name === "AbortError")) await copyLink(); }
  }
  return <div className="article-toolbar no-print" aria-label="Article tools">
    <button onClick={copyLink} aria-label="Copy link" title="Copy link"><LinkIcon aria-hidden="true" strokeWidth={1.5} /><span className="article-action-label">Copy link</span></button>
    <button onClick={share} aria-label="Share article" title="Share article"><Share2 aria-hidden="true" strokeWidth={1.5} /><span className="article-action-label">Share</span></button>
    <button onClick={() => window.print()} aria-label="Print or save PDF" title="Open your browser’s print dialog to print or save a PDF"><Printer aria-hidden="true" strokeWidth={1.5} /><span className="article-action-label">Print / save PDF</span></button>
    <span className="share-status" role="status">{status}</span>
    {fallbackUrl && <input className="share-fallback" aria-label="Article address to copy" readOnly value={fallbackUrl} onFocus={(event) => event.currentTarget.select()} />}
  </div>;
}
