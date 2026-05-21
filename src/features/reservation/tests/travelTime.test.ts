import { describe, expect, it } from 'vitest';
import { calculateTravelTime } from '../services/travelTime.service';

describe('travel time', () => {
  it('scores same-floor rooms from the entrance correctly', () => {
    expect(
      calculateTravelTime([
        { roomNumber: 101, floor: 1, position: 1 },
        { roomNumber: 102, floor: 1, position: 2 },
        { roomNumber: 105, floor: 1, position: 5 },
        { roomNumber: 106, floor: 1, position: 6 },
      ])
    ).toBe(5);
  });

  it('accounts for vertical movement across floors', () => {
    expect(
      calculateTravelTime([
        { roomNumber: 101, floor: 1, position: 1 },
        { roomNumber: 201, floor: 2, position: 1 },
      ])
    ).toBe(2);
  });

  it('returns zero when no rooms are selected', () => {
    expect(calculateTravelTime([])).toBe(0);
  });
});
