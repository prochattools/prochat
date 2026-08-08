(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const diag = {
    state: document.getElementById('diag-state'),
    progress: document.getElementById('diag-progress'),
    fps: document.getElementById('diag-fps'),
    cls: document.getElementById('diag-cls'),
    lcp: document.getElementById('diag-lcp'),
    motion: document.getElementById('diag-motion'),
  };

  const chapters = [
    {
      label: '01 · Task Intent',
      title: 'Start with the task, not the archive.',
      copy: 'Intent becomes the retrieval boundary before any memory is selected.',
      name: 'task-intent',
    },
    {
      label: '02 · Relevance Filtering',
      title: 'Relevance narrows the field.',
      copy: 'Only reviewed records that match the task brighten. Irrelevant memory remains present but quiet.',
      name: 'relevance-filtering',
    },
    {
      label: '03 · Context Assembly',
      title: 'Relevant memory becomes bounded context.',
      copy: 'Selected records move into an explicit context boundary with provenance still visible.',
      name: 'context-assembly',
    },
    {
      label: '04 · Applied Context',
      title: 'The answer shows where its context came from.',
      copy: 'Applied context stays inspectable rather than disappearing behind the response.',
      name: 'applied-context',
    },
  ];

  function setChapter(index) {
    const chapter = chapters[index];
    document.getElementById('chapter-label').textContent = chapter.label;
    document.getElementById('chapter-title').textContent = chapter.title;
    document.getElementById('chapter-copy').textContent = chapter.copy;
    document.querySelectorAll('[data-state-index]').forEach((button, buttonIndex) => {
      if (buttonIndex === index) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    diag.state.textContent = `state: ${chapter.name}`;
  }

  diag.motion.textContent = `motion: ${reduceMotion ? 'reduced' : 'full'}`;

  // Lightweight diagnostics; values are visible only in the isolated POC.
  let frameCount = 0;
  let frameWindowStart = performance.now();
  function fpsLoop(now) {
    frameCount += 1;
    if (now - frameWindowStart >= 1000) {
      diag.fps.textContent = `fps: ${Math.round((frameCount * 1000) / (now - frameWindowStart))}`;
      frameCount = 0;
      frameWindowStart = now;
    }
    requestAnimationFrame(fpsLoop);
  }
  requestAnimationFrame(fpsLoop);

  if ('PerformanceObserver' in window) {
    try {
      let cls = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) cls += entry.value;
        }
        diag.cls.textContent = `cls: ${cls.toFixed(3)}`;
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch {}

    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) diag.lcp.textContent = `lcp: ${Math.round(last.startTime)}ms`;
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}
  }

  if (!window.gsap || !window.ScrollTrigger) {
    document.body.dataset.pocError = 'gsap-missing';
    diag.state.textContent = 'state: GSAP unavailable';
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const relevant = gsap.utils.toArray('.memory-relevant');
  const irrelevant = document.querySelector('.memory-irrelevant');
  const signals = gsap.utils.toArray('.signals span');
  const contextColumn = document.getElementById('context-column');
  const response = document.getElementById('response');
  const memoryField = document.getElementById('memory-field');
  const connectors = document.getElementById('connectors');
  const taskCard = document.getElementById('task-card');

  if (reduceMotion) {
    gsap.set(relevant, { opacity: 1, scale: 1, x: 0 });
    gsap.set(irrelevant, { opacity: 0.24 });
    gsap.set(signals, { color: '#c6d2f6', borderColor: '#4d67ad', backgroundColor: '#182545' });
    gsap.set(memoryField, { opacity: 0 });
    gsap.set(connectors, { opacity: 0 });
    gsap.set(contextColumn, { opacity: 0 });
    gsap.set(response, { opacity: 1, x: 0, y: 0 });
    setChapter(3);
    diag.progress.textContent = 'progress: reduced';
    return;
  }

  gsap.set(relevant, { opacity: 0.32, scale: 0.985, x: 28 });
  gsap.set(irrelevant, { opacity: 0.28, scale: 0.985, x: 28 });
  gsap.set(contextColumn, { opacity: 0, x: 50, scale: 0.985 });
  gsap.set(response, { opacity: 0, x: 54, scale: 0.985 });
  gsap.set(connectors, { opacity: 0 });

  const timeline = gsap.timeline({ defaults: { ease: 'none' } });

  // State 1 → 2: task signals activate and relevant reviewed memory separates from noise.
  timeline
    .to(signals, { color: '#c6d2f6', borderColor: '#4d67ad', backgroundColor: '#182545', duration: 0.12, stagger: 0.025 }, 0.12)
    .to(relevant, { opacity: 1, scale: 1, x: 0, borderColor: '#526fb9', duration: 0.18, stagger: 0.025 }, 0.16)
    .to(irrelevant, { opacity: 0.16, x: 42, duration: 0.16 }, 0.18)
    .to(connectors, { opacity: 0.82, duration: 0.14 }, 0.20)

    // State 2 → 3: memory field yields to a bounded assembled context column.
    .to(connectors, { opacity: 0.15, duration: 0.10 }, 0.39)
    .to(memoryField, { opacity: 0.12, x: 44, duration: 0.18 }, 0.40)
    .to(contextColumn, { opacity: 1, x: 0, scale: 1, duration: 0.20 }, 0.43)
    .to(taskCard, { y: -14, borderColor: '#526b9c', duration: 0.18 }, 0.44)

    // State 3 → 4: assembled context resolves into a response with provenance.
    .to(contextColumn, { opacity: 0.12, x: 38, scale: 0.99, duration: 0.16 }, 0.70)
    .to(memoryField, { opacity: 0, duration: 0.12 }, 0.70)
    .to(response, { opacity: 1, x: 0, scale: 1, duration: 0.20 }, 0.72)
    .to(taskCard, { opacity: 0.28, y: -20, duration: 0.18 }, 0.73);

  const trigger = ScrollTrigger.create({
    trigger: '#context-assembly',
    start: 'top top',
    end: 'bottom bottom',
    pin: '#stage',
    pinSpacing: false,
    scrub: 0.55,
    animation: timeline,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate(self) {
      const p = self.progress;
      const stateIndex = p < 0.22 ? 0 : p < 0.48 ? 1 : p < 0.74 ? 2 : 3;
      setChapter(stateIndex);
      diag.progress.textContent = `progress: ${p.toFixed(3)}`;
    },
  });

  // State rail is review tooling only: it scrolls the document, it does not drive a second animation timeline.
  document.querySelectorAll('[data-state-index]').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.stateIndex);
      const progress = [0.04, 0.30, 0.57, 0.86][index];
      const start = trigger.start;
      const end = trigger.end;
      window.scrollTo({ top: start + (end - start) * progress, behavior: 'smooth' });
    });
  });

  window.addEventListener('pagehide', () => {
    trigger.kill();
    timeline.kill();
    ScrollTrigger.getAll().forEach((item) => item.kill());
  }, { once: true });
})();
