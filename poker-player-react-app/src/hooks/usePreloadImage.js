import { useState, useEffect } from 'react';

function fetchImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = image.onabort = reject;
    image.src = src;
  });
}

export function usePreloadImage({
  src,
  fallback
}) {
  const [loaded, setLoaded] = useState(false);
  const [source, setSource] = useState(src);
  useEffect(() => {
    setLoaded(false);
    fetchImage(src).then(() => {
      setSource(src);
      setLoaded(true);
    }).catch(() => {
      if (fallback) {
        fetchImage(fallback).then(() => {
          setSource(fallback);
          setLoaded(true);
        }).catch(() => {
          setLoaded(false);
        });
      }
    });
  }, [src, fallback]);
  return {
    loaded,
    src: source
  };
}