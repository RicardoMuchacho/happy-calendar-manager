import { useState } from "react";
import { Header } from "@/components/Header";
import { Calendar } from "@/components/Calendar";
import { BookingModal } from "@/components/BookingModal";
import { BoatLegend } from "@/components/BoatLegend";
import { Booking } from "@/types/types";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const { toast } = useToast();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedBooking(undefined);
    setIsModalOpen(true);
  };

  const handleSaveBooking = (bookingData: Partial<Booking>) => {
    if (selectedBooking) {
      // Edit existing booking
      setBookings(bookings.map((b) => 
        b.id === selectedBooking.id ? { ...b, ...bookingData } : b
      ));
      toast({
        title: "Booking updated",
        description: "The booking has been successfully updated.",
      });
    } else {
      // Add new booking
      const newBooking = {
        ...bookingData,
        id: Math.random().toString(36).substr(2, 9),
      } as Booking;
      setBookings([...bookings, newBooking]);
      toast({
        title: "Booking created",
        description: "New booking has been successfully created.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <BoatLegend />
          <Calendar bookings={bookings} onDateSelect={handleDateSelect} />
        </div>
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveBooking}
          selectedDate={selectedDate}
          booking={selectedBooking}
        />
      </main>
    </div>
  );
};

export default Index;