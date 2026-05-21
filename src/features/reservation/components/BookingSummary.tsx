import type { ReservationSummary } from '../types/hotel.types';

interface BookingSummaryProps {
  summary: ReservationSummary;
}

export function BookingSummary({ summary }: BookingSummaryProps) {
  return (
    <div className="stats">
      <div className="stat">
        <span>Rooms</span>
        <strong>{summary.totalRooms}</strong>
      </div>
      <div className="stat">
        <span>Available</span>
        <strong>{summary.availableCount}</strong>
      </div>
      <div className="stat">
        <span>Occupied</span>
        <strong>{summary.occupiedCount}</strong>
      </div>
    </div>
  );
}

