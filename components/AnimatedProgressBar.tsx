"use client";

import { useEffect, useMemo, useState } from "react";

type AnimatedProgressBarProps = {
  durationMs?: number;
  finalPercent?: number;
  initialPercent?: number;
};

type ProgressFrame = {
  time: number;
  value: number;
};

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function buildProgressFrames({
  durationMs,
  finalPercent,
  initialPercent
}: Required<AnimatedProgressBarProps>): ProgressFrame[] {
  const frameCount = 24;
  const frames: ProgressFrame[] = [{ time: 0, value: initialPercent }];
  let elapsed = 0;
  let current = initialPercent;
  let remaining = finalPercent - initialPercent;

  for (let index = 1; index <= frameCount; index += 1) {
    const progressRatio = index / frameCount;
    const delayWeight =
      0.55 + Math.random() * 1.4 + (index % 5 === 0 ? Math.random() * 1.6 : 0);
    const estimatedTime = durationMs / frameCount;
    elapsed = Math.min(durationMs, elapsed + estimatedTime * delayWeight);

    const naturalPush =
      remaining *
      (0.035 + Math.random() * 0.085 + (progressRatio < 0.35 ? 0.025 : 0));
    const occasionalPause = index % 6 === 0 ? Math.random() * 0.35 : 0;
    const increment = Math.max(0.25, naturalPush - occasionalPause);

    current = Math.min(finalPercent, current + increment);
    remaining = finalPercent - current;
    frames.push({ time: elapsed, value: current });
  }

  frames.push({ time: durationMs, value: finalPercent });
  return frames.sort((a, b) => a.time - b.time);
}

export default function AnimatedProgressBar({
  durationMs = 45000,
  finalPercent = 88,
  initialPercent = 7
}: AnimatedProgressBarProps) {
  const [percent, setPercent] = useState(initialPercent);
  const frames = useMemo(
    () => buildProgressFrames({ durationMs, finalPercent, initialPercent }),
    [durationMs, finalPercent, initialPercent]
  );

  useEffect(() => {
    const start = performance.now();
    let animationFrame = 0;

    function update(now: number) {
      const elapsed = Math.min(durationMs, now - start);
      const nextIndex = frames.findIndex((frame) => frame.time >= elapsed);
      const currentIndex = Math.max(1, nextIndex === -1 ? frames.length - 1 : nextIndex);
      const previous = frames[currentIndex - 1];
      const next = frames[currentIndex];
      const segmentDuration = Math.max(1, next.time - previous.time);
      const segmentProgress = Math.min(
        1,
        Math.max(0, (elapsed - previous.time) / segmentDuration)
      );
      const eased = easeOutCubic(segmentProgress);
      const value = previous.value + (next.value - previous.value) * eased;

      setPercent(Math.min(finalPercent, value));

      if (elapsed < durationMs) {
        animationFrame = requestAnimationFrame(update);
      }
    }

    animationFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrame);
  }, [durationMs, finalPercent, frames]);

  const roundedPercent = Math.round(percent);
  const labelPosition = Math.max(11, Math.min(48, percent / 2));

  return (
    <div className="mx-auto w-full max-w-[391px] rounded-[10px] border border-[#ccc] bg-white p-px">
      <div className="relative h-7 overflow-hidden rounded-[9px]">
        <div
          className="h-full bg-progress transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
        <div
          className="absolute inset-y-0 flex -translate-x-1/2 items-center text-lg font-bold text-white"
          style={{ left: `${labelPosition}%` }}
        >
          {roundedPercent}%
        </div>
      </div>
    </div>
  );
}
