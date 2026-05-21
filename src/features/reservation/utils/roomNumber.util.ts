export function isTopFloorRoom(roomNumber: number) {
  return roomNumber >= 1001;
}

export function getRoomFloor(roomNumber: number) {
  return isTopFloorRoom(roomNumber) ? 10 : Math.floor(roomNumber / 100);
}

export function getRoomPosition(roomNumber: number) {
  return isTopFloorRoom(roomNumber) ? roomNumber - 1000 : roomNumber % 100;
}

export function formatRoomNumbers(roomNumbers: number[]) {
  return roomNumbers.join(', ');
}
