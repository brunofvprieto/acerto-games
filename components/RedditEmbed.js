'use client';

import { useEffect, useRef } from 'react';

export default function RedditEmbed({ postId }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!postId || !ref.current) return;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.redditmedia.com/r/GamingLeaksAndRumours/comments/${postId}/?ref_source=embed&ref=share&embed=true&theme=dark`;
    iframe.style.cssText = 'width:100%;height:420px;border:none;border-radius:8px;';
    iframe.scrolling = 'no';
    iframe.allow = 'fullscreen';
    ref.current.innerHTML = '';
    ref.current.appendChild(iframe);
  }, [postId]);

  return <div ref={ref} className="my-4 w-full" />;
}
