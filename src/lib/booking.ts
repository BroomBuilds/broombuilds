/* One door to the calendar. Any "Book a call" anywhere on the page calls
   openBooking(); the modal (components/booking-modal.tsx) listens. A window
   event instead of React context, so server components can hold a trigger
   without becoming client components themselves. */

export const BOOKING_EVENT = "bb:book";

export function openBooking() {
  window.dispatchEvent(new Event(BOOKING_EVENT));
}
