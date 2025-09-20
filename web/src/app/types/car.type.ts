export enum CarType {
  UTILITARIO = 'Utilitário',
  UTILITARIO_LEVE = 'Utilitário leve',
  MINIVAN = 'Minivan',
  PICAPE_MEDIA = 'Picape média',
  SEDAN_COMPACTO = 'Sedan Compacto',
  SEDAN_MEDIO = 'Sedan médio',
  SEDAN_GRANDE = 'Sedan grande',
  PICAPE_LEVE_MEDIA = 'Picape leve-média',
  PICAPE_LEVE = 'Picape leve',
  COUPE = 'Coupé',
  CROSSOVER = 'Crossover',
  SUV_GRANDE = 'SUV Grande',
}

export interface Car {
  _id: string;
  name: string;
  year: number;
  type: CarType;
  engine: number;
  size: number;
  isReserved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CarReservationByUser {
  carId: Car;
  userId: string;
}

export type SearchCarsFilters = {
  name: string;
  engine: number[];
  type: CarType[];
  size: number[];
};

export type CreateCarForm = Pick<
  Car,
  'name' | 'year' | 'size' | 'type' | 'engine'
>;
