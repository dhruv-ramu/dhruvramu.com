"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

interface AnimatedTextProps {
  lines: string[];
  italicWords?: string[];
  className?: string;
  delay?: number;
}

export function AnimatedText({
  lines,
  italicWords = [],
  className,
  delay = 0,
}: AnimatedTextProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {renderLine(line, italicWords)}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {lines.map((line, lineIndex) => (
        <motion.span
          key={lineIndex}
          className="block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + lineIndex * 0.15,
            ease,
          }}
        >
          {renderLine(line, italicWords, delay + lineIndex * 0.15)}
        </motion.span>
      ))}
    </div>
  );
}

function renderLine(
  line: string,
  italicWords: string[],
  baseDelay = 0
) {
  if (italicWords.length === 0) return line;

  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  for (const word of italicWords) {
    const index = remaining.indexOf(word);
    if (index === -1) continue;
    if (index > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, index)}</span>);
    }
    parts.push(
      <motion.em
        key={key++}
        className="italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: baseDelay + 0.3, ease }}
      >
        {word}
      </motion.em>
    );
    remaining = remaining.slice(index + word.length);
  }
  if (remaining) parts.push(<span key={key++}>{remaining}</span>);
  return parts.length > 0 ? parts : line;
}
