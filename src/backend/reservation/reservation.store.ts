import { DEFAULT_RANDOM_OCCUPANCY_RATE } from '@/features/reservation/constants/reservation.constants';
import { TOTAL_ROOMS } from '@/features/reservation/constants/hotel.constants';
import { generateRooms } from '@/features/reservation/services/roomGenerator.service';
import { filterAvailableRooms, generateRandomOccupancy } from '@/features/reservation/services/occupancy.service';
import { optimizeBooking } from '@/features/reservation/services/bookingOptimizer.service';
import { assertValidRoomCount } from '@/features/reservation/utils/validation.util';
import type { BookingResult } from '@/features/reservation/types/booking.types';
import type { FloorViewModel } from '@/features/reservation/types/hotel.types';
import type { Room } from '@/features/reservation/types/room.types';

type Listener = () => void;

interface ReservationStoreState {
  occupiedRoomNumbers: number[];
  lastBooking: BookingResult | null;
  message: string;
  messageType: 'success' | 'error' | 'neutral';
}

const rooms = generateRooms();
let state: ReservationStoreState = {
  occupiedRoomNumbers: [],
  lastBooking: null,
  message: '',
  messageType: 'neutral',
};

const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function setState(nextState: ReservationStoreState) {
  state = nextState;
  emit();
}

function buildFloorViewModels(roomsList: Room[], occupiedRoomNumbers: number[], lastBooking: BookingResult | null) {
  const occupied = new Set(occupiedRoomNumbers);
  const booked = new Set(lastBooking?.bookedRooms ?? []);
  const floors = new Map<number, FloorViewModel>();

  for (const room of roomsList) {
    const current = floors.get(room.floor) ?? { floor: room.floor, rooms: [] };
    current.rooms.push({
      ...room,
      status: booked.has(room.roomNumber) ? 'booked' : occupied.has(room.roomNumber) ? 'occupied' : 'available',
    });
    floors.set(room.floor, current);
  }

  return [...floors.values()].sort((left, right) => right.floor - left.floor);
}

function getAvailableRooms() {
  return filterAvailableRooms(rooms, state.occupiedRoomNumbers);
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  const occupied = new Set(state.occupiedRoomNumbers);
  const floors = buildFloorViewModels(rooms, state.occupiedRoomNumbers, state.lastBooking);

  return {
    floors,
    summary: {
      totalRooms: TOTAL_ROOMS,
      occupiedCount: occupied.size,
      availableCount: TOTAL_ROOMS - occupied.size,
    },
    lastBooking: state.lastBooking,
    message: state.message,
    messageType: state.messageType,
  };
}

export function bookRooms(count: number) {
  try {
    assertValidRoomCount(count);
    const availableRooms = getAvailableRooms();

    if (availableRooms.length < count) {
      throw new Error('Not enough rooms available for this booking.');
    }

    const booking = optimizeBooking(count, availableRooms);
    if (!booking) {
      throw new Error('Unable to find a valid room allocation.');
    }

    const occupiedRoomNumbers = new Set(state.occupiedRoomNumbers);
    for (const roomNumber of booking.bookedRooms) {
      occupiedRoomNumbers.add(roomNumber);
    }

    setState({
      occupiedRoomNumbers: [...occupiedRoomNumbers],
      lastBooking: booking,
      message: `Booked ${count} room${count === 1 ? '' : 's'}.`,
      messageType: 'success',
    });

    return booking;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to book rooms.';
    setState({
      ...state,
      message,
      messageType: 'error',
    });
    throw error;
  }
}

export function resetReservation() {
  setState({
    occupiedRoomNumbers: [],
    lastBooking: null,
    message: 'All bookings have been reset.',
    messageType: 'neutral',
  });
}

export function randomizeReservation(rate = DEFAULT_RANDOM_OCCUPANCY_RATE) {
  setState({
    occupiedRoomNumbers: generateRandomOccupancy(rooms, rate),
    lastBooking: null,
    message: 'Random occupancy generated.',
    messageType: 'neutral',
  });
}

export function getRooms() {
  return rooms;
}

export function __setOccupiedRoomsForTests(roomNumbers: number[]) {
  setState({
    occupiedRoomNumbers: [...roomNumbers],
    lastBooking: null,
    message: '',
    messageType: 'neutral',
  });
}
