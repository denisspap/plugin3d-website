'use client';
import { useEffect, useState } from 'react';
import { shuffledOrder } from '@/lib/random-order';

export function useShuffled<T>(items: T[], key: string) {
  const [ordered, setOrdered] = useState(items);
  useEffect(() => {
    const shuffle = () => {
      let previous: number[] = [];
      try { previous = JSON.parse(sessionStorage.getItem(key) || '[]'); } catch {}
      const order = shuffledOrder(items.length, Array.isArray(previous) ? previous : []);
      setOrdered(order.map(i => items[i]));
      try { sessionStorage.setItem(key, JSON.stringify(order)); } catch {}
    };
    shuffle();
    const restore = (event: PageTransitionEvent) => { if (event.persisted) shuffle(); };
    window.addEventListener('pageshow', restore);
    return () => window.removeEventListener('pageshow', restore);
  }, [items, key]);
  return ordered;
}
