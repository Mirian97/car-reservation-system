import { CreateCarForm } from '../types/car.type';

export const defaultCreateCar: Partial<CreateCarForm> = {
  name: '',
  engine: undefined,
  size: undefined,
  type: undefined,
  year: undefined,
};
