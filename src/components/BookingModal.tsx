import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Booking } from "@/types/types";
import { format } from "date-fns";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (booking: Partial<Booking>) => void;
  selectedDate?: Date;
  booking?: Booking;
}

export const BookingModal = ({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  booking,
}: BookingModalProps) => {
  const [formData, setFormData] = useState<Partial<Booking>>(
    booking || {
      date: selectedDate,
      customerName: "",
      phoneNumber: "",
      notes: "",
      boatId: 1,
    }
  );

  // Reset form data when modal opens/closes or when booking/selectedDate changes
  useEffect(() => {
    if (isOpen) {
      setFormData(
        booking || {
          date: selectedDate,
          customerName: "",
          phoneNumber: "",
          notes: "",
          boatId: 1,
        }
      );
    }
  }, [isOpen, booking, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (booking && window.confirm("Are you sure you want to delete this booking?")) {
      onSave({ ...booking, deleted: true });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{booking ? "Edit Booking" : "New Booking"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="boat">Boat</Label>
            <select
              id="boat"
              className="w-full p-2 border rounded"
              value={formData.boatId}
              onChange={(e) => setFormData({ ...formData, boatId: Number(e.target.value) })}
            >
              <option value={1}>Sunshine</option>
              <option value={2}>Moonlight</option>
              <option value={3}>Sunset</option>
              <option value={4}>Breeze</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value

Certainly! To reset the booking modal input fields every time it closes, we need to modify the `BookingModal` component. We'll update the component to clear the form data when the modal is closed. Let's implement this change:

<lov-code>
We'll update the `src/components/BookingModal.tsx` file:

<lov-write file_path="src/components/BookingModal.tsx">
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Booking } from "@/types/types";
import { format } from "date-fns";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (booking: Partial<Booking>) => void;
  selectedDate?: Date;
  booking?: Booking;
}

export const BookingModal = ({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  booking,
}: BookingModalProps) => {
  const [formData, setFormData] = useState<Partial<Booking>>(
    booking || {
      date: selectedDate,
      customerName: "",
      phoneNumber: "",
      notes: "",
      boatId: 1,
    }
  );

  useEffect(() => {
    if (isOpen) {
      setFormData(
        booking || {
          date: selectedDate,
          customerName: "",
          phoneNumber: "",
          notes: "",
          boatId: 1,
        }
      );
    }
  }, [isOpen, booking, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (booking && window.confirm("Are you sure you want to delete this booking?")) {
      onSave({ ...booking, deleted: true });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{booking ? "Edit Booking" : "New Booking"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="boat">Boat</Label>
            <select
              id="boat"
              className="w-full p-2 border rounded"
              value={formData.boatId}
              onChange={(e) => setFormData({ ...formData, boatId: Number(e.target.value) })}
            >
              <option value={1}>Sunshine</option>
              <option value={2}>Moonlight</option>
              <option value={3}>Sunset</option>
              <option value={4}>Breeze</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="123-456-7890"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date ? format(new Date(formData.date), "yyyy-MM-dd") : ""}
              onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-2">
            {booking && (
              <Button type="button" variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};