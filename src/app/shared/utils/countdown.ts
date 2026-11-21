export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

const EMPTY_COUNTDOWN: CountdownParts = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export function remainingCountdown(targetIso: string, nowMs = Date.now()): CountdownParts {
  const distance = new Date(targetIso).getTime() - nowMs;

  if (distance <= 0) {
    return EMPTY_COUNTDOWN;
  }

  return {
    days: Math.floor(distance / MS_PER_DAY),
    hours: Math.floor((distance % MS_PER_DAY) / MS_PER_HOUR),
    minutes: Math.floor((distance % MS_PER_HOUR) / MS_PER_MINUTE),
    seconds: Math.floor((distance % MS_PER_MINUTE) / MS_PER_SECOND),
  };
}

export function padCountdownValue(value: number): string {
  return String(value).padStart(2, '0');
}
