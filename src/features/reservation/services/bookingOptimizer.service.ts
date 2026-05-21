import { calculateTravelTime, entryCost, moveCost } from './travelTime.service';
import type { BookingResult } from '../types/booking.types';
import type { Room } from '../types/room.types';

function compareRoomLists(left: Room[], right: Room[]) {
  const leftNumbers = left.map((room) => room.roomNumber);
  const rightNumbers = right.map((room) => room.roomNumber);

  for (let index = 0; index < Math.min(leftNumbers.length, rightNumbers.length); index += 1) {
    if (leftNumbers[index] !== rightNumbers[index]) {
      return leftNumbers[index] - rightNumbers[index];
    }
  }

  return leftNumbers.length - rightNumbers.length;
}

function sortRooms(rooms: Room[]) {
  return [...rooms].sort((left, right) => {
    if (left.floor !== right.floor) {
      return left.floor - right.floor;
    }

    return left.position - right.position;
  });
}

function scoreRooms(rooms: Room[]) {
  const sorted = sortRooms(rooms);
  return {
    rooms: sorted,
    totalTravelTime: calculateTravelTime(sorted),
    floorCount: new Set(sorted.map((room) => room.floor)).size,
  };
}

function chooseSameFloorRooms(count: number, availableRooms: Room[]) {
  const byFloor = new Map<number, Room[]>();
  for (const room of availableRooms) {
    const list = byFloor.get(room.floor) ?? [];
    list.push(room);
    byFloor.set(room.floor, list);
  }

  let best: BookingResult | null = null;
  let bestSpan = Number.POSITIVE_INFINITY;

  for (const [floor, rooms] of byFloor.entries()) {
    if (rooms.length < count) {
      continue;
    }

    const sorted = [...rooms].sort((left, right) => left.position - right.position);
    for (let start = 0; start <= sorted.length - count; start += 1) {
      const candidate = sorted.slice(start, start + count);
      const span = candidate[candidate.length - 1].position - candidate[0].position;
      const scored = scoreRooms(candidate);
      const next: BookingResult = {
        bookedRooms: scored.rooms.map((room) => room.roomNumber),
        totalTravelTime: scored.totalTravelTime,
        floorCount: scored.floorCount,
        strategy: 'same-floor',
        rooms: scored.rooms,
      };

      if (
        !best ||
        span < bestSpan ||
        (span === bestSpan && next.totalTravelTime < best.totalTravelTime) ||
        (span === bestSpan &&
          next.totalTravelTime === best.totalTravelTime &&
          compareRoomLists(next.rooms, best.rooms) < 0)
      ) {
        best = next;
        bestSpan = span;
      }
    }
  }

  return best;
}

function chooseCrossFloorRooms(count: number, availableRooms: Room[]) {
  const rooms = sortRooms(availableRooms);
  const dp: Array<Array<BookingResult | null>> = Array.from({ length: count + 1 }, () =>
    Array(rooms.length).fill(null)
  );

  for (let index = 0; index < rooms.length; index += 1) {
    const room = rooms[index];
    dp[1][index] = {
      bookedRooms: [room.roomNumber],
      rooms: [room],
      floorCount: 1,
      totalTravelTime: entryCost(room),
      strategy: 'cross-floor',
    };
  }

  for (let size = 2; size <= count; size += 1) {
    for (let end = 0; end < rooms.length; end += 1) {
      let best: BookingResult | null = null;

      for (let prev = 0; prev < end; prev += 1) {
        const prevState = dp[size - 1][prev];
        if (!prevState) {
          continue;
        }

        const candidateRooms = [...prevState.rooms, rooms[end]];
        const candidate: BookingResult = {
          bookedRooms: candidateRooms.map((room) => room.roomNumber),
          rooms: candidateRooms,
          floorCount: new Set(candidateRooms.map((room) => room.floor)).size,
          totalTravelTime:
            prevState.totalTravelTime + moveCost(prevState.rooms[prevState.rooms.length - 1], rooms[end]),
          strategy: 'cross-floor',
        };

        if (
          !best ||
          candidate.totalTravelTime < best.totalTravelTime ||
          (candidate.totalTravelTime === best.totalTravelTime &&
            compareRoomLists(candidate.rooms, best.rooms) < 0)
        ) {
          best = candidate;
        }
      }

      dp[size][end] = best;
    }
  }

  let best: BookingResult | null = null;
  for (let index = 0; index < rooms.length; index += 1) {
    const candidate = dp[count][index];
    if (!candidate) {
      continue;
    }

    if (
      !best ||
      candidate.totalTravelTime < best.totalTravelTime ||
      (candidate.totalTravelTime === best.totalTravelTime &&
        compareRoomLists(candidate.rooms, best.rooms) < 0)
    ) {
      best = candidate;
    }
  }

  return best;
}

export function optimizeBooking(count: number, availableRooms: Room[]): BookingResult | null {
  const sameFloorCandidate = chooseSameFloorRooms(count, availableRooms);
  if (sameFloorCandidate) {
    return sameFloorCandidate;
  }

  return chooseCrossFloorRooms(count, availableRooms);
}

