import { padCountdownValue, remainingCountdown } from './countdown';

describe('remainingCountdown', () => {
  it('returns zeros when the target is in the past', () => {
    expect(remainingCountdown('2020-01-01T00:00:00-05:00', Date.parse('2021-01-01T00:00:00-05:00'))).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it('splits the remaining time into parts', () => {
    const now = Date.parse('2026-12-18T17:00:00-05:00');
    const target = '2026-12-19T17:00:00-05:00';

    expect(remainingCountdown(target, now)).toEqual({
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });
});

describe('padCountdownValue', () => {
  it('pads single digits', () => {
    expect(padCountdownValue(5)).toBe('05');
    expect(padCountdownValue(12)).toBe('12');
  });
});
