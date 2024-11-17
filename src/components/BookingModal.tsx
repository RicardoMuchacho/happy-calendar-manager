import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
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
      startTime: selectedDate,
      endTime: selectedDate,
      customerName: "",
      phoneNumber: "",
      notes: "",
      boatId: 1,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
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
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="datetime-local"
              value={formData.startTime ? format(new Date(formData.startTime), "yyyy-MM-dd'T'HH:mm") : ""}
              onChange={(e) => setFormData({ ...formData, startTime: new Date(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="datetime-local"
              value={formData.endTime ? format(new Date(formData.endTime), "yyyy-MM-dd'T'HH:mm") : ""}
              onChange={(e) => setFormData({ ...formData, endTime: new Date(e.target.value) })}
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