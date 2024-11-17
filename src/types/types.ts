export interface Booking {
  id: string;
  boatId: number;
  date: Date;
  customerName: string;
  phoneNumber: string;
  notes?: string;
  deleted?: boolean;
}

export interface Boat {
  id: number;
  name: string;
  color: string;
}