import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll('.reveal, .reveal-left, .reveal-right')
        .forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const observeTargets = () => {
      document
        .querySelectorAll('.reveal, .reveal-left, .reveal-right')
        .forEach((el) => {
          if (!el.classList.contains('visible')) {
            observer.observe(el);
          }
        });
    };

    observeTargets();

    const mutationObserver = new MutationObserver(() => {
      observeTargets();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
}
