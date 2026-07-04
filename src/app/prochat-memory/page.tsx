'use client'

import { useEffect } from 'react'

const PAGE_CSS = `@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;1,400;1,500;1,600;1,700&family=JetBrains+Mono:wght@400;500&display=swap');



.pm-page{
  --paper: #efe7d2;
  --paper-warm: #ece4cf;
  --paper-dark: #ddd2b6;
  --ink: #15140f;
  --ink-soft: #2a2620;
  --ink-mute: #5a5448;
  --ink-faint: #8b8676;
  --coral: #ed6f5c;
  --coral-soft: #f08e7c;
  --mustard: #e9b94a;
  --olive: #6e7448;
  --bone: #f7f1de;
  --line: rgba(21, 20, 15, 0.16);
  --line-soft: rgba(21, 20, 15, 0.08);
  --line-faint: rgba(21, 20, 15, 0.05);
  --shadow: 0 30px 60px -30px rgba(21, 20, 15, 0.18);
  --serif: 'Playfair Display', 'Times New Roman', serif;
  --sans: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --body: 'Inter', -apple-system, system-ui, sans-serif;
  --mono: 'JetBrains Mono', 'SF Mono', Menlo, monospace;
}

.pm-page *{ box-sizing: border-box; margin: 0; padding: 0; }
.pm-page, .pm-page{ background: var(--paper); color: var(--ink); }
.pm-page{
  font-family: var(--body);
  font-size: 16px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  position: relative;
}


.pm-page::before{
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-image:
    radial-gradient(circle at 12% 18%, rgba(106, 92, 56, 0.07) 0, transparent 28%),
    radial-gradient(circle at 88% 72%, rgba(106, 92, 56, 0.06) 0, transparent 32%),
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.18  0 0 0 0 0.16  0 0 0 0 0.12  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  background-size: auto, auto, 240px 240px;
  mix-blend-mode: multiply;
  opacity: 0.92;
}

.pm-page .shell{ position: relative; z-index: 2; }
.pm-page .container{
  max-width: 1360px;
  padding: 0 64px;
  margin: 0 auto;
  position: relative;
}
.pm-page .container.wide{ max-width: 1480px; }


.pm-page .side-rail{
  position: fixed;
  top: 0;
  bottom: 0;
  width: 36px;
  z-index: 3;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pm-page .side-rail.right{ right: 0; border-left: 1px solid var(--line-faint); }
.pm-page .side-rail.left{ left: 0; border-right: 1px solid var(--line-faint); }
.pm-page .side-rail .rail-text{
  font-family: var(--sans);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: var(--ink-faint);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
}
.pm-page .side-rail.right .rail-text{ transform: rotate(180deg); }
.pm-page .side-rail.left .rail-text{ writing-mode: vertical-rl; transform: none; }


.pm-page .topbar{
  border-bottom: 1px solid var(--line);
  padding: 10px 0;
  background: var(--paper);
  position: relative;
  z-index: 4;
}
.pm-page .topbar-inner{
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  font-family: var(--sans);
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-faint);
}
.pm-page .topbar-inner b{ color: var(--ink); font-weight: 600; }
.pm-page .topbar-inner .coral{ color: var(--coral); }
.pm-page .topbar-inner > span{ white-space: nowrap; }
.pm-page .topbar-inner .mid{ display: inline-flex; gap: 26px; }
.pm-page .topbar-inner .mid > span{ white-space: nowrap; }
.pm-page .topbar-inner .right{ display: inline-flex; gap: 18px; align-items: center; }
.pm-page .topbar-inner .right > span, .pm-page .topbar-inner .right > a{ white-space: nowrap; }
.pm-page .topbar-link{
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color 160ms ease, border-color 160ms ease;
}
.pm-page .topbar-link:hover{ color: var(--coral); border-bottom-color: var(--coral); }
.pm-page .topbar .pulse{
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--coral);
  display: inline-block;
  margin-right: 6px;
  animation: pulse 2.4s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}



.pm-page .nav{
  padding: 22px 0;
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--paper);
  transform: translateY(0);
  transition: transform 360ms cubic-bezier(0.22, 0.61, 0.36, 1),
    box-shadow 220ms ease,
    border-color 220ms ease;
  border-bottom: 1px solid transparent;
  will-change: transform;
}

.pm-page .nav.is-hidden{
  transform: translateY(-100%);
  pointer-events: none;
  box-shadow: none;
}
.pm-page .nav-inner{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.pm-page .brand{
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-family: var(--sans);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--ink);
  text-decoration: none;
  font-size: 18px;
}
.pm-page .brand-mark{
  width: 36px; height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--ink);
  border-radius: 50%;
  font-family: var(--serif);
  font-style: italic;
  font-size: 17px;
  color: var(--ink);
  background: transparent;
}
.pm-page .brand-meta{
  font-family: var(--sans);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-faint);
  line-height: 1.3;
  margin-left: 4px;
  border-left: 1px solid var(--line);
  padding-left: 14px;
}
.pm-page .brand-meta b{ display: block; color: var(--ink); font-weight: 600; }

.pm-page .nav-links{
  display: flex;
  gap: 38px;
  list-style: none;
}
.pm-page .nav-links a{
  color: var(--ink);
  text-decoration: none;
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 500;
  transition: color 0.18s ease;
  position: relative;
}
.pm-page .nav-links a:hover{ color: var(--coral); }
.pm-page .nav-links a .num{
  font-size: 9px;
  color: var(--ink-faint);
  position: absolute;
  top: -7px;
  right: -16px;
  letter-spacing: 0.04em;
}
.pm-page .nav-side{
  display: inline-flex;
  align-items: center;
  gap: 18px;
}
.pm-page .nav-cta{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 16px;
  border-radius: 999px;
  background: var(--ink);
  color: var(--paper);
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
}
.pm-page .nav-cta [data-github-stars], .pm-page .nav-cta [data-github-version]{
  font-variant-numeric: tabular-nums;
}
.pm-page .nav-cta::after{
  content: '★';
  color: var(--mustard);
  font-size: 11px;
}
.pm-page .status-dot{
  width: 28px; height: 28px;
  border-radius: 50%;
  border: 1px solid var(--line);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.pm-page .status-dot::after{
  content: '';
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--coral);
}


.pm-page .label{
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--coral);
  display: inline-flex;
  align-items: center;
  gap: 12px;
}
.pm-page .label::before{
  content: '';
  width: 18px;
  height: 1px;
  background: var(--coral);
  display: inline-block;
}
.pm-page .label .ix{
  color: var(--ink-faint);
  font-weight: 500;
  margin-left: 4px;
}
.pm-page .display{
  font-family: var(--sans);
  font-weight: 800;
  letter-spacing: -0.028em;
  color: var(--ink);
  line-height: 1.0;
}
.pm-page .display em{
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  letter-spacing: -0.018em;
}
.pm-page .display .dot{ color: var(--coral); }
.pm-page .lead{
  font-family: var(--body);
  font-size: 16px;
  line-height: 1.55;
  color: var(--ink-soft);
  max-width: 36ch;
}
.pm-page .meta{
  font-family: var(--sans);
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-faint);
}
.pm-page .coord{
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.04em;
  color: var(--ink-faint);
}
.pm-page .roman{
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  color: var(--coral);
}


.pm-page .btn{
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 22px;
  border-radius: 999px;
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.005em;
  text-decoration: none;
  border: 1px solid transparent;
  transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease;
  cursor: pointer;
  white-space: nowrap;
}
.pm-page .btn-primary{
  background: var(--coral);
  color: #fff;
  box-shadow: 0 14px 26px -16px rgba(237, 111, 92, 1);
}
.pm-page .btn-primary:hover{ transform: translateY(-1px); background: #e25e4a; }
.pm-page .btn-ghost{
  background: transparent;
  color: var(--ink);
  border-color: rgba(21, 20, 15, 0.2);
}
.pm-page .btn-ghost:hover{ background: rgba(21, 20, 15, 0.04); }
.pm-page .btn .arrow{
  width: 16px; height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.pm-page .btn .arrow svg{ width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 1.6; }


.pm-page .code-inline{
  font-family: var(--mono);
  font-size: 14px;
  background: var(--bone);
  padding: 1px 6px;
  border-radius: 4px;
}


.pm-page .hero{
  position: relative;
  padding: 0;
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-bottom: 1px solid var(--line);
}
.pm-page .hero > .container{ flex: 0 0 auto; }
.pm-page .hero > .container.hero-grid{ flex: 1 1 auto; }
.pm-page .hero::before{
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--line-soft);
  z-index: 0;
  display: none;
}
.pm-page .hero-grid{
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
  gap: 36px;
  align-items: stretch;
  width: 100%;
  position: relative;
}
.pm-page .hero-copy{
  padding: 4vh 0 4vh;
  display: flex;
  flex-direction: column;
  position: relative;
}
.pm-page .hero-copy .label{ margin-bottom: 28px; }
.pm-page .hero-copy .lead{ margin-bottom: 30px; max-width: 38ch; font-size: 16px; }
.pm-page .hero h1{
  font-size: clamp(44px, 5vw, 78px);
  line-height: 1.0;
  margin-bottom: 28px;
}
.pm-page .hero-actions{
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 38px;
}
.pm-page .hero-stats{
  display: flex;
  align-items: center;
  gap: 22px;
  flex-wrap: nowrap;
  margin-bottom: 28px;
}
.pm-page .hero-stats .stat{ display: inline-flex; align-items: center; gap: 9px; white-space: nowrap; }
.pm-page .hero-stats .stat .ring{
  width: 34px; height: 34px;
  border-radius: 50%;
  border: 1px dashed var(--ink);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}
.pm-page .hero-stats .stat .ring.solid{ border-style: solid; }
.pm-page .hero-stats .stat .ring.coral{ border-color: var(--coral); color: var(--coral); }
.pm-page .hero-stats .stat-label{
  font-family: var(--sans);
  font-size: 11px;
  line-height: 1.25;
  color: var(--ink-soft);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.pm-page .hero-stats .stat-label b{ display: block; font-weight: 700; color: var(--ink); font-size: 12px; }

.pm-page .hero-foot{
  margin-top: auto;
  padding-top: 22px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.pm-page .hero-foot .meta{ line-height: 1.4; }

.pm-page .hero-art{
  position: relative;
  height: calc(100vh - 160px);
  max-height: 860px;
  margin-left: auto;
  margin-right: -12px;
  width: 100%;
  overflow: visible;
}
.pm-page .hero-art img{
  width: 100%; height: 100%;
  object-fit: contain;
  object-position: right center;
  display: block;
}

.pm-page .annot{
  position: absolute;
  font-family: var(--sans);
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-faint);
  line-height: 1.4;
  white-space: nowrap;
}
.pm-page .annot.has-line::before{
  content: '';
  position: absolute;
  background: var(--ink-faint);
}
.pm-page .annot-tl{ top: 14px; left: 14px; }
.pm-page .annot-tr{ top: 14px; right: 14px; text-align: right; }
.pm-page .annot-bl{ bottom: 14px; left: 14px; }
.pm-page .annot-br{ bottom: 14px; right: 14px; text-align: right; }
.pm-page .annot.coord{ font-family: var(--mono); font-size: 10px; letter-spacing: 0.04em; text-transform: none; }

.pm-page .hero-art .index{
  position: absolute;
  right: 12px;
  top: 36%;
  font-family: var(--sans);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--ink-faint);
  text-transform: uppercase;
  background: rgba(239, 231, 210, 0.7);
  padding: 10px 12px;
  border: 1px solid var(--line-soft);
  border-radius: 6px;
  backdrop-filter: blur(2px);
}
.pm-page .hero-art .index span{ display: block; line-height: 1.6; }
.pm-page .hero-art .index span .n{ color: var(--coral); margin-right: 6px; font-weight: 700; }
.pm-page .hero-art .index span.on{ color: var(--ink); font-weight: 700; }
.pm-page .hero-art .index span.on .n{ color: var(--coral); }

.pm-page .hero-art .corner{
  position: absolute;
  width: 22px; height: 22px;
  border-color: var(--ink-faint);
  border-style: solid;
  border-width: 0;
}
.pm-page .hero-art .corner.tl{ top: 0; left: 0; border-top-width: 1px; border-left-width: 1px; }
.pm-page .hero-art .corner.tr{ top: 0; right: 0; border-top-width: 1px; border-right-width: 1px; }
.pm-page .hero-art .corner.bl{ bottom: 0; left: 0; border-bottom-width: 1px; border-left-width: 1px; }
.pm-page .hero-art .corner.br{ bottom: 0; right: 0; border-bottom-width: 1px; border-right-width: 1px; }


.pm-page section{ position: relative; padding: 130px 0; }
.pm-page section.tight{ padding: 90px 0; }
.pm-page .sec-rule{
  border-top: 1px solid var(--line);
  padding-top: 18px;
  margin-bottom: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--sans);
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-faint);
}
.pm-page .sec-rule .roman{
  font-family: var(--serif);
  font-style: italic;
  color: var(--coral);
  font-size: 14px;
  letter-spacing: 0.05em;
  text-transform: none;
}
.pm-page .sec-rule .meta-grp{ display: inline-flex; gap: 26px; }
.pm-page .sec-rule .dot-mark{ color: var(--coral); }

.pm-page .section-header{ margin-bottom: 70px; }
.pm-page .section-header .label{ margin-bottom: 32px; }
.pm-page .section-header h2{
  font-size: clamp(40px, 4.6vw, 66px);
  max-width: 22ch;
}
.pm-page .section-header .lead{ margin-top: 22px; }


.pm-page .wire{
  border-bottom: 1px solid var(--line);
  padding: 26px 0 28px;
  background: var(--paper);
  position: relative;
  overflow: hidden;
}
.pm-page .wire-inner{
  display: grid;
  grid-template-columns: minmax(180px, 220px) minmax(0, 1fr);
  gap: 32px;
  align-items: center;
}
.pm-page .wire-left{
  display: inline-flex;
  align-items: center;
  gap: 14px;
  border-right: 1px solid var(--line);
  padding-right: 24px;
  min-height: 56px;
}
.pm-page .wire-mark{
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid var(--line);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.pm-page .wire-pulse{
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--coral);
  display: inline-block;
  animation: pulse 2.4s ease-in-out infinite;
}
.pm-page .wire-title{
  font-family: var(--sans);
  font-size: 11px;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.pm-page .wire-title b{
  color: var(--ink);
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.pm-page .wire-title span{
  color: var(--ink-faint);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.pm-page .wire-rows{
  display: grid;
  gap: 8px;
  min-width: 0;
}
.pm-page .wire-row{
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent);
}
.pm-page .marquee-track{
  display: inline-flex;
  align-items: center;
  gap: 36px;
  width: max-content;
  white-space: nowrap;
  animation: marquee-x 52s linear infinite;
  will-change: transform;
}
.pm-page .wire-row.reverse .marquee-track{
  animation-direction: reverse;
  animation-duration: 64s;
}
.pm-page .wire-row:hover .marquee-track{
  animation-play-state: paused;
}
@keyframes marquee-x {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.pm-page .wire-item{
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  font-family: var(--sans);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--ink-mute);
  text-decoration: none;
  flex-shrink: 0;
}
.pm-page .wire-item .wire-dot{
  color: var(--coral);
  font-size: 16px;
  line-height: 0;
  position: relative;
  top: -1px;
  margin-right: 2px;
}
.pm-page .wire-item .wire-coord{
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--ink-faint);
  letter-spacing: 0;
}
.pm-page .wire-item .wire-name{
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--ink);
  font-weight: 500;
}
.pm-page .wire-item .wire-handle{
  font-family: var(--mono);
  color: var(--ink);
  font-size: 11.5px;
  font-weight: 500;
}
.pm-page .wire-item .wire-role{
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--coral);
  font-size: 10px;
}
.pm-page .wire-item.is-link{
  transition: color 160ms ease;
}
.pm-page .wire-item.is-link:hover .wire-handle{
  color: var(--coral);
}
@media (prefers-reduced-motion: reduce) {
  .pm-page .marquee-track{ animation: none; }
}


.pm-page .about-grid{
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 80px;
  align-items: center;
}
.pm-page .about h2{
  font-size: clamp(44px, 5.4vw, 78px);
  margin: 30px 0 36px;
}
.pm-page .about .label{ margin-bottom: 28px; }
.pm-page .about .lead{ margin-bottom: 36px; max-width: 42ch; font-size: 17px; }
.pm-page .about .footer-row{
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 56px;
  color: var(--ink-faint);
  font-family: var(--sans);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.pm-page .about .footer-row .mark{
  width: 30px; height: 30px;
  border-radius: 50%;
  border: 1px solid var(--ink);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-style: italic;
  font-size: 14px;
  color: var(--ink);
}
.pm-page .about .stamp{
  margin-left: auto;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.4;
}
.pm-page .about .stamp span:first-child{ color: var(--coral); }
.pm-page .about-art{
  position: relative;
  aspect-ratio: 1 / 1;
  max-width: 620px;
  margin-left: auto;
}
.pm-page .about-art img{ width: 100%; height: 100%; object-fit: contain; }
.pm-page .about-side-note{
  position: absolute;
  right: -8px;
  top: 26px;
  text-align: right;
  font-family: var(--sans);
  font-size: 10.5px;
  line-height: 1.55;
  color: var(--ink-faint);
  letter-spacing: 0.04em;
  max-width: 16ch;
}
.pm-page .about-side-note b{
  display: block;
  color: var(--coral);
  width: 36px;
  height: 1px;
  background: var(--coral);
  margin: 0 0 10px auto;
}
.pm-page .about-caption{
  position: absolute;
  right: 18px;
  bottom: 4px;
  font-family: var(--sans);
  font-size: 9.5px;
  color: var(--ink-faint);
  text-align: right;
  letter-spacing: 0.06em;
  line-height: 1.45;
}
.pm-page .about-caption b{ color: var(--ink); display: block; }


.pm-page .capabilities-grid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: center;
}
.pm-page .capabilities-art{
  position: relative;
  aspect-ratio: 1 / 1;
  max-width: 600px;
}
.pm-page .capabilities-art img{ width: 100%; height: 100%; object-fit: contain; }
.pm-page .capabilities-art .ribbon{
  position: absolute;
  right: -42px;
  top: 50%;
  font-family: var(--sans);
  font-size: 10.5px;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: var(--ink-faint);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
.pm-page .capabilities-art .ribbon b{ color: var(--coral); }
.pm-page .capabilities-art .corner{ position: absolute; width: 22px; height: 22px; border-color: var(--ink-faint); border-style: solid; border-width: 0; }
.pm-page .capabilities-art .corner.tl{ top: 0; left: 0; border-top-width: 1px; border-left-width: 1px; }
.pm-page .capabilities-art .corner.br{ bottom: 0; right: 0; border-bottom-width: 1px; border-right-width: 1px; }
.pm-page .capabilities-copy h2{ font-size: clamp(40px, 4.8vw, 64px); margin: 22px 0 30px; }
.pm-page .cards{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 22px;
}
.pm-page .card{
  padding: 28px 26px 32px;
  background: var(--bone);
  border-radius: 18px;
  box-shadow: var(--shadow), inset 0 0 0 1px rgba(21, 20, 15, 0.06);
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease;
}
.pm-page .card:hover{ transform: translateY(-3px); }
.pm-page .card .num{
  font-family: var(--serif);
  font-style: italic;
  font-size: 22px;
  font-weight: 500;
  color: var(--coral);
  letter-spacing: 0.04em;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.pm-page .card .num .tag{
  font-family: var(--sans);
  font-size: 9.5px;
  color: var(--ink-faint);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 500;
}
.pm-page .card .icon{
  width: 28px;
  height: 28px;
  margin-bottom: 16px;
  color: var(--ink);
}
.pm-page .card h3{
  font-family: var(--sans);
  font-size: 22px;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.014em;
  margin-bottom: 14px;
}
.pm-page .card p{
  font-family: var(--body);
  font-size: 13.5px;
  color: var(--ink-mute);
  line-height: 1.55;
  max-width: 24ch;
}
.pm-page .card .arrow-mark{
  position: absolute;
  right: 22px;
  bottom: 22px;
  width: 28px; height: 28px;
  border: 1px solid var(--line);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--ink);
  transition: all 0.18s ease;
}
.pm-page .card:hover .arrow-mark{ background: var(--coral); border-color: var(--coral); color: #fff; }
.pm-page .card .arrow-mark svg{ width: 11px; height: 11px; stroke: currentColor; fill: none; stroke-width: 1.6; }


.pm-page .labs-head{
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 60px;
  align-items: end;
  margin-bottom: 48px;
}
.pm-page .labs-head h2{ font-size: clamp(40px, 4.8vw, 68px); }
.pm-page .pills{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}
.pm-page .pill{
  padding: 9px 18px;
  border-radius: 999px;
  border: 1px solid var(--line);
  font-family: var(--sans);
  font-size: 13px;
  color: var(--ink-soft);
  background: transparent;
  cursor: pointer;
  transition: all 0.18s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.pm-page .pill:hover{ background: rgba(21, 20, 15, 0.04); }
.pm-page .pill.active{
  background: var(--coral);
  border-color: var(--coral);
  color: #fff;
}
.pm-page .pill .count{
  font-size: 10px;
  color: var(--ink-faint);
  border-left: 1px solid var(--line);
  padding-left: 8px;
}
.pm-page .pill.active .count{ color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.3); }
.pm-page .labs-meta{
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 22px;
  margin-bottom: 30px;
}
.pm-page .labs-meta .ring{
  width: 38px; height: 38px;
  border-radius: 50%;
  border: 1px dashed var(--ink);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 700;
}
.pm-page .labs-meta .meta-text{
  font-family: var(--sans);
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  line-height: 1.55;
  color: var(--ink-faint);
  max-width: 28ch;
}
.pm-page .labs-meta .meta-text b{ display: block; color: var(--ink); }
.pm-page .labs-grid{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}
.pm-page .lab{
  display: flex;
  flex-direction: column;
}
.pm-page .lab-img{
  aspect-ratio: 4 / 5;
  background: var(--bone);
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 18px;
  box-shadow: var(--shadow);
  position: relative;
}
.pm-page .lab-img img{ width: 100%; height: 100%; object-fit: cover; }
.pm-page .lab-img .badge{
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(239, 231, 210, 0.9);
  color: var(--ink);
  padding: 4px 9px;
  border-radius: 4px;
  font-family: var(--sans);
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.pm-page .lab .num-row{
  font-family: var(--sans);
  font-size: 10.5px;
  color: var(--ink-faint);
  letter-spacing: 0.14em;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
}
.pm-page .lab h4{
  font-family: var(--sans);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.014em;
  margin-bottom: 8px;
}
.pm-page .lab p{
  font-family: var(--body);
  font-size: 13px;
  color: var(--ink-mute);
  line-height: 1.55;
  margin-bottom: 14px;
}
.pm-page .lab .arrow-mark{
  width: 28px; height: 28px;
  border: 1px solid var(--line);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--ink);
  margin-top: auto;
  align-self: flex-start;
}
.pm-page .lab .arrow-mark svg{ width: 11px; height: 11px; stroke: currentColor; fill: none; stroke-width: 1.6; }
.pm-page .labs-foot{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  border-top: 1px dashed var(--line);
  padding-top: 22px;
}
.pm-page .progress{
  display: flex;
  align-items: center;
  gap: 8px;
}
.pm-page .progress span{
  width: 26px; height: 2px;
  background: var(--line);
  border-radius: 2px;
}
.pm-page .progress span.on{ background: var(--coral); }


.pm-page .method-head{
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 60px;
  align-items: start;
  margin-bottom: 80px;
}
.pm-page .method-head h2{ font-size: clamp(44px, 5.2vw, 76px); }
.pm-page .method-head .right{
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding-top: 14px;
}
.pm-page .method-head .plus{
  color: var(--coral);
  font-size: 24px;
  line-height: 1;
  font-family: var(--sans);
}
.pm-page .method-head .right p{
  font-family: var(--sans);
  font-size: 13px;
  color: var(--ink-soft);
  max-width: 22ch;
  line-height: 1.55;
}
.pm-page .method-grid{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  position: relative;
}
.pm-page .method-grid::before{
  content: '';
  position: absolute;
  top: 60px;
  left: 50px;
  right: 50px;
  height: 1px;
  background: var(--line-soft);
}
.pm-page .method-step{ position: relative; }
.pm-page .method-step .num{
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  font-size: 78px;
  color: var(--coral);
  line-height: 0.85;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
  background: var(--paper);
  display: inline-block;
  padding-right: 12px;
  position: relative;
  z-index: 1;
}
.pm-page .method-step h4{
  font-family: var(--sans);
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.022em;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 18px;
}
.pm-page .method-step h4 .arrow-r{
  color: var(--ink-faint);
  font-size: 22px;
  line-height: 1;
}
.pm-page .method-step:last-child h4 .arrow-r{ display: none; }
.pm-page .method-step p{
  font-family: var(--body);
  font-size: 13.5px;
  color: var(--ink-mute);
  line-height: 1.55;
  margin-bottom: 24px;
  max-width: 24ch;
}
.pm-page .method-step .img{
  aspect-ratio: 1 / 1;
  background: var(--bone);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
}
.pm-page .method-step .img img{ width: 100%; height: 100%; object-fit: cover; }
.pm-page .method-foot{
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed var(--line);
  padding-top: 24px;
}
.pm-page .method-foot .left, .pm-page .method-foot .right{
  font-family: var(--sans);
  font-size: 11px;
  color: var(--ink-faint);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.pm-page .method-foot .left{
  display: inline-flex;
  align-items: center;
  gap: 12px;
}
.pm-page .method-foot .left .ring{
  width: 20px; height: 20px;
  border: 1px dashed var(--ink-faint);
  border-radius: 50%;
}
.pm-page .method-foot .right b{ color: var(--ink); }


.pm-page .work{
  background: #15140f;
  color: var(--paper);
  border-radius: 32px;
  margin: 0 64px;
  overflow: hidden;
  position: relative;
  padding: 110px 64px;
}
.pm-page .work::before{
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n2'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.95  0 0 0 0 0.85  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n2)'/></svg>");
  background-size: 240px 240px;
  opacity: 0.6;
  mix-blend-mode: screen;
}
.pm-page .work-rule{
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(247, 241, 222, 0.16);
  padding-top: 16px;
  margin-bottom: 60px;
  font-family: var(--sans);
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(247, 241, 222, 0.55);
}
.pm-page .work-rule .roman{ color: var(--coral); font-family: var(--serif); font-style: italic; font-size: 14px; letter-spacing: 0.04em; text-transform: none; }
.pm-page .work-grid{
  display: grid;
  grid-template-columns: 1fr 1.05fr 0.85fr;
  gap: 48px;
  align-items: center;
  position: relative;
}
.pm-page .work .label{ color: var(--coral); }
.pm-page .work .label::before{ background: var(--coral); }
.pm-page .work-copy h2{
  font-family: var(--sans);
  font-weight: 800;
  font-size: clamp(40px, 5vw, 66px);
  line-height: 1.0;
  letter-spacing: -0.024em;
  margin: 28px 0 36px;
  color: var(--paper);
}
.pm-page .work-copy h2 em{
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
}
.pm-page .work-copy h2 .dot{ color: var(--coral); }
.pm-page .work-link{
  display: inline-flex;
  align-items: center;
  gap: 18px;
  color: var(--paper);
  font-family: var(--sans);
  font-size: 14px;
  text-decoration: none;
  border-bottom: 2px solid var(--coral);
  padding-bottom: 12px;
  width: fit-content;
}
.pm-page .work-link::after{ content: '↗'; color: var(--coral); }
.pm-page .work-card{
  background: var(--paper);
  color: var(--ink);
  border-radius: 18px;
  padding: 32px 30px;
  position: relative;
  transform: rotate(-1.2deg);
  text-decoration: none;
  display: block;
  transition: transform 280ms ease, box-shadow 280ms ease;
}
.pm-page .work-card:hover{
  transform: rotate(-1.2deg) translateY(-4px);
  box-shadow: var(--shadow);
}
.pm-page .work-card.alt{
  transform: rotate(2.4deg) translateY(20px);
  padding: 28px 26px;
}
.pm-page .work-card.alt:hover{
  transform: rotate(2.4deg) translateY(16px);
  box-shadow: var(--shadow);
}
.pm-page .work-card .label-row{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}
.pm-page .work-card .small-label{
  font-family: var(--sans);
  font-size: 10.5px;
  color: var(--coral);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
}
.pm-page .work-card .index{
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-faint);
  letter-spacing: 0.04em;
}
.pm-page .work-card h3{
  font-family: var(--sans);
  font-size: clamp(26px, 2.4vw, 38px);
  font-weight: 800;
  letter-spacing: -0.022em;
  line-height: 1.05;
  margin-bottom: 14px;
}
.pm-page .work-card p{
  font-family: var(--body);
  font-size: 14px;
  color: var(--ink-mute);
  line-height: 1.55;
  margin-bottom: 22px;
  max-width: 28ch;
}
.pm-page .work-card .img{
  aspect-ratio: 4 / 3;
  background: var(--bone);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 22px;
}
.pm-page .work-card .img img{ width: 100%; height: 100%; object-fit: cover; }
.pm-page .work-card .meta-row{
  display: flex;
  justify-content: space-between;
  color: var(--ink-faint);
  font-family: var(--sans);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  border-top: 1px solid var(--line);
  padding-top: 14px;
}
.pm-page .work-card .year{ color: var(--coral); font-weight: 600; }
.pm-page .work-arrows{
  position: absolute;
  right: 64px;
  bottom: 64px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.pm-page .work-arrows .nav-btn{
  width: 46px; height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(247, 241, 222, 0.2);
  background: transparent;
  color: var(--paper);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.pm-page .work-arrows .nav-btn.active{ background: var(--coral); border-color: var(--coral); }


.pm-page .testimonial-grid{
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 80px;
  align-items: center;
}
.pm-page .testimonial-copy h2{
  font-family: var(--sans);
  font-size: clamp(36px, 4vw, 54px);
  font-weight: 700;
  letter-spacing: -0.022em;
  line-height: 1.12;
  margin-bottom: 36px;
}
.pm-page .testimonial-copy h2 em{
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
}
.pm-page .author{
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 22px;
}
.pm-page .author .avatar{
  width: 50px; height: 50px;
  border-radius: 50%;
  background: var(--ink);
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--paper);
  font-family: var(--serif);
  font-style: italic;
  font-size: 24px;
}
.pm-page .author p{
  font-family: var(--sans);
  font-size: 14px;
  color: var(--ink);
  font-weight: 600;
}
.pm-page .author p span{
  display: block;
  color: var(--ink-mute);
  font-weight: 400;
}
.pm-page .divider{
  border-top: 1px solid var(--line);
  margin: 60px 0 32px;
}
.pm-page .partners-text{
  font-family: var(--body);
  font-size: 14px;
  color: var(--ink-mute);
  margin-bottom: 26px;
  max-width: 38ch;
}
.pm-page .partners{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 22px;
  align-items: end;
}
.pm-page .partner{
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: transform 220ms ease;
}
.pm-page .partner:hover{ transform: translateY(-2px); }
.pm-page .partner:hover .glyph{ color: var(--coral); }
.pm-page .partner:hover span{ color: var(--coral); }
.pm-page .partner .glyph{
  height: 32px;
  display: flex;
  align-items: center;
  color: var(--ink);
  transition: color 220ms ease;
}
.pm-page .partner .glyph svg{ height: 100%; width: auto; max-width: 90px; }
.pm-page .partner span{
  font-family: var(--sans);
  font-size: 13px;
  color: var(--ink);
  letter-spacing: -0.005em;
  font-weight: 600;
  transition: color 220ms ease;
}
.pm-page .partner small{
  font-family: var(--sans);
  font-size: 10px;
  color: var(--ink-faint);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.pm-page .read-more{
  margin-top: 56px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--sans);
  font-size: 13px;
  color: var(--ink);
  text-decoration: none;
  letter-spacing: 0.04em;
  border-bottom: 1px solid var(--coral);
  padding-bottom: 6px;
}
.pm-page .read-more::after{ content: '→'; color: var(--coral); }
.pm-page .testimonial-art{
  position: relative;
  aspect-ratio: 1 / 1;
  max-width: 560px;
}
.pm-page .testimonial-art img{ width: 100%; height: 100%; object-fit: contain; }


.pm-page .cta-grid{
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 50px;
  align-items: center;
}
.pm-page .cta h2{
  font-size: clamp(54px, 6.6vw, 100px);
  margin: 32px 0 32px;
}
.pm-page .cta .lead{ margin-bottom: 36px; max-width: 36ch; font-size: 16px; }
.pm-page .cta-actions{
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 32px;
}
.pm-page .email-pill{
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px 14px 22px;
  border-radius: 999px;
  border: 1px solid var(--line);
  font-family: var(--sans);
  font-size: 14px;
  color: var(--ink);
  text-decoration: none;
}
.pm-page .email-pill .arrow-circle{
  width: 22px; height: 22px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--paper);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
.pm-page .cta-foot{
  display: flex;
  gap: 28px;
  align-items: center;
  margin-top: 32px;
  padding-top: 22px;
  border-top: 1px solid var(--line);
  font-family: var(--sans);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-faint);
}
.pm-page .cta-foot .stamp{ color: var(--coral); font-weight: 600; }
.pm-page .cta-art{
  position: relative;
  aspect-ratio: 1 / 1;
  max-width: 620px;
  margin-left: auto;
}
.pm-page .cta-art img{ width: 100%; height: 100%; object-fit: contain; }
.pm-page .cta-art .index{
  position: absolute;
  right: 8px;
  top: 24px;
  font-family: var(--serif);
  font-style: italic;
  font-size: 28px;
  color: var(--ink-faint);
}
.pm-page .cta-art .ribbon{
  position: absolute;
  left: -32px;
  top: 50%;
  font-family: var(--sans);
  font-size: 10.5px;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: var(--ink-faint);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}


.pm-page footer{
  border-top: 1px solid var(--line);
  padding: 60px 0 30px;
  margin-top: 60px;
}
.pm-page .foot-grid{
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}
.pm-page .foot-brand .brand{ margin-bottom: 18px; }
.pm-page .foot-brand p{
  font-family: var(--body);
  font-size: 13.5px;
  color: var(--ink-mute);
  line-height: 1.55;
  max-width: 38ch;
}
.pm-page .foot-brand p .inline-link, .pm-page .inline-link{
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid var(--line);
  transition: color 160ms ease, border-color 160ms ease;
}
.pm-page .inline-link:hover{
  color: var(--coral);
  border-bottom-color: var(--coral);
}
.pm-page .method-repo-link{
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color 160ms ease, border-color 160ms ease;
}
.pm-page .method-repo-link:hover{
  color: var(--coral);
  border-bottom-color: var(--coral);
}
.pm-page .library-link{
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 160ms ease;
}
.pm-page .library-link:hover{ border-bottom-color: var(--coral); }
.pm-page .foot-col h5{
  font-family: var(--sans);
  font-size: 11px;
  color: var(--ink);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 18px;
  font-weight: 700;
}
.pm-page .foot-col ul{ list-style: none; }
.pm-page .foot-col li{ margin-bottom: 10px; }
.pm-page .foot-col a{
  font-family: var(--body);
  font-size: 13.5px;
  color: var(--ink-soft);
  text-decoration: none;
}
.pm-page .foot-col a:hover{ color: var(--coral); }
.pm-page .foot-bottom{
  border-top: 1px solid var(--line);
  padding-top: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--sans);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-faint);
}
.pm-page .foot-bottom .right{ display: inline-flex; gap: 24px; align-items: center; }
.pm-page .foot-bottom .pulse{
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--coral);
  display: inline-block;
  margin-right: 6px;
  vertical-align: middle;
}
.pm-page .foot-mega{
  margin-top: 60px;
  padding-top: 0;
  padding-bottom: 12px;
  border-top: 1px solid var(--line);
  overflow-x: hidden;
  overflow-y: visible;
}
.pm-page .foot-mega .word{
  font-family: var(--sans);
  font-weight: 900;
  font-size: clamp(70px, 13vw, 200px);
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: var(--ink);
  white-space: nowrap;
  margin-top: 30px;
  padding-bottom: 0.18em;
}
.pm-page .foot-mega .word em{
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  color: var(--coral);
}


.pm-page [data-reveal]{
  opacity: 0;
  translate: 0 28px;
  transition:
    opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0ms),
    translate 900ms cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0ms),
    scale 900ms cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay, 0ms);
  will-change: opacity, translate, scale;
}
.pm-page [data-reveal='left']{ translate: -36px 0; }
.pm-page [data-reveal='right']{ translate: 36px 0; }
.pm-page [data-reveal='scale']{ translate: 0 0; scale: 0.96; }
.pm-page [data-reveal='rise-lg']{ translate: 0 64px; scale: 0.985; }
.pm-page [data-reveal][data-revealed='true']{
  opacity: 1;
  translate: 0 0;
  scale: 1;
}


.pm-page .cards > .card[data-reveal]:nth-child(1){ --reveal-delay: 0ms; }
.pm-page .cards > .card[data-reveal]:nth-child(2){ --reveal-delay: 90ms; }
.pm-page .cards > .card[data-reveal]:nth-child(3){ --reveal-delay: 180ms; }
.pm-page .cards > .card[data-reveal]:nth-child(4){ --reveal-delay: 270ms; }

.pm-page .labs-grid > .lab[data-reveal]:nth-child(1){ --reveal-delay: 0ms; }
.pm-page .labs-grid > .lab[data-reveal]:nth-child(2){ --reveal-delay: 90ms; }
.pm-page .labs-grid > .lab[data-reveal]:nth-child(3){ --reveal-delay: 180ms; }
.pm-page .labs-grid > .lab[data-reveal]:nth-child(4){ --reveal-delay: 270ms; }
.pm-page .labs-grid > .lab[data-reveal]:nth-child(5){ --reveal-delay: 360ms; }

.pm-page .method-grid > .method-step[data-reveal]:nth-child(1){ --reveal-delay: 0ms; }
.pm-page .method-grid > .method-step[data-reveal]:nth-child(2){ --reveal-delay: 110ms; }
.pm-page .method-grid > .method-step[data-reveal]:nth-child(3){ --reveal-delay: 220ms; }
.pm-page .method-grid > .method-step[data-reveal]:nth-child(4){ --reveal-delay: 330ms; }

.pm-page .partners > .partner[data-reveal]:nth-child(1){ --reveal-delay: 0ms; }
.pm-page .partners > .partner[data-reveal]:nth-child(2){ --reveal-delay: 70ms; }
.pm-page .partners > .partner[data-reveal]:nth-child(3){ --reveal-delay: 140ms; }
.pm-page .partners > .partner[data-reveal]:nth-child(4){ --reveal-delay: 210ms; }
.pm-page .partners > .partner[data-reveal]:nth-child(5){ --reveal-delay: 280ms; }
.pm-page .partners > .partner[data-reveal]:nth-child(6){ --reveal-delay: 350ms; }


.pm-page .hero-copy > [data-reveal]:nth-of-type(1){ --reveal-delay: 0ms; }
.pm-page .hero-copy > [data-reveal]:nth-of-type(2){ --reveal-delay: 80ms; }
.pm-page .hero-copy > [data-reveal]:nth-of-type(3){ --reveal-delay: 160ms; }
.pm-page .hero-copy > [data-reveal]:nth-of-type(4){ --reveal-delay: 240ms; }
.pm-page .hero-copy > [data-reveal]:nth-of-type(5){ --reveal-delay: 320ms; }
.pm-page .hero-copy > [data-reveal]:nth-of-type(6){ --reveal-delay: 400ms; }

@media (prefers-reduced-motion: reduce) {
  .pm-page [data-reveal]{
    opacity: 1 !important;
    translate: 0 0 !important;
    scale: 1 !important;
    transition: none !important;
  }
  
  .pm-page .nav{ transition: none !important; }
}


@media (max-width: 1280px) {
  .pm-page .container{ padding: 0 44px; }
  .pm-page .work{ margin: 0 44px; padding: 90px 44px; }
  .pm-page .side-rail{ display: none; }
}

@media (max-width: 1200px) {
  .pm-page .topbar-inner .mid{ display: none; }
}

@media (max-width: 1180px) {
  .pm-page .nav-inner{ gap: 18px; }
  .pm-page .brand-meta{ display: none; }
  .pm-page .nav-links{ gap: 28px; }
}
@media (max-width: 1080px) {
  .pm-page .container{ padding: 0 32px; }
  .pm-page .hero h1{ font-size: clamp(36px, 4.6vw, 54px); }
  .pm-page .section-header h2{ font-size: clamp(32px, 4vw, 50px); }
  .pm-page .labs-grid{ grid-template-columns: repeat(5, 1fr); gap: 14px; }
  .pm-page .partners{ grid-template-columns: repeat(3, 1fr); gap: 18px; row-gap: 28px; }
  .pm-page .foot-grid{ grid-template-columns: 2fr 1fr 1fr; }
  .pm-page .foot-grid .foot-col:nth-child(4), .pm-page .foot-grid .foot-col:nth-child(5){ display: none; }
}
@media (max-width: 880px) {
  .pm-page .container{ padding: 0 24px; }
  .pm-page .hero-grid, .pm-page .about-grid, .pm-page .capabilities-grid, .pm-page .testimonial-grid, .pm-page .cta-grid{
    grid-template-columns: 1fr;
    gap: 50px;
  }
  .pm-page .labs-head, .pm-page .method-head{ grid-template-columns: 1fr; }
  .pm-page .labs-grid{ grid-template-columns: repeat(2, 1fr); }
  .pm-page .method-grid{ grid-template-columns: repeat(2, 1fr); gap: 36px; }
  .pm-page .method-grid::before{ display: none; }
  .pm-page .work{ margin: 0 12px; padding: 60px 24px; }
  .pm-page .work-grid{ grid-template-columns: 1fr; }
  .pm-page .partners{ grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .pm-page .nav-links, .pm-page .brand-meta, .pm-page .nav-cta{ display: none; }
  
  .pm-page .wire-inner{ grid-template-columns: 1fr; gap: 14px; }
  .pm-page .wire-left{
    border-right: none;
    border-bottom: 1px solid var(--line);
    padding-right: 0;
    padding-bottom: 12px;
    min-height: 0;
  }
}
@media (max-width: 560px) {
  .pm-page .container{ padding: 0 16px; }
  .pm-page .hero h1{ font-size: 38px; }
  .pm-page .labs-grid{ grid-template-columns: 1fr; }
  .pm-page .cards{ grid-template-columns: 1fr; }
  .pm-page .pills{ justify-content: flex-start; }
  .pm-page section{ padding: 80px 0; }
  .pm-page .topbar-inner{ font-size: 9px; }
}

.pm-page .code-inline{
  font-family: var(--mono);
  font-size: 14px;
  background: var(--bone);
  padding: 1px 6px;
  border-radius: 4px;
}
.pm-page .code-inline.sm{ font-size: 12px; padding: 0 4px; }
`

const PAGE_BODY = `<div class='side-rail right' data-od-id='rail-right'>
  <span class='rail-text'>ProChat Memory</span>
</div>
<div class='side-rail left' data-od-id='rail-left'>
  <span class='rail-text'>Memory · Persistence</span>
</div>
<div class='shell'>

<div class='topbar' data-od-id='topbar'>
  <div class='container topbar-inner'>
    <span><b>OD / 2026</b> &nbsp;·&nbsp; Vol. 01 / Issue Nº 08</span>
    <span class='mid'>
      <span>Filed under <b class='coral'>Memory · AI Tools</b></span>
      <span>Local-first · Review-first</span>
    </span>
    <span class='right'>
      <a class='topbar-link' href='#contact'><span class='pulse'></span>Tester interest</a>
      <span><b>EN</b> · DE · ZH · JA</span>
    </span>
  </div>
</div>

<header class='nav' data-od-id='nav'>
  <div class='container nav-inner'>
    <a href='#top' class='brand'>
      <span class='brand-mark'>Ø</span>
      <span>ProChat Memory</span>
      <span class='brand-meta'><b>Studio Nº 01</b>Open / Earth</span>
    </a>
    <nav>
      <ul class='nav-links'>
          <li><a href='#about'>Documentation</a></li>
          <li><a href='#capabilities'>Features</a></li>
          <li><a href='#work'>Examples</a></li>
          <li><a href='#labs'>Reviews</a></li>
          <li><a href='#testimonial'>Contributors</a></li>
          <li><a href='#contact'>Contact</a></li>
      </ul>
    </nav>
    <div class='nav-side'>
      <a class='nav-cta' href='#contact'>Contact →</a>
      <span class='status-dot' aria-hidden='true'></span>
    </div>
  </div>
</header>

<section class='hero' id='top' data-od-id='hero'>
  <div class='container'>
    <div class='sec-rule'>
      <span class='roman'>I.</span>
      <span class='meta-grp'>
        <span>Hero / Cover Plate</span>
        <span class='dot-mark'>•</span>
        <span>ProChat Memory / Volume 01</span>
      </span>
      <span>001 / 008</span>
    </div>
  </div>
  <div class='container hero-grid'>
    <div class='hero-copy'>
      <span class='label' data-reveal>Private, persistent memory <span class='ix'>· Nº 01</span></span>
      <h1 class='display' data-reveal>Stop rebuilding <em>context</em><span class='dot'>.</span></h1>
      <p class='lead' data-reveal>ProChat Memory is the flagship product for local, reviewable memory in AI-assisted work. ProChat Memory for QA is the first launch niche and first discipline-specific edition.</p>
      <div class='hero-actions' data-reveal>
        <a class='btn btn-primary' href='#contact'>
          Become a tester
          <span class='arrow'><svg viewBox='0 0 24 24'><path d='M5 19L19 5M19 5H8M19 5v11'/></svg></span>
        </a>
        <a class='btn btn-ghost' href='#about'>
          See how Memory works
          <span class='arrow'><svg viewBox='0 0 24 24'><circle cx='12' cy='12' r='9'/><path d='M9 12h6M12 9v6'/></svg></span>
        </a>
      </div>
      <div class='hero-stats' data-reveal>
          <div class='stat'>
    <span class='ring solid'>12</span>
    <span class='stat-label'><b>lessons</b>published</span>
  </div>
          <div class='stat'>
    <span class='ring'>8</span>
    <span class='stat-label'><b>examples</b>live</span>
  </div>
          <div class='stat'>
    <span class='ring coral'>1</span>
    <span class='stat-label'><b>tool</b>featured</span>
  </div>
      </div>
      <div class='hero-foot' data-reveal>
        <span class='meta'>Local, persistent, human-reviewed</span>
        <span class='coord'>45.47°N · 8.19°E</span>
      </div>
      </div>
      <div class='hero-art' data-reveal='scale'>
        <span class='corner tl'></span>
        <span class='corner tr'></span>
        <span class='corner bl'></span>
        <span class='corner br'></span>
        <span class='annot annot-tl coord'>FIG. 01</span>
        <span class='annot annot-tr'>Memory Nº 08</span>
        <span class='annot annot-bl coord'>SHA</span>
        <span class='annot annot-br'>Composable</span>
        <img src='/prochat-memory/assets/hero.svg' alt='' />
        <div class='index'>
      <span class='on'><span class='n'>01</span>Archive</span>
      <span><span class='n'>02</span>Select</span>
      <span><span class='n'>03</span>Apply</span>
      <span><span class='n'>04</span>Reuse</span>
      </div>
    </div>
  </div>
</section>

<section class='about' data-od-id='about'>
  <div class='container'>
    <div class='sec-rule'>
    <span class='roman'>II.</span>
    <span class='meta-grp'>
      <span>About / Manifesto</span>
      <span class='dot-mark'>•</span>
      <span>ProChat Memory / Volume 01</span>
    </span>
    <span>002 / 008</span>
  </div>
    <div class='about-grid'>
      <div class='about-copy' data-reveal>
        <span class='label'>About <span class='ix'>· Nº 02</span></span>
        <h2 class='display'>From <em>work</em><em> to memory</em><span class='dot'>.</span></h2>
        <p class='lead'>Your work is already creating knowledge. ProChat Memory gives those lessons a structured place to remain available.</p>
        <a class='btn btn-ghost' href='#about'>
          Read the approach
          <span class='arrow'><svg viewBox='0 0 24 24'><path d='M5 19L19 5M19 5H8M19 5v11'/></svg></span>
        </a>
        <div class='footer-row'>
          <span class='mark'>Ø</span>
          <span>Capture · Structure · Connect · Review · Reuse</span>
          <span class='stamp'>
            <span>Studio practice</span>
            <span style='color: var(--ink);'>Est. MMXXVI</span>
          </span>
        </div>
      </div>
      <div class='about-art' data-reveal='right'>
        <img src='/prochat-memory/assets/about.svg' alt='' />
        <div class='about-side-note'>
          <b></b>
          Structured memory for AI workflows.
        </div>
        <div class='about-caption'>
          <b>Persistent context</b>
          for AI-assisted work
        </div>
      </div>
    </div>
  </div>
</section>

<section class='capabilities' id='agents' data-od-id='capabilities'>
  <div class='container'>
    <div class='sec-rule'>
    <span class='roman'>III.</span>
    <span class='meta-grp'>
      <span>Features</span>
      <span class='dot-mark'>•</span>
      <span>1 foundation</span>
    </span>
    <span>003 / 008</span>
  </div>
    <div class='capabilities-grid'>
      <div class='capabilities-art' data-reveal='left'>
        <span class='corner tl'></span>
        <span class='corner br'></span>
        <img src='/prochat-memory/assets/capabilities.svg' alt='' />
        <div class='ribbon'>Memory Foundation</div>
      </div>
      <div class='capabilities-copy' data-reveal>
        <span class='label'>Features <span class='ix'>· Nº 03</span></span>
        <h2 class='display'>Local memory for <em>AI tools</em><span class='dot'>.</span></h2>
        <p class='lead'>One local memory foundation serving every AI tool and workflow. Your full archive stays in place — only what matters for each task comes into context.</p>
        <div class='cards'>
            <div class='card' data-reveal>
    <div class='num'>01<span class='tag'>Archive</span></div>
    <svg class='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5'>
      <path d='M5 8h14v8H5z'/>
    </svg>
    <h3>Persistent archive</h3>
    <p>Local Markdown files with human-reviewed trust.</p>
    <a class='arrow-mark' href='#about' aria-label='Learn more about Archive'>
      <svg viewBox='0 0 24 24'><path d='M5 19L19 5M19 5H8M19 5v11'/></svg>
    </a>
  </div>
            <div class='card' data-reveal>
    <div class='num'>02<span class='tag'>Selection</span></div>
    <svg class='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5'>
      <circle cx='12' cy='12' r='8'/>
    </svg>
    <h3>Relevant context</h3>
    <p>Select only what matters for each task.</p>
    <a class='arrow-mark' href='#capabilities' aria-label='Learn more about Selection'>
      <svg viewBox='0 0 24 24'><path d='M5 19L19 5M19 5H8M19 5v11'/></svg>
    </a>
  </div>
            <div class='card' data-reveal>
    <div class='num'>03<span class='tag'>Control</span></div>
    <svg class='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5'>
      <path d='M2 12h20'/>
    </svg>
    <h3>Human control</h3>
    <p>You decide what becomes trusted memory.</p>
    <a class='arrow-mark' href='#labs' aria-label='Learn more about Control'>
      <svg viewBox='0 0 24 24'><path d='M5 19L19 5M19 5H8M19 5v11'/></svg>
    </a>
  </div>
            <div class='card' data-reveal>
    <div class='num'>04<span class='tag'>Continuity</span></div>
    <svg class='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5'>
      <rect x='3' y='3' width='18' height='18'/>
    </svg>
    <h3>Tool continuity</h3>
    <p>Context across AI tools and workflows.</p>
    <a class='arrow-mark' href='#work' aria-label='Learn more about Continuity'>
      <svg viewBox='0 0 24 24'><path d='M5 19L19 5M19 5H8M19 5v11'/></svg>
    </a>
  </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class='labs' id='labs' data-od-id='labs'>
  <div class='container'>
    <div class='sec-rule'>
    <span class='roman'>IV.</span>
    <span class='meta-grp'>
      <span>Reviews</span>
      <span class='dot-mark'>•</span>
      <span>Memory examples</span>
    </span>
    <span>004 / 008</span>
  </div>
    <div class='labs-head'>
      <div data-reveal>
        <span class='label'>Reviews <span class='ix'>· Nº 04</span></span>
        <h2 class='display' style='margin-top:30px;'>Your work is already creating <em>knowledge</em><span class='dot'>.</span></h2>
      </div>
      <div class='pills' data-reveal='right'>
          <button class='pill active'>All<span class='count'>24</span></button>
          <button class='pill'>Decisions<span class='count'>8</span></button>
          <button class='pill'>Corrections<span class='count'>6</span></button>
      </div>
    </div>
    <div class='labs-meta'>
      <span class='ring'>08</span>
      <div class='meta-text'>
        <b>Released memory</b>
        8 reviewed records
      </div>
    </div>
    <div class='labs-grid'>
        <div class='lab' data-reveal>
    <div class='lab-img'><span class='badge'>Example</span><img src='/prochat-memory/assets/lab-1.svg' alt='' /></div>
    <div class='num-row'><span>01</span><span>2026</span></div>
    <h4>Null handling</h4>
    <p>Always return an empty array from collection endpoints.</p>
    <a class='arrow-mark' href='#work' aria-label='Open Null handling'><svg viewBox='0 0 24 24'><path d='M5 19L19 5M19 5H8M19 5v11'/></svg></a>
  </div>
        <div class='lab' data-reveal>
    <div class='lab-img'><span class='badge'>Example</span><img src='/prochat-memory/assets/lab-2.svg' alt='' /></div>
    <div class='num-row'><span>02</span><span>2026</span></div>
    <h4>Type safety</h4>
    <p>Use proper typing for API responses.</p>
    <a class='arrow-mark' href='#work' aria-label='Open Type safety'><svg viewBox='0 0 24 24'><path d='M5 19L19 5M19 5H8M19 5v11'/></svg></a>
  </div>
        <div class='lab' data-reveal>
    <div class='lab-img'><span class='badge'>Example</span><img src='/prochat-memory/assets/lab-3.svg' alt='' /></div>
    <div class='num-row'><span>03</span><span>2026</span></div>
    <h4>API conventions</h4>
    <p>Always version endpoints. Never modify a published contract.</p>
    <a class='arrow-mark' href='#work' aria-label='Open API conventions'><svg viewBox='0 0 24 24'><path d='M5 19L19 5M19 5H8M19 5v11'/></svg></a>
  </div>
        <div class='lab' data-reveal>
    <div class='lab-img'><span class='badge'>Example</span><img src='/prochat-memory/assets/lab-4.svg' alt='' /></div>
    <div class='num-row'><span>04</span><span>2026</span></div>
    <h4>Deploy checklist</h4>
    <p>Run the checklist before each deploy. No exceptions in production.</p>
    <a class='arrow-mark' href='#work' aria-label='Open Deploy checklist'><svg viewBox='0 0 24 24'><path d='M5 19L19 5M19 5H8M19 5v11'/></svg></a>
  </div>
    </div>
    <div class='labs-foot'>
      <div class='progress'>
        <span class='on'></span><span class='on'></span><span class='on'></span><span class='on'></span><span></span><span></span><span></span><span></span>
      </div>
      <span class='meta'>8 / 24 records</span>
    </div>
  </div>
</section>

<section class='method' data-od-id='method'>
  <div class='container'>
    <div class='sec-rule'>
    <span class='roman'>V.</span>
    <span class='meta-grp'>
      <span>Method</span>
      <span class='dot-mark'>•</span>
      <span>Review loop</span>
    </span>
    <span>005 / 008</span>
  </div>
    <div class='method-head'>
      <div data-reveal>
        <span class='label'>Method <span class='ix'>· Nº 05</span></span>
        <h2 class='display' style='margin-top:30px;'>Work produces knowledge. Memory keeps it <em>useful</em><span class='dot'>.</span></h2>
      </div>
      <div class='right' data-reveal='right'>
        <span class='plus'>+</span>
        <p>Every approved decision becomes a structured memory record.</p>
      </div>
    </div>
    <div class='method-grid'>
        <div class='method-step' data-reveal>
    <div class='num'>01</div>
    <h4>Detect <span class='arrow-r'>→</span></h4>
    <p>Scan for potential memory candidates.</p>
    <div class='img'><img src='/prochat-memory/assets/method-1.svg' alt='' /></div>
  </div>
        <div class='method-step' data-reveal>
    <div class='num'>02</div>
    <h4>Discover <span class='arrow-r'>→</span></h4>
    <p>AI proposes lessons for review.</p>
    <div class='img'><img src='/prochat-memory/assets/method-2.svg' alt='' /></div>
  </div>
        <div class='method-step' data-reveal>
    <div class='num'>03</div>
    <h4>Direct <span class='arrow-r'>→</span></h4>
    <p>Context available for tools.</p>
    <div class='img'><img src='/prochat-memory/assets/method-3.svg' alt='' /></div>
  </div>
        <div class='method-step' data-reveal>
    <div class='num'>04</div>
    <h4>Deliver</h4>
    <p>Relevant records only.</p>
    <div class='img'><img src='/prochat-memory/assets/method-4.svg' alt='' /></div>
  </div>
    </div>
    <div class='method-foot'>
      <div class='left'>
        <span class='ring'></span>
        <span>From work to trusted memory.</span>
      </div>
      <div class='right'><span class='method-repo-link'>Local files</span> &nbsp;·&nbsp; Human-reviewed memory</div>
    </div>
  </div>
</section>

<section class='tight' data-od-id='work'>
  <div class='work'>
    <div class='work-rule'>
      <span class='roman'>VI.</span>
      <span style='display:inline-flex;gap:24px;'>
        <span>Examples</span>
        <span style='color:var(--coral);'>•</span>
        <span>2 curated</span>
      </span>
      <span>006 / 008</span>
    </div>
    <div class='work-grid'>
      <div class='work-copy' data-reveal>
        <span class='label'>Examples</span>
        <h2>From <em>work</em><em> to memory</em><span class='dot'>.</span></h2>
        <a class='work-link' href='#labs'>Review example records →</a>
      </div>
      <a class='work-card' data-reveal href='#'>
    <div class='label-row'>
      <span class='small-label'>Example</span>
      <span class='index'>01 / 08</span>
    </div>
    <h3>Null handling</h3>
    <p>Always return an empty array from collection endpoints.</p>
    <div class='img'><img src='/prochat-memory/assets/work-1.svg' alt='' /></div>
    <div class='meta-row'>
      <span class='year'>2026</span>
      <span>TRUSTED</span>
    </div>
  </a>
      <a class='work-card alt' data-reveal href='#'>
    <div class='label-row'>
      <span class='small-label'>Example</span>
      <span class='index'>02 / 08</span>
    </div>
    <h3>Type safety</h3>
    <p>Use proper typing for API responses.</p>
    <div class='img'><img src='/prochat-memory/assets/work-2.svg' alt='' /></div>
    <div class='meta-row'>
      <span class='year'>2026</span>
      <span>TRUSTED</span>
    </div>
  </a>
    </div>
    <div class='work-arrows'>
      <button class='nav-btn'><svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.6'><path d='M14 6l-6 6 6 6'/></svg></button>
      <button class='nav-btn active'><svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.6'><path d='M10 6l6 6-6 6'/></svg></button>
    </div>
  </div>
</section>

<section class='testimonial' data-od-id='testimonial'>
  <div class='container'>
    <div class='sec-rule'>
    <span class='roman'>VII.</span>
    <span class='meta-grp'>
      <span>Contributors</span>
      <span class='dot-mark'>•</span>
      <span>Local files</span>
    </span>
    <span>007 / 008</span>
  </div>
    <div class='testimonial-grid'>
      <div class='testimonial-copy' data-reveal>
        <span class='label'>Contributors <span class='ix'>· Nº 07</span></span>
        <h2 style='margin-top:30px;'>Memory becomes useful when people <em>review</em><span class='dot'> what should be trusted.</span></h2>
        <div class='author'>
          <span class='avatar'>R</span>
          <p>Review-led memory<br/><span>Human control first</span></p>
        </div>
        <div class='divider'></div>
        <p class='partners-text'>Built for people who value context, evidence, and continuity.</p>
        <div class='partners'>
        <a class='partner' data-reveal href='#about'>
    <div class='glyph'>
      <svg viewBox='0 0 80 30' fill='none' stroke='currentColor' stroke-width='2'>
        <path d='M5 8h14v8H5z'/>
      </svg>
    </div>
    <span>ProChat Team</span>
    <small>Maintainers</small>
  </a>
        <a class='partner' data-reveal href='#about'>
    <div class='glyph'>
      <svg viewBox='0 0 80 30' fill='none' stroke='currentColor' stroke-width='2'>
        <circle cx='12' cy='12' r='9'/>
      </svg>
    </div>
    <span>Contributor</span>
    <small>Designer</small>
  </a>
        </div>
        <a class='read-more' href='#about'>Read the method</a>
      </div>
      <div class='testimonial-art' data-reveal='right'>
        <img src='/prochat-memory/assets/testimonial.svg' alt='' />
      </div>
    </div>
  </div>
</section>

<section class='cta' id='contact' data-od-id='cta'>
  <div class='container'>
    <div class='sec-rule'>
    <span class='roman'>VIII.</span>
    <span class='meta-grp'>
      <span>Contact</span>
      <span class='dot-mark'>•</span>
      <span>Review-led</span>
    </span>
    <span>008 / 008</span>
  </div>
    <div class='cta-grid'>
      <div data-reveal>
        <span class='label'>Tester interest <span class='ix'>· Nº 07</span></span>
        <h2 class='display'>Let's build <em>persistent</em> memory <em>together</em><span class='dot'>.</span></h2>
        <p class='lead'>Tell us where your team rebuilds context so we can evaluate whether reviewable memory would help reduce repeated explanation and recovery effort.</p>
        <div class='cta-actions'>
          <a class='btn btn-primary' href='#contact'>
            Become a tester
            <span class='arrow'><svg viewBox='0 0 24 24'><path d='M5 19L19 5M19 5H8M19 5v11'/></svg></span>
          </a>
          <a class='email-pill' href='/contact?topic=prochat-memory'>
            Contact ProChat
            <span class='arrow-circle'>→</span>
          </a>
        </div>
        <div class='cta-foot'>
          <span class='stamp'>● Review-led</span>
          <span>Local files · Human control</span>
          <span style='margin-left:auto;'>Memory-first</span>
        </div>
      </div>
      <div class='cta-art' data-reveal='right'>
        <img src='/prochat-memory/assets/method-4.svg' alt='' />
        <div class='index'>Nº 08</div>
        <div class='ribbon'>PROCHAT MEMORY &nbsp;·&nbsp; FIN.</div>
      </div>
    </div>
  </div>
</section>

<footer data-od-id='footer'>
  <div class='container'>
    <div class='foot-grid'>
      <div class='foot-brand'>
        <a href='#top' class='brand'>
          <span class='brand-mark'>Ø</span>
          <span>ProChat Memory</span>
        </a>
        <p style='margin-top:18px;'>ProChat Memory is local, persistent memory for AI-assisted work.</p>
      </div>
      <div class='foot-col'>
    <h5>Product</h5>
    <ul>
        <li><a href='#about'>How it works</a></li>
        <li><a href='#capabilities'>Features</a></li>
        <li><a href='#work'>Use cases</a></li>
    </ul>
  </div>
    </div>
    <div class='foot-bottom'>
      <span><span class='pulse'></span>● <b style='color:var(--ink);'>ProChat Memory</b> · Local-first · Review-first</span>
      <span class='right'>
        <span>Memory-first</span>
        <span>Human-reviewed</span>
        <span style='color:var(--coral);'>♥</span>
      </span>
    </div>
    <div class='foot-mega'>
      <div class='word' data-reveal='rise-lg'>ProChat <em>Memory</em>.</div>
    </div>
  </div>
</footer>
</div>

`

export default function ProchatMemoryPage() {
  useEffect(() => {
    // Scroll-reveal observer
    const elements = document.querySelectorAll('.pm-page [data-reveal]:not([data-revealed])')
    if (!elements.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(el => { (el as HTMLElement).dataset.revealed = 'true' })
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          ;(entry.target as HTMLElement).dataset.revealed = 'true'
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    elements.forEach((el) => observer.observe(el))

    // Headroom-style sticky nav
    const nav = document.querySelector('.pm-page header.nav')
    if (!nav) return
    const SHOW_TOP = 100
    const DELTA = 6
    let lastY = window.scrollY || 0
    const onScroll = () => {
      const y = window.scrollY || 0
      const d = y - lastY
      if (y <= SHOW_TOP) {
        nav.classList.remove('is-hidden')
      } else if (d > DELTA) {
        nav.classList.add('is-hidden')
      } else if (d < -DELTA) {
        nav.classList.remove('is-hidden')
      }
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <div
        className="pm-page"
        style={{ position: 'relative', overflow: 'hidden' }}
        dangerouslySetInnerHTML={{ __html: PAGE_BODY }}
      />
    </>
  )
}
