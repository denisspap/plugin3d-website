'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function Models() {
  const router = useRouter();
  useEffect(() => { router.replace('/tools/#models'); }, [router]);
  return <main id="main-content" className="page-shell"><Link className="text-link" href="/tools/#models">3D models and tools</Link></main>;
}
