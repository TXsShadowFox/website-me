"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const TYPE_MS = 95;
const DELETE_MS = 50;
const HOLD_MS = 1800;

type Phase = "hold" | "delete" | "type";

/**
 * Types a greeting, holds it, erases it, and moves to the next language.
 * The server renders the first word in full so there is no empty flash, and
 * assistive tech hears one stable "Hello" instead of every keystroke.
 */
export function TypedGreeting({ words }: { words: readonly string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [phase, setPhase] = useState<Phase>("hold");

  useEffect(() => {
    if (reduce) return;

    const word = words[index];
    let timer = 0;

    if (phase === "hold") {
      timer = window.setTimeout(() => setPhase("delete"), HOLD_MS);
    } else if (phase === "delete") {
      if (text.length === 0) {
        setIndex((i) => (i + 1) % words.length);
        setPhase("type");
      } else {
        timer = window.setTimeout(() => setText((t) => t.slice(0, -1)), DELETE_MS);
      }
    } else if (text === word) {
      setPhase("hold");
    } else {
      timer = window.setTimeout(() => setText(word.slice(0, text.length + 1)), TYPE_MS);
    }

    return () => window.clearTimeout(timer);
  }, [index, phase, reduce, text, words]);

  return (
    <p className="flex h-10 items-center text-[26px] font-normal tracking-tight text-heading sm:h-12 sm:text-[28px]">
      <span aria-hidden>{reduce ? words[0] : text}</span>
      <span
        aria-hidden
        className="ml-1 inline-block h-[24px] w-[2.5px] rounded-full bg-accent motion-safe:animate-caret"
      />
      <span className="sr-only">{words[0]}</span>
    </p>
  );
}
