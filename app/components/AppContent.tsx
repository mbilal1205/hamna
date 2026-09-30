"use client";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { CONFIG } from "@/app/lib/constants";
import {
  TeddyBear, Heart, Typewriter, FloatingBackground, Confetti, ReasonIcon,
} from "./ui";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  musicOn: boolean;
  setMusicOn: (v: boolean) => void;
  celebrated: boolean;
  setCelebrated: (v: boolean) => void;
};

export default function AppContent({
  audioRef, musicOn, setMusicOn, celebrated, setCelebrated,
}: Props) {
  const [imgOk, setImgOk] = useState(true);
  const [showQuestion, setShowQuestion] = useState(false);

  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setMusicOn(true)).catch(() => {});
    else { a.pause(); setMusicOn(false); }
  };

  const moveNo = useCallback(() => {
    setNoPos({
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.5) * 140,
    });
    setNoCount(c => c + 1);
  }, []);

  const yesScale = Math.min(1 + noCount * 0.09, 1.55);
  const noScale  = Math.max(1 - noCount * 0.08, 0.5);
  const yesText  = CONFIG.yesTexts[Math.min(noCount, CONFIG.yesTexts.length - 1)];
  const noText   = CONFIG.noTexts[Math.min(noCount, CONFIG.noTexts.length - 1)];

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <>
      <FloatingBackground />
      <Confetti show={celebrated} />

      {/* Top bar */}
      <header className="sticky top-0 z-30 mx-auto flex w-full max-w-2xl items-center justify-between px-5 py-3">
        <div className="glass flex items-center gap-2 rounded-full px-3.5 py-1.5">
          <TeddyBear size={20} sparkle={false} />
          <span className="text-xs font-semibold tracking-wide text-pink-200">
            For {CONFIG.herName}
          </span>
        </div>

        <button
          onClick={toggleMusic}
          aria-label="music"
          className="glass grid h-10 w-10 place-items-center rounded-full text-lg transition-transform active:scale-90"
        >
          {musicOn ? "🔊" : "🔇"}
        </button>
      </header>

      <main className="relative z-10 mx-auto max-w-2xl px-5 pb-24">
        {/* ===== HERO ===== */}
        <section className="flex flex-col items-center pt-4 pb-12 text-center">
          <span className="font-vibes text-3xl text-pink-300/90">Sahzadi</span>
          <h1 className="mt-1 font-playfair text-4xl font-bold text-white text-glow">
            {CONFIG.herName}
          </h1>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-pink-100/60">
            {CONFIG.nicknames.map((n, i) => (
              <span key={n} className="flex items-center gap-2">
                <span className="rounded-full border border-pink-400/25 bg-pink-500/5 px-3 py-1">
                  {n}
                </span>
                {i < CONFIG.nicknames.length - 1 && (
                  <Heart size={8} color="#FF4D8D" />
                )}
              </span>
            ))}
          </div>

          {/* PHOTO FRAME */}
          <div className="relative mt-10 animate-pop-in">
            {/* floating teddies around photo */}
            <div className="absolute -top-7 -left-8 animate-wiggle"><TeddyBear size={52} /></div>
            <div className="absolute -top-6 -right-8 animate-wiggle" style={{ animationDelay: ".6s" }}>
              <TeddyBear size={46} />
            </div>
            <div className="absolute -bottom-6 -left-7 animate-float-soft">
              <Heart size={34} />
            </div>
            <div className="absolute -bottom-5 -right-7 animate-heartbeat">
              <Heart size={30} color="#FF85B3" />
            </div>

            {/* glow */}
            <div className="absolute -inset-4 rounded-[2.2rem] bg-gradient-to-br from-pink-500/70 via-fuchsia-500/40 to-pink-400/70 blur-2xl opacity-70 animate-glow-pulse" />

            <div className="relative rounded-[2rem] border-[3px] border-pink-400/70 bg-black p-2.5 shadow-[0_20px_60px_rgba(255,77,141,0.35)]">
              <div className="relative h-[340px] w-[260px] overflow-hidden rounded-[1.6rem] sm:h-[420px] sm:w-[320px]">
                {imgOk ? (
                  <Image
                    src={CONFIG.photo}
                    alt="Meri Jaan"
                    fill
                    priority
                    sizes="(max-width: 640px) 260px, 320px"
                    className="object-cover"
                    onError={() => setImgOk(false)}
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-to-br from-pink-900/60 to-black">
                    <TeddyBear size={120} />
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Date chip */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-pink-400/40 bg-black/80 px-4 py-1.5 text-[11px] font-medium text-pink-200 backdrop-blur-md">
              💗 {today} — Aaj se hamesha tak
            </div>
          </div>
        </section>

        {/* ===== LOVE LETTER ===== */}
        <section className="mt-14 rounded-3xl glass p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="animate-heartbeat"><Heart size={22} /></span>
            <h2 className="font-playfair text-lg font-semibold text-pink-200">
              Ek Chhoti Si Baat
            </h2>
          </div>
          <div className="text-[15px] sm:text-base">
            <Typewriter
              lines={CONFIG.loveLetter}
              onDone={() => setShowQuestion(true)}
            />
          </div>
        </section>

        {/* ===== REASONS ===== */}
        <section className="mt-14">
          <div className="mb-6 text-center">
            <span className="font-vibes text-3xl text-pink-300/90">Reasons</span>
            <h2 className="font-playfair text-xl font-semibold text-white mt-1">
              Kyun tum meri jaan ho
            </h2>
          </div>

          <div className="space-y-3.5">
            {CONFIG.reasons.map((r, i) => (
              <div
                key={i}
                className="glass group flex items-start gap-4 rounded-2xl p-4 transition-all duration-300 hover:border-pink-400/40 hover:bg-pink-500/5 animate-fade-up"
                style={{ animationDelay: `${i * 0.09}s` }}
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-pink-500/25 to-pink-700/15 border border-pink-400/25">
                  <ReasonIcon name={r.icon} size={22} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold text-pink-100">
                    {r.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-pink-100/60 leading-relaxed">
                    {r.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== PROPOSAL ===== */}
        {showQuestion && !celebrated && (
          <section className="mt-16 animate-fade-up">
            <div className="relative overflow-hidden rounded-3xl border border-pink-400/30 bg-gradient-to-b from-[#1a0a14] to-[#0B0B0F] p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(255,77,141,0.15)]">
              <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-pink-500/30 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-4 flex justify-center gap-3">
                  <span className="animate-float-soft"><TeddyBear size={44} /></span>
                  <span className="animate-heartbeat"><Heart size={36} /></span>
                  <span className="animate-float-soft" style={{ animationDelay: ".5s" }}>
                    <TeddyBear size={44} />
                  </span>
                </div>

                <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-white text-glow">
                  {CONFIG.question}
                </h2>
                <p className="mt-2 text-sm text-pink-100/55">
                  {CONFIG.questionSub}
                </p>

                {/* Buttons arena */}
                <div className="relative mt-9 flex min-h-[120px] flex-wrap items-center justify-center gap-5">
                  <button
                    onClick={() => setCelebrated(true)}
                    style={{ transform: `scale(${yesScale})` }}
                    className="relative rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-9 py-3.5 text-base font-extrabold text-white shadow-[0_0_45px_rgba(255,77,141,0.7)] transition-transform duration-300 hover:brightness-110 active:scale-95"
                  >
                    {yesText}
                  </button>

                  <button
                    onClick={moveNo}
                    onMouseEnter={moveNo}
                    onTouchStart={(e) => { e.preventDefault(); moveNo(); }}
                    style={{
                      transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${noScale})`,
                    }}
                    className="rounded-full border border-pink-400/40 bg-black/60 px-6 py-2.5 text-sm font-semibold text-pink-200/80 transition-transform duration-300"
                  >
                    {noText}
                  </button>
                </div>

                <p className="mt-6 text-[11px] text-pink-100/35">
                  (Jaan, no button bhaag raha hai... samajh jao 😌)
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ===== CELEBRATION ===== */}
        {celebrated && (
          <section className="mt-16 animate-pop-in">
            <div className="relative overflow-hidden rounded-3xl border border-pink-400/40 bg-gradient-to-b from-[#1e0a16] to-[#0B0B0F] p-6 sm:p-9 text-center shadow-[0_0_80px_rgba(255,77,141,0.25)]">
              <div className="absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-pink-500/40 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-5 flex justify-center gap-3">
                  <span className="animate-bounce-slow"><TeddyBear size={54} /></span>
                  <span className="animate-heartbeat"><Heart size={46} /></span>
                  <span className="animate-bounce-slow" style={{ animationDelay: ".4s" }}>
                    <TeddyBear size={54} />
                  </span>
                </div>

                <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-white text-glow">
                  {CONFIG.celebration.title}
                </h2>

                <p className="mt-4 text-[15px] text-pink-100/80 leading-relaxed">
                  {CONFIG.celebration.message}
                </p>

                <div className="mt-6 rounded-2xl border border-pink-400/30 bg-black/40 p-4 backdrop-blur-sm">
                  <p className="font-vibes text-3xl text-pink-300">
                    {CONFIG.celebration.footer}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCelebrated(false);
                    setNoCount(0);
                    setNoPos({ x: 0, y: 0 });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="mt-7 text-xs text-pink-100/45 underline decoration-dotted hover:text-pink-200"
                >
                  Phir se dekhna hai? 🔁
                </button>
              </div>
            </div>
          </section>
        )}

        <footer className="mt-16 pb-6 text-center text-[11px] text-pink-100/30">
          Made with 💗 for {CONFIG.herName}
        </footer>
      </main>
    </>
  );
}