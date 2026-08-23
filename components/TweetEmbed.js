'use client';

import { useEffect, useRef } from 'react';

export default function TweetEmbed({ tweetId }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!tweetId || !ref.current) return;

    const render = () => {
      if (window.twttr && window.twttr.widgets) {
        ref.current.innerHTML = '';
        window.twttr.widgets.createTweet(tweetId, ref.current, {
          theme: 'dark',
          dnt: true,
          align: 'center',
        });
      }
    };

    if (window.twttr) {
      render();
    } else {
      const id = 'twitter-widgets-js';
      if (!document.getElementById(id)) {
        const s = document.createElement('script');
        s.id = id;
        s.src = 'https://platform.twitter.com/widgets.js';
        s.async = true;
        s.onload = render;
        document.head.appendChild(s);
      } else {
        // script já existe mas ainda não carregou: aguarda
        const check = setInterval(() => {
          if (window.twttr && window.twttr.widgets) {
            clearInterval(check);
            render();
          }
        }, 100);
      }
    }
  }, [tweetId]);

  return (
    <div ref={ref} className="my-4 flex justify-center min-h-[120px]" />
  );
}
