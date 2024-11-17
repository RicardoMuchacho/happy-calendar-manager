import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { Booking } from "@/types/types";
import { cn } from "@/lib/utils";

interface CalendarProps {
  bookings: Booking[];
  onDateSelect: (date: Date) => void;
}

export const Calendar = ({ bookings, onDateSelect }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const getDayBookings = (date: Date) => {
    return bookings.filter((booking) => isSameDay(new Date(booking.date), date));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" onClick={previousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <Button variant="outline" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}

        {days.map((day) => {
          const dayBookings = getDayBookings(day);
          
          return (
            <div
              key={day.toString()}
              className={cn(
                "min-h-[100px] p-2 border rounded-md",
                !isSameMonth(day, currentMonth) && "bg-gray-50 text-gray-400",
                "cursor-pointer hover:bg-gray-50 transition-colors"
              )}
              onClick={() => onDateSelect(day)}
            >
              <div className="font-medium text-sm">{format(day, "d")}</div>
              <div className="mt-1 space-y-1">
                {dayBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={cn(
                      "text-xs p-1 rounded truncate",
                      `bg-boats-${booking.boatId} text-white`
                    )}
                  >
                    {booking.customerName}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};