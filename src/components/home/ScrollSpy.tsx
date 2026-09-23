'use client';

import { useEffect } from 'react';

const SECTIONS = [
  'categories',
  'featured',
  'why-us',
  'offers',
  'community',
  'reviews',
];

export function ScrollSpy() {
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 180; // Header offset + threshold
        let activeSection: string | null = null;

        // If user is near top (within hero), clear hash
        if (window.scrollY < 200) {
          activeSection = null;
        } else {
          for (const id of SECTIONS) {
            const el = document.getElementById(id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                activeSection = id;
                break;
              }
            }
          }
        }

        const currentHash = window.location.hash;
        const targetHash = activeSection ? `#${activeSection}` : '';

        if (currentHash !== targetHash) {
          const newUrl = `${window.location.pathname}${window.location.search}${targetHash}`;
          window.history.replaceState(null, '', newUrl);
        }

        ticking = false;
      });
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
