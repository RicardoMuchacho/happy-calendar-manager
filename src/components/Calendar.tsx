import { useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Booking } from "@/types/types";
import { format } from "date-fns";

interface CalendarProps {
  bookings: Booking[];
  onDateSelect: (date: Date) => void;
}

export const Calendar = ({ bookings, onDateSelect }: CalendarProps) => {
  const handleDateSelect = useCallback((info: { start: Date }) => {
    onDateSelect(info.start);
  }, [onDateSelect]);

  const events = bookings.map((booking) => ({
    id: booking.id,
    title: booking.customerName,
    date: format(new Date(booking.date), "yyyy-MM-dd"),
    backgroundColor: `var(--boats-${booking.boatId})`,
    borderColor: `var(--boats-${booking.boatId})`,
    classNames: [`boat-${booking.boatId}`],
  }));

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        selectable={true}
        select={handleDateSelect}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        height="auto"
        dayMaxEvents={3}
        eventDisplay="block"
        displayEventTime={false}
      />
    </div>
  );
};