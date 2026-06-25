"use client";

import { useEffect, useState } from "react";

type AnimatedProgressBarProps = {
  durationMs?: number;
  finalPercent?: number;
  initialPercent?: number;
  milestones?: ProgressMilestone[];
};

type ProgressMilestone = {
  timeMs: number;
  percent: number;
};

declare global {
  interface Window {
    setCheckoutProgress?: (percent: number) => void;
    completeCheckoutProgress?: () => void;
  }
}

const defaultMilestones: ProgressMilestone[] = [
  { timeMs: 0, percent: 7 },
  { timeMs: 3500, percent: 15 },
  { timeMs: 9000, percent: 28 },
  { timeMs: 16000, percent: 42 },
  { timeMs: 24000, percent: 58 },
  { timeMs: 33000, percent: 73 },
  { timeMs: 45000, percent: 88 }
];

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export default function AnimatedProgressBar({
  durationMs = 45000,
  finalPercent = 88,
  initialPercent = 7,
  milestones = defaultMilestones
}: AnimatedProgressBarProps) {
  const [percent, setPercent] = useState(initialPercent);

  useEffect(() => {
    const normalizedMilestones = [
      { timeMs: 0, percent: initialPercent },
      ...milestones,
      { timeMs: durationMs, percent: finalPercent }
    ]
      .map((milestone) => ({
        timeMs: Math.min(durationMs, Math.max(0, milestone.timeMs)),
        percent: Math.min(finalPercent, Math.max(initialPercent, milestone.percent))
      }))
      .sort((a, b) => a.timeMs - b.timeMs)
      .filter(
        (milestone, index, list) =>
          index === list.findIndex((item) => item.timeMs === milestone.timeMs)
      );
    const start = performance.now();
    let animationFrame = 0;
    let scriptOverride = false;

    function setProgressFromScript(value: number) {
      scriptOverride = true;
      setPercent(Math.min(finalPercent, Math.max(initialPercent, value)));
    }

    function handleProgressEvent(event: Event) {
      const customEvent = event as CustomEvent<{ percent?: number }>;
      if (typeof customEvent.detail?.percent === "number") {
        setProgressFromScript(customEvent.detail.percent);
      }
    }

    function handleMessage(event: MessageEvent) {
      if (
        event.data &&
        event.data.type === "set-checkout-progress" &&
        typeof event.data.percent === "number"
      ) {
        setProgressFromScript(event.data.percent);
      }
    }

    function update(now: number) {
      if (scriptOverride) {
        return;
      }

      const elapsed = Math.min(durationMs, now - start);
      const nextIndex = normalizedMilestones.findIndex(
        (milestone) => milestone.timeMs >= elapsed
      );
      const currentIndex = Math.max(
        1,
        nextIndex === -1 ? normalizedMilestones.length - 1 : nextIndex
      );
      const previous = normalizedMilestones[currentIndex - 1];
      const next = normalizedMilestones[currentIndex];
      const segmentDuration = Math.max(1, next.timeMs - previous.timeMs);
      const segmentProgress = Math.min(
        1,
        Math.max(0, (elapsed - previous.timeMs) / segmentDuration)
      );
      const eased = easeOutCubic(segmentProgress);
      const value = previous.percent + (next.percent - previous.percent) * eased;

      setPercent(Math.min(finalPercent, value));

      if (elapsed < durationMs) {
        animationFrame = requestAnimationFrame(update);
      }
    }

    window.setCheckoutProgress = setProgressFromScript;
    window.completeCheckoutProgress = () => setProgressFromScript(finalPercent);
    window.addEventListener("checkout-progress", handleProgressEvent);
    window.addEventListener("message", handleMessage);
    animationFrame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("checkout-progress", handleProgressEvent);
      window.removeEventListener("message", handleMessage);
      delete window.setCheckoutProgress;
      delete window.completeCheckoutProgress;
    };
  }, [durationMs, finalPercent, initialPercent, milestones]);

  const roundedPercent = Math.round(percent);

  return (
    <div className="mx-auto flex w-full max-w-[445px] items-center gap-3">
      <div className="min-w-0 flex-1 rounded-[10px] border border-[#ccc] bg-white p-px">
        <div className="h-7 overflow-hidden rounded-[9px]">
          <div
            className="h-full bg-progress transition-[width] duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <div className="min-w-[42px] text-left text-lg font-bold leading-none text-white">
        {roundedPercent}%
      </div>
    </div>
  );
}
