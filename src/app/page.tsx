"use client";

import { useState } from 'react';
import { BookingControls } from '@/features/reservation/components/BookingControls';
import { BookingSummary } from '@/features/reservation/components/BookingSummary';
import { HotelGrid } from '@/features/reservation/components/HotelGrid';
import { ReservationLegend } from '@/features/reservation/components/ReservationLegend';
import { TravelTimeBreakdown } from '@/features/reservation/components/TravelTimeBreakdown';
import { useReservation } from '@/features/reservation/hooks/useReservation';

export default function HomePage() {
  const [roomCount, setRoomCount] = useState(1);
  const reservation = useReservation();

  return (
    <div className="shell">
      <header className="hero">
        <div>
          <p className="eyebrow"></p>
          <h1>Hotel Room Reservation System</h1>
          <p className="lede">
            Book up to five rooms, prefer the same floor, and fall back to the most efficient
            cross-floor allocation when a single floor cannot satisfy the request.
          </p>
        </div>
        <BookingSummary summary={reservation.summary} />
      </header>

      <main className="layout">
        <section className="panel controls">
          <h2>Booking Controls</h2>
          <BookingControls
            roomCount={roomCount}
            onRoomCountChange={setRoomCount}
            onBook={() => reservation.actions.book(roomCount)}
            onRandomize={() => reservation.actions.randomize()}
            onReset={() => reservation.actions.reset()}
            message={reservation.message}
            messageType={reservation.messageType}
          />
          <TravelTimeBreakdown booking={reservation.lastBooking} />
        </section>

        <section className="panel visualization">
          <div className="section-head">
            <h2>Room Map</h2>
            <p>Green rooms are available, red rooms are occupied.</p>
          </div>
          <ReservationLegend />
          <HotelGrid floors={reservation.floors} />
        </section>
      </main>
    </div>
  );
}
