export type Reservation = {
  _id: string;
  userId: string;
  carId: string;
  isActive: boolean;
  releasedAt: string;
  reservedAt: string;
};

export type CreateReservation = Pick<Reservation, 'carId' | 'userId'>;

export type UpdateReservation = Partial<
  Pick<Reservation, 'isActive' | 'releasedAt' | 'reservedAt'>
>;
