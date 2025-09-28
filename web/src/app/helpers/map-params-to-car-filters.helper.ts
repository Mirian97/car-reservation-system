import { Params } from '@angular/router';
import { SearchCarsFilters } from '../types/car.type';

export const mapParamsToCarFilters = (
  params: Params,
): Partial<SearchCarsFilters> => {
  return {
    name: params['name'] ?? '',
    type: params['type'] ?? [],
    engine: params['engine'] ?? [],
    size: params['size'] ?? [],
  };
};
