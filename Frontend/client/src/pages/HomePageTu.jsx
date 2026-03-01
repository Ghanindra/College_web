import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TuHeader from "../components/TuHeader";
import graduation from "../assets/graduation.jpg";
import deepak from "../assets/deepak.jpg";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.png";
import axios from "axios";

/* ─── Injected Styles ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

  :root {
    --navy:   #0a1628;
    --navy2:  #112240;
    --navy3:  #1a3a5c;
    --gold:   #c9a84c;
    --gold2:  #e8c97a;
    --cream:  #f7f3ed;
    --white:  #ffffff;
    --slate:  #64748b;
    --shadow: 0 25px 60px rgba(10,22,40,0.18);
    --ff-d:   'Playfair Display', Georgia, serif;
    --ff-b:   'DM Sans', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: var(--ff-b); background: var(--cream); color: var(--navy); overflow-x: hidden; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--cream); }
  ::-webkit-scrollbar-thumb { background: var(--navy3); border-radius: 3px; }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(30px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .fade-up   { animation: fadeUp 0.8s cubic-bezier(.4,0,.2,1) both; }
  .delay-1   { animation-delay: 0.12s; }
  .delay-2   { animation-delay: 0.28s; }
  .delay-3   { animation-delay: 0.44s; }

  /* ════ HERO ════ */
  .hero {
    position: relative; min-height: 94vh; display: flex;
    align-items: flex-end; overflow: hidden; cursor: pointer;
    background: var(--navy);
  }
  .hero__bg {
    position: absolute; inset: 0;
    background-size: cover; background-position: center;
    transition: transform 1.4s cubic-bezier(.4,0,.2,1), opacity .7s ease;
    will-change: transform, opacity;
  }
  .hero__bg--exit { transform: scale(1.06); opacity: 0; }
  .hero__grad {
    position: absolute; inset: 0;
    background: linear-gradient(170deg, rgba(10,22,40,.1) 0%, rgba(10,22,40,.5) 45%, rgba(10,22,40,.95) 100%);
  }
  .hero__accent {
    position: absolute; top: 0; right: 0;
    width: 40vw; height: 3px;
    background: linear-gradient(90deg, transparent, var(--gold));
    transform-origin: right;
  }
  .hero__body {
    position: relative; z-index: 3; width: 100%;
    padding: 0 7vw 8vh;
    display: grid; grid-template-columns: 1fr auto;
    align-items: flex-end; gap: 2.5rem;
  }
  .hero__kicker {
    display: inline-flex; align-items: center; gap: 12px;
    font-size: .72rem; font-weight: 700; letter-spacing: .2em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 1.4rem;
  }
  .hero__kicker::before { content:''; width:40px; height:2px; background:var(--gold); display:block; }
  .hero__h1 {
    font-family: var(--ff-d);
    font-size: clamp(2.6rem, 5.8vw, 5.4rem);
    font-weight: 900; color: #fff; line-height: 1.04;
    letter-spacing: -.03em; max-width: 820px;
    margin-bottom: 1.6rem;
    text-shadow: 0 6px 40px rgba(0,0,0,.45);
  }
  .hero__sub {
    font-size: clamp(.95rem, 1.3vw, 1.18rem);
    color: rgba(255,255,255,.78); max-width: 500px;
    line-height: 1.75; font-weight: 300;
  }
  .hero__dots {
    position: absolute; bottom: 3.5vh; left: 50%;
    transform: translateX(-50%); z-index: 5;
    display: flex; gap: 9px;
  }
  .hero__dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: rgba(255,255,255,.3); border: none; cursor: pointer;
    transition: all .3s ease; padding: 0;
  }
  .hero__dot--active { background: var(--gold); width: 26px; border-radius: 4px; }
  .hero__glass {
    background: rgba(255,255,255,.07); backdrop-filter: blur(20px) saturate(140%);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(201,168,76,.3); border-radius: 18px;
    padding: 2rem 2.6rem; text-align: center; color: #fff;
    min-width: 190px; flex-shrink: 0;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.15);
  }
  .hero__glass-label {
    font-size: .68rem; font-weight: 700; letter-spacing: .18em;
    text-transform: uppercase; color: var(--gold); display: block; margin-bottom: .5rem;
  }
  .hero__glass-val {
    font-family: var(--ff-d); font-size: 2.4rem; font-weight: 800;
    display: block; line-height: 1; color: #fff;
  }

  /* ════ GOLD STRIPE ════ */
  .stripe { height: 4px; background: linear-gradient(90deg, var(--navy) 0%, var(--gold) 50%, var(--navy) 100%); }

  /* ════ SECTION COMMONS ════ */
  .sec { padding: 6rem 7vw; }
  .sec--white { background: #fff; }
  .sec--cream { background: var(--cream); }
  .sec--dark  { background: var(--navy); }

  .sec__eye {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: .7rem; font-weight: 700; letter-spacing: .2em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 1rem;
  }
  .sec__eye::before { content:''; width:26px; height:2px; background:var(--gold); display:block; }
  .sec__h2 {
    font-family: var(--ff-d);
    font-size: clamp(1.8rem, 3vw, 2.8rem);
    font-weight: 800; color: var(--navy); line-height: 1.1;
  }
  .sec--dark .sec__h2 { color: #fff; }

  .sep { display:flex; align-items:center; gap:1.2rem; margin: 1.2rem 0 3.5rem; }
  .sep__dot { width:7px; height:7px; border-radius:50%; background:var(--gold); flex-shrink:0; }
  .sep__line { flex:1; height:1px; background: linear-gradient(90deg, var(--gold) 0%, transparent 100%); }

  /* ════ NEWS & EVENTS ════ */

  .ne-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }
  @media(max-width:900px) { .ne-grid { grid-template-columns: 1fr; } }

  /* ── CARD SHELL ──
     overflow:hidden on the card clips child rows so nothing bleeds out.
     width:100% + display:block ensures the card never expands beyond its grid cell.
  */
  .card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;          /* ← clips everything inside */
    width: 100%;               /* ← never wider than grid column */
    display: block;
    box-shadow: 0 2px 24px rgba(10,22,40,.08);
    border: 1px solid rgba(10,22,40,.07);
    transition: transform .3s ease, box-shadow .3s ease;
  }
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 40px rgba(10,22,40,.13);
  }

  .card__hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.4rem 1.6rem 1.2rem;
    border-bottom: 2px solid #f3ede3;
  }
  .card__hd-title {
    font-family: var(--ff-d);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--navy);
    position: relative;
    padding-bottom: 8px;
  }
  .card__hd-title::after {
    content: '';
    position: absolute; left: 0; bottom: 0;
    width: 28px; height: 2.5px;
    background: var(--gold); border-radius: 2px;
  }
  .card__va {
    font-size: .68rem; font-weight: 700;
    letter-spacing: .08em; text-transform: uppercase;
    color: var(--navy3); text-decoration: none;
    padding: .32rem .85rem; border-radius: 100px;
    border: 1.5px solid rgba(26,58,92,.22);
    white-space: nowrap; flex-shrink: 0;
    transition: all .2s ease;
  }
  .card__va:hover { background: var(--navy); color: #fff; border-color: var(--navy); }


  /* ════════════════════════════
     NEWS LIST
     Key rules:
     • <li>  → display:block, width:100%, overflow:hidden
     • <a>   → display:flex, width:100%, overflow:hidden  (THE fix)
     • body  → flex:1 1 0%, min-width:0 (shrink correctly)
  ════════════════════════════ */
  .news-list { list-style: none; margin: 0; padding: 0; }

  .news-row {
    display: block;
    width: 100%;
    overflow: hidden;                  /* hard clip */
    border-bottom: 1px solid #f3ede3;
    position: relative;
  }
  .news-row:last-child { border-bottom: none; }

  /* Gold left-bar: on the <li>, not the <a>, so overflow:hidden on <a> won't clip it */
  .news-row::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px; background: var(--gold);
    transform: scaleY(0);
    transition: transform .22s ease;
    transform-origin: bottom;
    z-index: 1;
  }
  .news-row:hover::before { transform: scaleY(1); }
  .news-row:hover { background: #fdfaf5; }

  .news-row__link {
    display: flex;                     /* flex row */
    align-items: center;
    width: 100%;                       /* ← fill <li> completely */
    overflow: hidden;                  /* ← nothing escapes right */
    padding: 1rem 1.6rem;
    text-decoration: none;
    color: inherit;
    gap: .8rem;
    box-sizing: border-box;
  }

  /* Text column: must shrink — flex: 1 1 0% + min-width:0 */
  .news-row__body {
    flex: 1 1 0%;
    min-width: 0;                      /* ← allows flex child to shrink below content size */
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .news-row__title {
    font-size: .88rem; font-weight: 600;
    color: var(--navy); line-height: 1.45;
    /* clamp to 2 lines */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
  }
  .news-row__date {
    font-size: .7rem; color: var(--slate);
    white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }

  /* Arrow: hard fixed, never shrinks */
  .news-row__arrow {
    flex: 0 0 30px;
    width: 30px; height: 30px;
    border-radius: 50%;
    background: #f0ebe3;
    display: flex; align-items: center; justify-content: center;
    font-size: .78rem; color: var(--navy3);
    transition: background .2s, color .2s, transform .2s;
  }
  .news-row:hover .news-row__arrow {
    background: var(--gold); color: #fff;
    transform: translateX(3px);
  }


  /* ════════════════════════════
     EVENT LIST
     Same pattern: li → block + overflow:hidden
                   a  → flex + width:100% + overflow:hidden
                   ev-info → flex:1 1 0% + min-width:0
  ════════════════════════════ */
  .ev-list { list-style: none; margin: 0; padding: 0; }

  .ev-row {
    display: block;
    width: 100%;
    overflow: hidden;                  /* hard clip */
    border-bottom: 1px solid #f3ede3;
    position: relative;
  }
  .ev-row:last-child { border-bottom: none; }

  .ev-row::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px; background: var(--gold);
    transform: scaleY(0);
    transition: transform .22s ease;
    transform-origin: bottom;
    z-index: 1;
  }
  .ev-row:hover::before { transform: scaleY(1); }
  .ev-row:hover { background: #fdfaf5; }

  .ev-row__link {
    display: flex;
    align-items: center;
    width: 100%;                       /* ← fill parent */
    overflow: hidden;                  /* ← clip overflow */
    padding: .9rem 1.6rem;
    gap: .75rem;
    text-decoration: none;
    color: inherit;
    min-height: 76px;
    box-sizing: border-box;
  }

  /* ① Date box — hard fixed */
  .ev-cal {
    flex: 0 0 46px;
    width: 46px; height: 54px;
    border-radius: 10px;
    background: var(--navy);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    color: #fff;
    box-shadow: 0 3px 10px rgba(10,22,40,.22);
  }
  .ev-cal__day {
    font-family: var(--ff-d);
    font-size: 1.35rem; font-weight: 800; line-height: 1;
  }
  .ev-cal__mon {
    font-size: .5rem; text-transform: uppercase;
    letter-spacing: .1em; color: var(--gold); margin-top: 2px;
  }

  /* ② Thumbnail — hard fixed */
  .ev-thumb {
    flex: 0 0 52px;
    width: 52px; height: 52px;
    border-radius: 8px; object-fit: cover;
    display: block;
    box-shadow: 0 2px 8px rgba(0,0,0,.1);
  }
  .ev-nothumb {
    flex: 0 0 52px;
    width: 52px; height: 52px;
    border-radius: 8px; background: #ede8df;
    display: flex; align-items: center; justify-content: center;
    font-size: .62rem; color: var(--slate);
    text-align: center; line-height: 1.3;
  }

  /* ③ Info — takes remaining space, MUST shrink */
  .ev-info {
    flex: 1 1 0%;
    min-width: 0;                      /* ← THE fix, same as news */
    overflow: hidden;
    display: flex; flex-direction: column;
    justify-content: center; gap: 4px;
  }
  .ev-info__title {
    font-size: .87rem; font-weight: 600;
    color: var(--navy); line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
  }
  .ev-info__cat {
    display: inline-block;
    max-width: 100%;
    font-size: .61rem; font-weight: 700;
    letter-spacing: .08em; text-transform: uppercase;
    color: var(--navy3); background: #eee9e0;
    padding: 2px 8px; border-radius: 20px;
    white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }


  /* ════ CONVOCATION ════ */
  .convo {
    position: relative; min-height: 580px;
    background-attachment: fixed; background-size: cover; background-position: center;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .convo__mask {
    position: absolute; inset: 0;
    background: linear-gradient(140deg, rgba(10,22,40,.9) 0%, rgba(10,22,40,.7) 60%, rgba(201,168,76,.12) 100%);
  }
  .convo__corner {
    position: absolute; width: 80px; height: 80px;
    border-color: rgba(201,168,76,.5); border-style: solid;
  }
  .convo__corner--tl { top:2rem; left:2rem; border-width:2px 0 0 2px; }
  .convo__corner--br { bottom:2rem; right:2rem; border-width:0 2px 2px 0; }
  .convo__body {
    position: relative; z-index:2; text-align:center;
    max-width: 700px; padding: 0 2rem; color:#fff;
  }
  .convo__eye {
    display:inline-flex; align-items:center; gap:12px;
    font-size:.7rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase;
    color:var(--gold); margin-bottom:1.2rem;
  }
  .convo__eye::before,
  .convo__eye::after { content:''; display:block; width:30px; height:1px; background:var(--gold); }
  .convo__h2 {
    font-family: var(--ff-d);
    font-size: clamp(2rem, 5vw, 3.8rem);
    font-weight: 900; color:#fff; margin-bottom:1.6rem; line-height:1.08;
  }
  .convo__h2 em { color:var(--gold); font-style:normal; }
  .convo__p { font-size:1.08rem; line-height:1.8; color:rgba(255,255,255,.8); margin-bottom:2.6rem; }
  .btn-outline {
    display:inline-flex; align-items:center; gap:10px;
    padding:.9rem 2.5rem; border:2px solid var(--gold); border-radius:100px;
    color:var(--gold); font-size:.82rem; font-weight:700; letter-spacing:.12em;
    text-transform:uppercase; text-decoration:none; transition:all .3s ease;
  }
  .btn-outline:hover { background:var(--gold); color:var(--navy); }
  .btn-solid {
    display:inline-flex; align-items:center; gap:10px;
    padding:.9rem 2.5rem; background:var(--gold); border:2px solid var(--gold); border-radius:100px;
    color:var(--navy); font-size:.82rem; font-weight:700; letter-spacing:.12em;
    text-transform:uppercase; text-decoration:none; transition:all .3s ease;
  }
  .btn-solid:hover { background:transparent; color:var(--gold); }

  /* ════ VC SECTION ════ */
  .vc-grid { display:grid; grid-template-columns:1fr 1.45fr; gap:5.5rem; align-items:center; }
  @media(max-width:860px) { .vc-grid { grid-template-columns:1fr; gap:3rem; } }
  .vc-img-wrap {
    position:relative; border-radius:22px; overflow:hidden;
    box-shadow: 0 30px 80px rgba(10,22,40,.22);
  }
  .vc-img-wrap img { width:100%; display:block; }
  .vc-img-wrap::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(180deg, transparent 55%, rgba(10,22,40,.55));
  }
  .vc-img-badge {
    position:absolute; bottom:1.5rem; left:1.5rem; z-index:2;
    background:var(--gold); color:var(--navy);
    padding:.4rem 1.2rem; border-radius:100px;
    font-size:.7rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
  }
  .vc-name {
    font-family:var(--ff-d); font-size:2.1rem; font-weight:800;
    color:var(--navy); margin-bottom:.25rem; line-height:1.2;
  }
  .vc-role {
    font-size:.75rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
    color:var(--gold); margin-bottom:2.2rem;
  }
  .vc-quote {
    border-left:3px solid var(--gold); padding-left:1.8rem;
    margin-bottom:2.6rem;
  }
  .vc-quote p {
    font-family:var(--ff-d); font-size:1.15rem; color:#3a4a5c;
    line-height:1.75; font-style:italic;
  }

  /* ════ ACTIVITIES SECTION ════ */
  .sec--activities { background: var(--cream); padding: 6rem 7vw; }
  .sec--activities .sec__eye { color: var(--gold); }
  .sec--activities .sec__h2  { color: var(--navy); }
  .sec--activities .sec__sub { font-size: .95rem; color: var(--slate); margin-top: .4rem; }

  .gallery-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 1.6rem; margin-top: 3rem;
  }
  @media(max-width:1100px) { .gallery-grid { grid-template-columns: repeat(2,1fr); } }
  @media(max-width:580px)  { .gallery-grid { grid-template-columns: 1fr; } }

  .gcard {
    background: #fff; border-radius: 16px; overflow: hidden;
    box-shadow: 0 4px 24px rgba(10,22,40,.09);
    border: 1px solid rgba(10,22,40,.06);
    transition: transform .38s cubic-bezier(.4,0,.2,1), box-shadow .38s;
    display: flex; flex-direction: column;
  }
  .gcard:hover { transform: translateY(-8px); box-shadow: 0 20px 52px rgba(10,22,40,.16); }
  .gcard__img-wrap {
    position: relative; width: 100%; height: 200px;
    overflow: hidden; flex-shrink: 0; background: var(--navy2);
  }
  .gcard__img-wrap img {
    width: 100%; height: 100%; object-fit: cover;
    display: block; transition: transform .65s ease;
  }
  .gcard:hover .gcard__img-wrap img { transform: scale(1.08); }
  .gcard__pill {
    position: absolute; top: .9rem; left: .9rem;
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--navy); color: var(--gold);
    font-size: .63rem; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; padding: .3rem .8rem;
    border-radius: 100px; border: 1px solid rgba(201,168,76,.35);
  }
  .gcard__pill--event { background: var(--gold); color: var(--navy); border-color: transparent; }
  .gcard__no-img {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, var(--navy2) 0%, var(--navy3) 100%);
    display: flex; align-items: center; justify-content: center;
  }
  .gcard__no-img-icon { font-size: 2.5rem; opacity: .35; }
  .gcard__body {
    padding: 1.2rem 1.4rem 1.5rem;
    display: flex; flex-direction: column; gap: .5rem; flex: 1;
  }
  .gcard__date {
    font-size: .72rem; font-weight: 600; letter-spacing: .06em;
    color: var(--gold); text-transform: uppercase;
    display: flex; align-items: center; gap: 6px;
  }
  .gcard__date::before { content: ''; display: block; width: 16px; height: 1.5px; background: var(--gold); border-radius: 2px; }
  .gcard__title {
    font-family: var(--ff-d); font-size: 1rem; font-weight: 700;
    color: var(--navy); line-height: 1.4;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
  }
  .gcard__arrow {
    margin-top: auto; padding-top: .8rem;
    display: inline-flex; align-items: center; gap: 6px;
    font-size: .75rem; font-weight: 700; letter-spacing: .08em;
    text-transform: uppercase; color: var(--navy3);
    transition: gap .2s, color .2s; text-decoration: none;
  }
  .gcard:hover .gcard__arrow { gap: 10px; color: var(--gold); }
  .gallery-cta {
    text-align: center; margin-top: 3rem;
    display: flex; flex-direction: column; align-items: center; gap: .75rem;
  }
  .gallery-cta__hint { font-size: .78rem; color: var(--slate); letter-spacing: .04em; }

  /* ════ FOOTER ════ */
  .footer-bridge {
    height: 5px;
    background: linear-gradient(90deg, var(--navy) 0%, var(--gold) 35%, #e8c97a 50%, var(--gold) 65%, var(--navy) 100%);
  }
  .footer { background: var(--navy); font-family: var(--ff-b); }
  .footer__nl-band {
    background: var(--navy2); padding: 2.4rem 7vw;
    display: flex; align-items: center;
    justify-content: space-between; gap: 2rem; flex-wrap: wrap;
    border-bottom: 1px solid rgba(201,168,76,.15);
  }
  .footer__nl-text h4 {
    font-family: var(--ff-d); font-size: 1.15rem; font-weight: 700;
    color: #fff; margin-bottom: .2rem;
  }
  .footer__nl-text p { font-size: .82rem; color: rgba(255,255,255,.45); }
  .footer__nl-form { display: flex; gap: .5rem; flex-shrink: 0; flex-wrap: wrap; }
  .footer__nl-input {
    padding: .65rem 1.1rem; border-radius: 10px; min-width: 240px;
    background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12);
    color: #fff; font-size: .84rem; font-family: var(--ff-b);
    outline: none; transition: border .2s;
  }
  .footer__nl-input::placeholder { color: rgba(255,255,255,.3); }
  .footer__nl-input:focus { border-color: rgba(201,168,76,.5); }
  .footer__nl-btn {
    padding: .65rem 1.5rem; border-radius: 10px; cursor: pointer;
    background: var(--gold); color: var(--navy);
    font-size: .8rem; font-weight: 700; letter-spacing: .08em;
    text-transform: uppercase; border: 2px solid var(--gold);
    font-family: var(--ff-b); transition: all .25s;
  }
  .footer__nl-btn:hover { background: transparent; color: var(--gold); }
  .footer__main {
    display: grid; grid-template-columns: 1.8fr 1fr 1fr 1fr;
    gap: 3.5rem; padding: 4rem 7vw 3rem;
    border-bottom: 1px solid rgba(255,255,255,.08);
  }
  @media(max-width:960px) { .footer__main { grid-template-columns: 1fr 1fr; gap: 2.5rem; } }
  @media(max-width:520px) { .footer__main { grid-template-columns: 1fr; gap: 2rem; } }
  .footer__brand {
    font-family: var(--ff-d); font-size: 1.6rem; font-weight: 800;
    color: #fff; margin-bottom: .4rem; line-height: 1.1;
  }
  .footer__brand span { color: var(--gold); }
  .footer__tagline {
    font-size: .65rem; font-weight: 700; letter-spacing: .2em;
    text-transform: uppercase; color: rgba(201,168,76,.7);
    display: block; margin-bottom: 1rem;
  }
  .footer__desc { font-size: .86rem; line-height: 1.85; color: rgba(255,255,255,.45); max-width: 300px; margin-bottom: 1.6rem; }
  .footer__socials { display: flex; gap: .6rem; }
  .footer__social {
    width: 34px; height: 34px; border-radius: 9px;
    background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
    display: flex; align-items: center; justify-content: center;
    font-size: .82rem; text-decoration: none; color: rgba(255,255,255,.55);
    transition: all .25s;
  }
  .footer__social:hover { background: rgba(201,168,76,.2); border-color: rgba(201,168,76,.5); color: var(--gold); transform: translateY(-2px); }
  .footer__col-title {
    font-size: .65rem; font-weight: 700; letter-spacing: .22em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 1.4rem;
    display: flex; align-items: center; gap: 8px;
  }
  .footer__col-title::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(201,168,76,.35), transparent); }
  .footer__links { list-style: none; display: flex; flex-direction: column; gap: .65rem; }
  .footer__links a {
    text-decoration: none; color: rgba(255,255,255,.48); font-size: .86rem;
    display: inline-flex; align-items: center; gap: 8px;
    transition: color .2s, padding-left .18s;
  }
  .footer__links a::before { content: '—'; font-size: .58rem; color: rgba(201,168,76,.45); }
  .footer__links a:hover { color: var(--gold); padding-left: 4px; }
  .footer__ci {
    display: flex; gap: 10px; align-items: flex-start;
    font-size: .84rem; color: rgba(255,255,255,.48); margin-bottom: .7rem;
  }
  .footer__ci-ic { color: var(--gold); flex-shrink: 0; }
  .footer__ci a { color: rgba(255,255,255,.48); text-decoration: none; transition: color .2s; }
  .footer__ci a:hover { color: var(--gold); }
  .footer__stats {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid rgba(255,255,255,.07);
  }
  @media(max-width:720px) { .footer__stats { grid-template-columns: repeat(2,1fr); } }
  .footer__stat {
    padding: 1.8rem; text-align: center;
    border-right: 1px solid rgba(255,255,255,.07);
  }
  .footer__stat:last-child { border-right: none; }
  .footer__stat-val {
    font-family: var(--ff-d); font-size: 1.9rem; font-weight: 800;
    color: var(--gold); display: block; line-height: 1; margin-bottom: .3rem;
  }
  .footer__stat-lbl {
    font-size: .64rem; font-weight: 700; letter-spacing: .14em;
    text-transform: uppercase; color: rgba(255,255,255,.35);
  }
  .footer__bot {
    padding: 1.6rem 7vw;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 1rem; background: rgba(0,0,0,.22);
  }
  .footer__bot-copy { font-size: .77rem; color: rgba(255,255,255,.28); }
  .footer__bot-copy strong { color: var(--gold); font-weight: 600; }
  .footer__bot-legal { display: flex; gap: 1.4rem; flex-wrap: wrap; }
  .footer__bot-legal a {
    font-size: .74rem; color: rgba(255,255,255,.28);
    text-decoration: none; transition: color .2s;
  }
  .footer__bot-legal a:hover { color: var(--gold); }

  /* ════ RESPONSIVE HERO ════ */
  @media(max-width:768px) {
    .hero__body { grid-template-columns:1fr; padding:0 5vw 12vh; }
    .hero__glass { display:none; }
  }
`;

/* ══════════════════════════════════════════════ */
export default function HomePageTU() {
  const [latestNews,  setLatestNews]  = useState([]);
  const [events,      setEvents]      = useState([]);
  const [activities,  setActivities]  = useState([]);
  const [heroIdx,     setHeroIdx]     = useState(0);
  const [exiting,     setExiting]     = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activity").then(r => setActivities(r.data || [])).catch(() => {});
    axios.get("http://localhost:5000/api/notices?limit=4").then(r => setLatestNews(r.data.notices || [])).catch(() => {});
    axios.get("http://localhost:5000/api/events?limit=4").then(r => setEvents(r.data.events || [])).catch(() => {});
  }, []);

  const heroSlides = [
    { image: hero1, kicker: "Excellence in Education",    title: "Shaping Nepal's Future Through Knowledge",        sub: "Nepal's oldest and largest university — empowering generations of scholars since 1959.", badge: { label: "Constituent Campuses", val: "60+" } },
    { image: hero2, kicker: "Leadership & Vision",        title: "Building a University of Global Distinction",     sub: "Dr. Deepak Aryal takes oath to advance Tribhuvan University's academic mission with PM K.P. Oli.", badge: { label: "Academic Programs", val: "300+" } },
    { image: hero3, kicker: "Our Campus",                 title: "The Heart of Learning at Kirtipur",               sub: "A vibrant community of scholars, researchers, and innovators in the hills of Kathmandu.", badge: { label: "Students Enrolled", val: "400K+" } },
    { image: hero4, kicker: "Administration",             title: "Office of the Registrar — Serving Academia",     sub: "Dedicated to seamless academic administration across all TU faculties and campuses.", badge: { label: "Faculties", val: "5" } },
  ];

  const goSlide = (idx) => {
    if (idx === heroIdx) return;
    setExiting(true);
    setTimeout(() => { setHeroIdx(idx); setExiting(false); }, 420);
  };
  const nextSlide = () => goSlide((heroIdx + 1) % heroSlides.length);
  const h = heroSlides[heroIdx];

  return (
    <>
      <style>{STYLES}</style>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        <TuHeader />
{/* ══ HERO (Redesigned with Tailwind) ══ */}
<section
  onClick={nextSlide}
  aria-label="Hero slideshow"
  className="relative h-[90vh] w-full overflow-hidden cursor-pointer"
>
  {/* Background Image */}
  <div
    className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
      exiting ? "scale-110 opacity-0" : "scale-100 opacity-100"
    }`}
    style={{ backgroundImage: `url(${h.image})` }}
  />

  {/* Dark Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/30" />

  {/* Decorative Blur Circle */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-600/30 rounded-full blur-3xl" />
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />

  {/* Content */}
  <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
    
    <p className="uppercase tracking-widest text-red-400 font-semibold mb-4 animate-fadeIn">
      {h.kicker}
    </p>

    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-4xl animate-fadeIn">
      {h.title}
    </h1>

    <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl animate-fadeIn">
      {h.sub}
    </p>

    {h.badge && (
      <div className="mt-10 backdrop-blur-xl bg-white/10 border border-white/20 px-8 py-4 rounded-2xl shadow-2xl">
        <span className="block text-sm text-gray-300">
          {h.badge.label}
        </span>
        <span className="block text-2xl font-bold text-yellow-400">
          {h.badge.val}
        </span>
      </div>
    )}
  </div>

  {/* Dots Navigation */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
    {heroSlides.map((_, i) => (
      <button
        key={i}
        onClick={(e) => {
          e.stopPropagation();
          goSlide(i);
        }}
        aria-label={`Slide ${i + 1}`}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          i === heroIdx
            ? "bg-yellow-400 scale-125"
            : "bg-white/50 hover:bg-white"
        }`}
      />
    ))}
  </div>
</section>

        <div className="stripe" />

          {/* Latest News Section */}
      <section className="sec sec--white">
        <div className="sec__eye">Latest News</div>
        <h2 className="sec__h2">Stay Updated</h2>
        <ul className="news-list">
          {latestNews.map((news) => (
            <li key={news._id} className="news-row">
              <Link to={`/news/${news._id}`} className="news-row__link">
                <div className="news-row__body">
                  <div className="news-row__title">{news.title}</div>
                  <div className="news-row__date">{new Date(news.date).toLocaleDateString()}</div>
                </div>
                <div className="news-row__arrow">→</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Events Section */}
      <section className="sec sec--cream">
        <div className="sec__eye">Upcoming Events</div>
        <h2 className="sec__h2">Don’t Miss Out</h2>
        <ul className="ev-list">
          {events.map((ev) => (
            <li key={ev._id} className="ev-row">
              <Link to={`/events/${ev._id}`} className="ev-row__link">
                <div className="ev-cal">
                  <div className="ev-cal__day">{new Date(ev.date).getDate()}</div>
                  <div className="ev-cal__mon">{new Date(ev.date).toLocaleString("default", { month: "short" })}</div>
                </div>
                {ev.image ? (
                  <img src={ev.image} alt={ev.title} className="ev-thumb" />
                ) : (
                  <div className="ev-nothumb">No Image</div>
                )}
                <div className="ev-info">
                  <div className="ev-info__title">{ev.title}</div>
                  <div className="ev-info__cat">{ev.category}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
        {/* ══ CONVOCATION ══ */}
        <section className="convo" style={{ backgroundImage: `url(${graduation})` }}>
          <div className="convo__mask" />
          <div className="convo__corner convo__corner--tl" />
          <div className="convo__corner convo__corner--br" />
          <div className="convo__body">
            <p className="convo__eye">Academic Milestone</p>
            <h2 className="convo__h2">TU <em>Convocation</em> Ceremony</h2>
            <p className="convo__p">
              Tribhuvan University holds two types of convocations: regular and special.
              Regular convocation is held every year for conferring Bachelor's, Master's,
              M.Phil. and Ph.D. degrees to deserving graduates.
            </p>
            <Link to="/tuconvocation" className="btn-outline">Explore Convocation →</Link>
          </div>
        </section>

        {/* ══ VICE CHANCELLOR ══ */}
        <section className="sec sec--white">
          <p className="sec__eye">Leadership</p>
          <h2 className="sec__h2" style={{ marginBottom: "3.5rem" }}>Message from the Vice Chancellor</h2>
          <div className="vc-grid">
            <div className="vc-img-wrap">
              <img src={deepak} alt="Prof. Deepak Aryal" />
              <span className="vc-img-badge">Vice Chancellor</span>
            </div>
            <div>
              <h3 className="vc-name">Prof. Deepak Aryal, PhD</h3>
              <p className="vc-role">Vice Chancellor — Tribhuvan University</p>
              <div className="vc-quote">
                <p>
                  "Dear Students, Faculty Members, Staff and all esteemed stakeholders —
                  Tribhuvan University remains unwavering in its commitment to fostering
                  academic excellence, inclusive education, and research that serves our nation..."
                </p>
              </div>
              <Link to="/vicechancellormessage" className="btn-solid">Read Full Message →</Link>
            </div>
          </div>
        </section>

        {/* ══ ACTIVITIES ══ */}
        <section className="sec--activities">
          <p className="sec__eye">Highlights</p>
          <h2 className="sec__h2">TU Activities</h2>
          <p className="sec--activities sec__sub">Moments that define university life</p>
          <div className="gallery-grid">
            {activities.slice(0, 4).map(item => (
              <div key={item._id} className="gcard">
                <div className="gcard__img-wrap">
                  {item.imageUrl
                    ? <img src={`http://localhost:5000${item.imageUrl}`} alt={item.title} />
                    : <div className="gcard__no-img"><span className="gcard__no-img-icon">{item.type === "notice" ? "📢" : "📅"}</span></div>
                  }
                  <span className={`gcard__pill${item.type === "event" ? " gcard__pill--event" : ""}`}>
                    {item.type === "notice" ? "📢 Notice" : "📅 Event"}
                  </span>
                </div>
                <div className="gcard__body">
                  <span className="gcard__date">
                    {new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                  <p className="gcard__title">{item.title}</p>
                  <span className="gcard__arrow">View details →</span>
                </div>
              </div>
            ))}
          </div>
          <div className="gallery-cta">
            <Link to="/activities" className="btn-solid">View All Activities →</Link>
            <span className="gallery-cta__hint">Explore more events, notices &amp; highlights from TU</span>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <div className="footer-bridge" />
        <footer className="footer">
          <div className="footer__nl-band">
            <div className="footer__nl-text">
              <h4>Stay Connected with Tribhuvan University</h4>
              <p>Get the latest notices, exam schedules, and academic updates directly in your inbox.</p>
            </div>
            <div className="footer__nl-form">
              <input type="email" placeholder="Enter your email address" className="footer__nl-input" />
              <button className="footer__nl-btn">Subscribe</button>
            </div>
          </div>
          <div className="footer__main">
            <div>
              <p className="footer__brand">Tribhuvan <span>University</span></p>
              <span className="footer__tagline">Nepal's Premier Institution · Est. 1959</span>
              <p className="footer__desc">
                Dedicated to advancing knowledge, fostering innovation, and serving
                the people of Nepal through quality education and impactful research.
              </p>
              <div className="footer__socials">
                <a href="https://facebook.com"  target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Facebook">𝗙</a>
                <a href="https://twitter.com"   target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Twitter">𝕏</a>
                <a href="https://youtube.com"   target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="YouTube">▶</a>
                <a href="https://linkedin.com"  target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="LinkedIn">in</a>
              </div>
            </div>
            <div>
              <p className="footer__col-title">About</p>
              <ul className="footer__links">
                <li><Link to="/aboutus">About TU</Link></li>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/vision">Vision &amp; Mission</Link></li>
                <li><Link to="/leadership">Leadership</Link></li>
                <li><Link to="/tuconvocation">Convocation</Link></li>
              </ul>
            </div>
            <div>
              <p className="footer__col-title">Academics</p>
              <ul className="footer__links">
                <li><Link to="/research">Research</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/news">Notices</Link></li>
                <li><Link to="/activities">Activities</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
              </ul>
            </div>
            <div>
              <p className="footer__col-title">Contact</p>
              <div>
                <div className="footer__ci"><span className="footer__ci-ic">📍</span><span>Kirtipur, Kathmandu, Nepal</span></div>
                <div className="footer__ci"><span className="footer__ci-ic">📞</span><a href="tel:+97714330433">+977-1-4330433</a></div>
                <div className="footer__ci"><span className="footer__ci-ic">✉️</span><a href="mailto:info@tu.edu.np">info@tu.edu.np</a></div>
                <div className="footer__ci"><span className="footer__ci-ic">🌐</span><a href="https://tu.edu.np" target="_blank" rel="noopener noreferrer">www.tu.edu.np</a></div>
              </div>
            </div>
          </div>
          <div className="footer__stats">
            {[
              { val: "60+",   lbl: "Constituent Campuses" },
              { val: "400K+", lbl: "Enrolled Students" },
              { val: "300+",  lbl: "Academic Programs" },
              { val: "65+",   lbl: "Years of Excellence" },
            ].map(s => (
              <div key={s.lbl} className="footer__stat">
                <span className="footer__stat-val">{s.val}</span>
                <span className="footer__stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
          <div className="footer__bot">
            <p className="footer__bot-copy">
              © {new Date().getFullYear()} <strong>Tribhuvan University</strong>. All Rights Reserved.
            </p>
            <div className="footer__bot-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Use</Link>
              <Link to="/sitemap">Sitemap</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}