import { useEffect, useState } from 'react';
import type { ReservationViewModel } from '../types/hotel.types';

export function useReservation() {
  const [state, setState] = useState<ReservationViewModel>({
    floors: [],
    summary: {
      totalRooms: 97,
      occupiedCount: 0,
      availableCount: 97,
    },
    lastBooking: null,
    message: '',
    messageType: 'neutral',
  });

  async function reload() {
    const response = await fetch('/api/reservation/state');
    const data = await response.json();
    setState(data);
  }

  useEffect(() => {
    void reload().catch(() => {
      setState((current) => ({
        ...current,
        message: 'Unable to load reservation state.',
        messageType: 'error',
      }));
    });
  }, []);

  async function book(count: number) {
    const response = await fetch('/api/reservation/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ count }),
    });
    const data = await response.json();

    if (!response.ok) {
      setState((current) => ({
        ...current,
        message: data.error || 'Unable to book rooms.',
        messageType: 'error',
      }));
      return;
    }

    setState(data.state);
  }

  async function randomize(rate?: number) {
    const response = await fetch('/api/reservation/randomize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rate }),
    });
    const data = await response.json();
    setState(data.state);
  }

  async function reset() {
    const response = await fetch('/api/reservation/reset', {
      method: 'POST',
    });
    const data = await response.json();
    setState(data.state);
  }

  return {
    ...state,
    actions: {
      book,
      randomize,
      reset,
      reload,
    },
  };
}
