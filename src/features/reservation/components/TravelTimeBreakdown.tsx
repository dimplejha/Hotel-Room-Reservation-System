import type { BookingResult } from '../types/booking.types';
import { formatRoomNumbers } from '../utils/roomNumber.util';

interface TravelTimeBreakdownProps {
  booking: BookingResult | null;
}

export function TravelTimeBreakdown({ booking }: TravelTimeBreakdownProps) {
  return (
    <div className="result-card">
      <h3>Latest Booking</h3>
      {!booking ? (
        <div className="booking-result">No booking yet.</div>
      ) : (
        <div className="booking-result">
          <strong>{formatRoomNumbers(booking.bookedRooms)}</strong>
          <br />
          Floors used: {booking.floorCount}
          <br />
          Estimated travel time: {booking.totalTravelTime} minute{booking.totalTravelTime === 1 ? '' : 's'}
        </div>
      )}
    </div>
  );
}

