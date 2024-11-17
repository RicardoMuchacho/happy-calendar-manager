export interface Booking {
  id: string;
  boatId: number;
  date: Date;
  customerName: string;
  phoneNumber: string;
  notes?: string;
}

export interface Boat {
  id: number;
  name: string;
  color: string;
}