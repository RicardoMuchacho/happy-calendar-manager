export interface Booking {
  id: string;
  boatId: number;
  startTime: Date;
  endTime: Date;
  customerName: string;
  notes?: string;
}

export interface Boat {
  id: number;
  name: string;
  color: string;
}