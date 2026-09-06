// Real recordings only. Play the visible clip unless reduced motion is requested.
const recordings = [...document.querySelectorAll('video')];
recordings.forEach(video => {
  video.addEventListener('play', () => {
    recordings.forEach(other => { if (other !== video) other.pause(); });
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.65) {
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: [0, 0.65] });
  recordings.forEach(video => observer.observe(video));
}
