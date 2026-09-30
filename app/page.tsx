"use client";
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CONFIG } from "@/app/lib/constants";
import FloatingBackground from "@/app/components/FloatingBackground";
import PasswordStep from "@/app/components/steps/PasswordStep";
import WelcomeStep from "@/app/components/steps/WelcomeStep";
import PhotoStep from "@/app/components/steps/PhotoStep";
import LetterStep from "@/app/components/steps/LetterStep";
import ReasonsStep from "@/app/components/steps/ReasonsStep";
import QuestionStep from "@/app/components/steps/QuestionStep";
import CelebrationStep from "@/app/components/steps/CelebrationStep";

const STEPS = ["password", "welcome", "photo", "letter", "reasons", "question", "celebration"] as const;
type Step = typeof STEPS[number];

export default function Page() {
  const [step, setStep] = useState<Step>("password");
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const next = () => {
    const i = STEPS.indexOf(step);
    if (i < STEPS.length - 1) setStep(STEPS[i + 1]);
  };

  const startMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.55;
    a.play().then(() => setMusicOn(true)).catch(() => {});
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setMusicOn(true)).catch(() => {});
    else { a.pause(); setMusicOn(false); }
  };

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#0B0B0F]">
      <FloatingBackground />

      <audio ref={audioRef} src={CONFIG.song} loop preload="auto" />

      {step !== "password" && (
        <button onClick={toggleMusic} aria-label="music"
          className="fixed top-4 right-4 z-50 grid h-11 w-11 place-items-center rounded-full border border-pink-400/30 bg-black/50 backdrop-blur-md text-lg transition active:scale-90">
          {musicOn ? "🔊" : "🔇"}
        </button>
      )}

      <AnimatePresence mode="wait">
        {step === "password" && (
          <PasswordStep key="password" onSuccess={() => setStep("welcome")} />
        )}
        {step === "welcome" && (
          <WelcomeStep key="welcome" onNext={() => { startMusic(); next(); }} />
        )}
        {step === "photo" && <PhotoStep key="photo" onNext={next} />}
        {step === "letter" && <LetterStep key="letter" onNext={next} />}
        {step === "reasons" && <ReasonsStep key="reasons" onNext={next} />}
        {step === "question" && <QuestionStep key="question" onYes={() => setStep("celebration")} />}
        {step === "celebration" && <CelebrationStep key="celebration" />}
      </AnimatePresence>
    </main>
  );
}