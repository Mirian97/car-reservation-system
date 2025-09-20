export type CreateReservation = {
  userId: string;
  carId: string;
};

export type UpdateReservation = {
  isActive?: boolean;
  releasedAt?: string;
  reservedAt?: string;
};
