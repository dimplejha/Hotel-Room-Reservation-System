import { MAX_BOOKABLE_ROOMS } from '../constants/reservation.constants';

export function assertValidRoomCount(count: number) {
  if (!Number.isInteger(count)) {
    throw new Error('Room count must be an integer.');
  }

  if (count < 1) {
    throw new Error('Room count must be at least 1.');
  }

  if (count > MAX_BOOKABLE_ROOMS) {
    throw new Error(`Single booking cannot exceed ${MAX_BOOKABLE_ROOMS} rooms.`);
  }
}

