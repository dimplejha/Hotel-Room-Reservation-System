import { TOTAL_FLOORS } from '../constants/hotel.constants';

export function getFloors() {
  return Array.from({ length: TOTAL_FLOORS }, (_, index) => index + 1);
}

export function getRoomCountForFloor(floor: number) {
  return floor === TOTAL_FLOORS ? 7 : 10;
}

